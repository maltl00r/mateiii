"use client";

import { useMemo, useState } from "react";

const sections = [
  { number: "01", title: "Carátula general", type: "Carátulas", note: "Presentación y datos generales del portafolio.", count: "Pendiente de escaneo" },
  { number: "02", title: "Actividades individuales", type: "Carátulas", note: "Trabajos y evidencias realizadas de forma individual.", count: "Pendiente de escaneo" },
  { number: "03", title: "Actividades grupales", type: "Carátulas", note: "Evidencias de colaboración y trabajo en equipo.", count: "Pendiente de escaneo" },
  { number: "04", title: "Laboratorios", type: "Carátulas", note: "Prácticas, resultados y conclusiones de laboratorio.", count: "Pendiente de escaneo" },
  { number: "05", title: "Lecciones", type: "Carátulas", note: "Evaluaciones, controles y lecciones de la materia.", count: "Pendiente de escaneo" },
  { number: "06", title: "Oficios", type: "Documentos", note: "Comunicaciones y documentos formales.", count: "Pendiente de escaneo" },
  { number: "07", title: "Sílabo de la materia", type: "Documentos", note: "Plan, objetivos, contenidos y criterios de evaluación.", count: "Pendiente de escaneo" },
  { number: "08", title: "Formularios", type: "Documentos", note: "Formatos y registros utilizados durante el curso.", count: "Pendiente de escaneo" },
  { number: "09", title: "Mapas mentales", type: "Trabajos", note: "Síntesis visual de conceptos y relaciones.", count: "Pendiente de escaneo" },
  { number: "10", title: "Tareas", type: "Trabajos", note: "Actividades, ejercicios y entregas.", count: "Pendiente de escaneo" },
  { number: "11", title: "Otros documentos", type: "Otros", note: "Material adicional que forma parte del portafolio.", count: "Pendiente de escaneo" },
];

const filters = ["Todos", "Carátulas", "Documentos", "Trabajos", "Otros"];

export default function Home() {
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const visibleSections = useMemo(() => sections.filter((section) => {
    const matchesFilter = filter === "Todos" || section.type === filter;
    const matchesQuery = `${section.title} ${section.note}`.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  }), [filter, query]);

  return (
    <main className="portfolio-shell">
      <aside className="sidebar">
        <a className="brand" href="#inicio">mateiii<span> / portafolio</span></a>
        <p className="sidebar-label">Índice</p>
        <nav aria-label="Secciones del portafolio">
          {sections.slice(0, 5).map((section) => <a key={section.number} href={`#${section.number}`}>{section.number} <span>{section.title.replace("Actividades ", "Act. ")}</span></a>)}
        </nav>
        <div className="sidebar-bottom"><span>Materia</span><strong>Matemática III</strong><span>Estado</span><strong className="status"><i /> En construcción</strong></div>
      </aside>

      <div className="content-column">
        <header className="portfolio-header" id="inicio">
          <div><p className="eyebrow">Archivo personal / 2026</p><h1>Mi portafolio<br /><em>de mate.</em></h1></div>
          <div className="header-note"><span className="round-mark">∑</span><p>Una copia digital, ordenada y fiel de cada evidencia de mi portafolio físico.</p></div>
        </header>

        <section className="overview" aria-label="Resumen del portafolio">
          <div><strong>{sections.length}</strong><span>secciones</span></div><div><strong>0</strong><span>archivos subidos</span></div><div><strong>01</strong><span>materia</span></div>
        </section>

        <section className="archive" id="archivo">
          <div className="archive-toolbar"><div><p className="eyebrow">Contenido</p><h2>Archivo del curso</h2></div><label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar en el archivo" aria-label="Buscar en el archivo" /></label></div>
          <div className="filter-row" aria-label="Filtrar secciones">{filters.map((item) => <button className={filter === item ? "filter active" : "filter"} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div>
          <div className="document-grid">{visibleSections.map((section) => <article className="document-card" id={section.number} key={section.number}><div className="card-top"><span>{section.number}</span><span className="file-state">{section.count}</span></div><h3>{section.title}</h3><p>{section.note}</p><button className="open-card" disabled>Ver documentos <span aria-hidden="true">↗</span></button></article>)}</div>
          {visibleSections.length === 0 && <p className="empty-state">No hay secciones que coincidan con la búsqueda.</p>}
        </section>

        <footer><span>mateiii / portafolio digital</span><span>mateiii.maltloor.com</span></footer>
      </div>
    </main>
  );
}
