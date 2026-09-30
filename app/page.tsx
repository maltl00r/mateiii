"use client";

import { useEffect, useMemo, useState } from "react";
import PdfCanvas from "./pdf-canvas";

const sections = [
  { number: "01", title: "Documentos de evidencia", type: "Documentos", note: "Evidencias y documentos que respaldan el trabajo del curso.", file: "/pdfs/01-documentos-evidencia.pdf" },
  { number: "02", title: "Sílabo", type: "Documentos", note: "Plan, objetivos, contenidos y criterios de evaluación.", file: "/pdfs/02-silabo.pdf" },
  { number: "03", title: "Pruebas", type: "Evaluaciones", note: "Pruebas y evaluaciones realizadas durante la materia.", file: "/pdfs/03-pruebas.pdf" },
  { number: "04", title: "Actividades individuales", type: "Trabajos", note: "Trabajos y evidencias realizadas de forma individual.", file: "/pdfs/04-actividades-individuales.pdf" },
  { number: "05", title: "Mapas mentales", type: "Trabajos", note: "Síntesis visual de conceptos y relaciones.", file: "/pdfs/05-mapas-mentales.pdf" },
  { number: "06", title: "Laboratorios", type: "Prácticas", note: "Prácticas, resultados y conclusiones de laboratorio.", file: "/pdfs/06-laboratorios.pdf" },
  { number: "07", title: "Talleres grupales", type: "Trabajos", note: "Talleres y evidencias de colaboración en equipo.", file: "/pdfs/07-talleres-grupales.pdf" },
  { number: "08", title: "Glosario de palabras", type: "Documentos", note: "Definiciones y conceptos clave de Matemática III.", file: "/pdfs/08-glosario-palabras.pdf" },
  { number: "09", title: "Anexos", type: "Documentos", note: "Material complementario del portafolio.", file: "/pdfs/09-anexos.pdf" },
];

const filters = ["Todos", "Documentos", "Evaluaciones", "Trabajos", "Prácticas"];

export default function Home() {
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const [readerSection, setReaderSection] = useState<(typeof sections)[number] | null>(null);
  const [readerPage, setReaderPage] = useState(1);
  const [readerPageCount, setReaderPageCount] = useState(1);
  const visibleSections = useMemo(() => sections.filter((section) => {
    const matchesFilter = filter === "Todos" || section.type === filter;
    const matchesQuery = `${section.title} ${section.note}`.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  }), [filter, query]);

  useEffect(() => {
    if (!readerSection) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setReaderSection(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [readerSection]);

  return (
    <main className="portfolio-shell">
      <aside className="sidebar">
        <a className="brand" href="#inicio">mateiii<span> / portafolio</span></a>
        <p className="sidebar-label">Índice</p>
        <nav aria-label="Secciones del portafolio">
          {sections.map((section) => <a key={section.number} href={`#${section.number}`}>{section.number} <span>{section.title.replace("Actividades ", "Act. ")}</span></a>)}
        </nav>
        <div className="sidebar-bottom"><span>Materia</span><strong>Matemática III</strong></div>
      </aside>

      <div className="content-column">
        <header className="portfolio-header" id="inicio">
          <div><p className="eyebrow">Archivo personal / 2026</p><h1>Mi portafolio<br /><em>de Matemática III.</em></h1></div>
          <div className="header-note"><span className="round-mark">∑</span><p>Una copia digital, ordenada y fiel de cada evidencia de mi portafolio físico.</p></div>
        </header>

        <section className="academic-profile" aria-label="Datos formativos">
          <div className="profile-person"><p className="eyebrow">Estudiante</p><h2>Loor Tuárez<br />Marvin Aldahir</h2></div>
          <dl className="profile-details">
            <div><dt>Universidad</dt><dd>Universidad Central del Ecuador</dd></div>
            <div><dt>Facultad</dt><dd>Filosofía, Letras y Ciencias de la Educación</dd></div>
            <div><dt>Carrera</dt><dd>Pedagogía de las Ciencias Experimentales - Informática</dd></div>
            <div><dt>Periodo lectivo</dt><dd>Intensivo 2026-2026</dd></div>
            <div><dt>Paralelo</dt><dd>Único</dd></div>
            <div><dt>Docente</dt><dd>Msc. Diego Tipán</dd></div>
          </dl>
        </section>

        <section className="overview" aria-label="Resumen del portafolio">
          <div><strong>{sections.length}</strong><span>secciones</span></div><div><strong>{sections.filter((section) => section.file).length}</strong><span>archivos subidos</span></div><div><strong>01</strong><span>materia</span></div>
        </section>

        <section className="archive" id="archivo">
          <div className="archive-toolbar"><div><p className="eyebrow">Contenido</p><h2>Archivo del curso</h2></div><label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar en el archivo" aria-label="Buscar en el archivo" /></label></div>
          <div className="filter-row" aria-label="Filtrar secciones">{filters.map((item) => <button className={filter === item ? "filter active" : "filter"} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div>
          <div className="document-grid">{visibleSections.map((section) => <article className="document-card" id={section.number} key={section.number}><div className="card-top"><span>{section.number}</span><span className="file-state">{section.file ? "PDF estático" : "Pendiente de escaneo"}</span></div><h3>{section.title}</h3><p>{section.note}</p><div className={section.file ? "pdf-preview" : "pdf-preview pdf-empty"}>{section.file ? <PdfCanvas file={section.file} fitHeight /> : <span>Agrega un PDF en <code>public/pdfs</code></span>}</div>{section.file ? <button className="open-card" onClick={() => { setReaderPage(1); setReaderPageCount(1); setReaderSection(section); }}>Leer PDF <span aria-hidden="true">↗</span></button> : <button className="open-card" disabled>Sin documentos <span aria-hidden="true">↗</span></button>}</article>)}</div>
          {visibleSections.length === 0 && <p className="empty-state">No hay secciones que coincidan con la búsqueda.</p>}
        </section>

        {readerSection && <div className="reader-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setReaderSection(null); }}>
          <section className="pdf-reader" role="dialog" aria-modal="true" aria-labelledby="reader-title">
            <div className="reader-toolbar">
              <div><p className="eyebrow">Lector PDF · Sección {readerSection.number}</p><h2 id="reader-title">{readerSection.title}</h2></div>
              <div className="reader-actions"><a href={readerSection.file} download={`${readerSection.number}-${readerSection.title.toLowerCase().replaceAll(" ", "-")}.pdf`}>Descargar PDF <span aria-hidden="true">↓</span></a><a href={readerSection.file} target="_blank" rel="noreferrer">Abrir aparte <span aria-hidden="true">↗</span></a><button type="button" onClick={() => setReaderSection(null)}>Cerrar</button></div>
            </div>
            <div className="reader-pagination" aria-label="Páginas del documento">
              <button type="button" onClick={() => setReaderPage((page) => Math.max(1, page - 1))} disabled={readerPage <= 1}>← Anterior</button>
              <span>Página {readerPage} de {readerPageCount}</span>
              <button type="button" onClick={() => setReaderPage((page) => Math.min(readerPageCount, page + 1))} disabled={readerPage >= readerPageCount}>Siguiente →</button>
            </div>
            <div className="reader-frame"><PdfCanvas key={readerSection.file} file={readerSection.file} pageNumber={readerPage} fitWidth onPageCount={setReaderPageCount} /></div>
          </section>
        </div>}

        <footer><span>mateiii / portafolio digital</span><a href="https://github.com/maltl00r/mateiii" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></footer>
      </div>
    </main>
  );
}
