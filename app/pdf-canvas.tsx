"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentLoadingTask, RenderTask } from "pdfjs-dist";

type PdfCanvasProps = {
  file: string;
  pageNumber?: number;
  fitWidth?: boolean;
  fitHeight?: boolean;
  onPageCount?: (count: number) => void;
};

export default function PdfCanvas({ file, pageNumber = 1, fitWidth = true, fitHeight = false, onPageCount }: PdfCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    let renderTask: RenderTask | undefined;
    let loadingTask: PDFDocumentLoadingTask | undefined;

    async function renderPage() {
      setStatus("loading");

      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
        loadingTask = pdfjs.getDocument(file);
        const document = await loadingTask.promise;
        if (cancelled) return;

        onPageCount?.(document.numPages);
        const page = await document.getPage(pageNumber);
        if (cancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas no disponible");

        const originalViewport = page.getViewport({ scale: 1 });
        const availableWidth = canvas.parentElement?.clientWidth ?? originalViewport.width;
        const widthScale = availableWidth / originalViewport.width;
        const previewHeight = canvas.closest(".pdf-preview")?.clientHeight;
        const heightScale = previewHeight ? (previewHeight * 0.82) / originalViewport.height : widthScale;
        const scale = fitHeight ? Math.min(widthScale, heightScale) : fitWidth ? widthScale : Math.min(1.3, widthScale);
        const viewport = page.getViewport({ scale });
        const outputScale = window.devicePixelRatio || 1;

        canvas.width = Math.ceil(viewport.width * outputScale);
        canvas.height = Math.ceil(viewport.height * outputScale);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        context.setTransform(outputScale, 0, 0, outputScale, 0, 0);

        renderTask = page.render({ canvasContext: context, viewport });
        await renderTask.promise;
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    void renderPage();
    return () => {
      cancelled = true;
      renderTask?.cancel();
      void loadingTask?.destroy();
    };
  }, [file, fitHeight, fitWidth, onPageCount, pageNumber]);

  return (
    <div className="pdf-canvas-host">
      <canvas ref={canvasRef} aria-label={`Página ${pageNumber} del PDF`} />
      {status !== "ready" && <span className={`pdf-canvas-status ${status}`} role={status === "error" ? "alert" : "status"}>{status === "error" ? "No se pudo cargar este PDF" : "Cargando PDF…"}</span>}
    </div>
  );
}