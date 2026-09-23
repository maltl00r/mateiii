export default function Home() {
  return (
    <main className="page-shell">
      <nav className="topbar" aria-label="Navegación principal">
        <a className="brand" href="#inicio">mateiii</a>
        <a className="quiet-link" href="#contacto">Contacto</a>
      </nav>
      <section className="hero" id="inicio">
        <p className="eyebrow">mateiii / 001</p>
        <h1>Una idea clara merece un espacio propio.</h1>
        <p className="intro">Este es el punto de partida de mateiii: una página rápida, flexible y lista para crecer contigo.</p>
        <a className="action" href="#contacto">Hablemos <span aria-hidden="true">↗</span></a>
      </section>
      <section className="signal-grid" aria-label="Características">
        <article><span>01</span><h2>Simple</h2><p>Una base limpia para convertir la próxima idea en algo real.</p></article>
        <article><span>02</span><h2>Directa</h2><p>Contenido que llega rápido, sin capas innecesarias.</p></article>
        <article><span>03</span><h2>Abierta</h2><p>Preparada para evolucionar hacia el producto que imagines.</p></article>
      </section>
      <footer id="contacto"><span>mateiii</span><span>mateiii.maltloor.com</span></footer>
    </main>
  );
}
