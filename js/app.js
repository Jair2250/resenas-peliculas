const peliculas = [
  {
    id: 1, titulo: "Dune: Parte dos", anio: 2024, fecha: "2024-03-01", genero: "Ciencia ficción",
    calificacion: 8.5, director: "Denis Villeneuve", duracion: "166 minutos",plataforma: "HBO MAX",
    poster: "img/Dune2.jpg",
    sinopsis: "Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra quienes destruyeron a su familia.",
    actores: "Timothée Chalamet, Zendaya, Rebecca Ferguson, Austin Butler",
    resena: "Una aventura visual  con escenas y una historia que mezcla política, destino y supervivencia."
  },
  {
    id: 2, titulo: "Interestelar", anio: 2014, fecha: "2014-11-07", genero: "Ciencia ficción",
    calificacion: 8.7, director: "Christopher Nolan", duracion: "169 minutos", plataforma: "HBO MAX",
    poster: "img/intelestelar.jpg",
    sinopsis: "Un grupo de exploradores viaja a través de un agujero de gusano para buscar un planeta que pueda convertirse en el nuevo hogar de la humanidad.",
    actores: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    resena: "Una película que combina ciencia, aventura y una historia familiar."
  },
  {
    id: 3, titulo: "Spider-Man: A través del Spider-Verso", anio: 2023, fecha: "2023-06-02", genero: "Animación",
    calificacion: 8.6, director: "Joaquim Dos Santos, Kemp Powers y Justin K. Thompson", duracion: "140 minutos", plataforma: "Netflix",
    poster: "img/spiderverse.jpg",
    sinopsis: "Miles Morales vuelve a encontrarse con otros Spider-Man y se enfrenta a una aventura que lo llevará a descubrir distintas realidades y a tomar decisiones difíciles.",
    actores: "Shameik Moore, Hailee Steinfeld, Brian Tyree Henry",
    resena: "Estilo visual creativo y una historia sobre la identidad y la responsabilidad."
  },
  {
    id: 4, titulo: "Alerta Roja", anio: 2021, fecha: "2021-11-05", genero: "Acción",
    calificacion: 8.3, director: "Rawson Marshall Thurber", duracion: "118 minutos", plataforma: "Netflix",
    poster: "img/Alerta_roja.jpg",
    sinopsis: "Un agente del FBI debe colaborar con un famoso ladrón de arte para capturar a una escurridiza ladrona que siempre está un paso adelante.",
    actores: "Dwayne Johnson, Ryan Reynolds, Gal Gadot",
    resena: "Una película de acción, comedia con persecuciones y  engaños ."
  },
  {
    id: 5, titulo: "The Walking Dead", anio: 2010, fecha: "2010-10-31", genero: "Acción",
    calificacion: 8.1, director: "Frank Darabont", duracion: "11 temporadas", plataforma: "Netflix",
    poster: "img/Thewalkingdead.jpg",
    sinopsis:"Rick Grimes despierta de un coma y descubre que el mundo ha sido invadido por zombis. Junto con otros sobrevivientes, deberá luchar para mantenerse con vida.",
    actores: "Andrew Lincoln, Norman Reedus, Melissa McBride",
    resena:  "Una serie de suspenso, acción."
  },
  {
    id: 6, titulo: "Frankenstein", anio: 2025, fecha: "2025-11-07", genero: "Terror",
    calificacion: 8.4, director: "Guillermo del Toro", duracion: "149 minutos", plataforma: "Netflix",
    poster: "img/Frankenstein.jpg",
    sinopsis: " Un cientifico crea una criatura mediante un experimento que termina teniendo consecuencias inesperadas. La historia explora la ambición, la soledad y lo que significa ser humano.",
    actores: "Oscar Isaac, Jacob Elordi, Mia Goth",
    resena: "Una historia oscura que combina terror y drama."
  }
];

const lista = document.getElementById("listaPeliculas");
const buscador = document.getElementById("buscador");
const filtroGenero = document.getElementById("filtroGenero");
const ordenFecha = document.getElementById("ordenFecha");
const tituloListado = document.getElementById("tituloListado");
const textoListado = document.getElementById("textoListado");
const sinResultados = document.getElementById("sinResultados");
const volverInicio = document.getElementById("volverInicio");
const contadorFavoritas = document.getElementById("contadorFavoritas");
const modal = new bootstrap.Modal(document.getElementById("modalPelicula"));

let mostrarSoloFavoritas = false;
let peliculaActiva = null;

function obtenerFavoritas() {
  return JSON.parse(localStorage.getItem("cineReviewFavoritas") || "[]");
}
function guardarFavoritas(ids) {
  localStorage.setItem("cineReviewFavoritas", JSON.stringify(ids));
  actualizarContador();
}
function actualizarContador() {
  contadorFavoritas.textContent = obtenerFavoritas().length;
}
function escaparHTML(texto) {
  return String(texto).replace(/[&<>"']/g, caracter => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[caracter]);
}
function tarjetaPelicula(pelicula) {
  const esFavorita = obtenerFavoritas().includes(pelicula.id);
  return `
    <div class="col-12 col-sm-6 col-md-4">
      <article class="movie-card">
        <div class="poster-wrap">
          <img src="${pelicula.poster}" alt="Póster de ${escaparHTML(pelicula.titulo)}"
               onerror="this.onerror=null;this.src='https://placehold.co/500x750/222938/ffffff?text=Poster+no+disponible';" />
          <button class="favorite-btn ${esFavorita ? "active" : ""}" data-favorito="${pelicula.id}"
                  aria-label="${esFavorita ? "Quitar de" : "Agregar a"} favoritas" title="Marcar como favorita">
            ${esFavorita ? "♥" : "♡"}
          </button>
        </div>
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h3 class="h5 mb-0">${escaparHTML(pelicula.titulo)}</h3>
            <span class="movie-rating">★ ${pelicula.calificacion}</span>
          </div>
          <div class="mb-3">
            <span class="badge genre-badge">${escaparHTML(pelicula.genero)}</span>
            <span class="movie-year ms-1">${pelicula.anio}</span>
          </div>
          <p class="text-secondary small flex-grow-1">${escaparHTML(pelicula.sinopsis.substring(0, 105))}...</p>
          <button class="btn btn-cine w-100" data-detalle="${pelicula.id}">Ver detalles</button>
        </div>
      </article>
    </div>`;
}
function renderizarPeliculas() {
  const texto = buscador.value.trim().toLowerCase();
  const genero = filtroGenero.value;
  let resultado = peliculas.filter(p => p.titulo.toLowerCase().includes(texto));
  if (genero !== "todos") resultado = resultado.filter(p => p.genero === genero);
  if (mostrarSoloFavoritas) {
    const favoritas = obtenerFavoritas();
    resultado = resultado.filter(p => favoritas.includes(p.id));
  }
  if (ordenFecha.value === "recientes") resultado.sort((a, b) => b.fecha.localeCompare(a.fecha));
  if (ordenFecha.value === "antiguas") resultado.sort((a, b) => a.fecha.localeCompare(b.fecha));
  if (ordenFecha.value === "calificacion") resultado.sort((a, b) => b.calificacion - a.calificacion);
  lista.innerHTML = resultado.map(tarjetaPelicula).join("");
  sinResultados.classList.toggle("d-none", resultado.length !== 0);
  tituloListado.textContent = mostrarSoloFavoritas ? "Mis películas favoritas" : "Películas destacadas";
  textoListado.textContent = mostrarSoloFavoritas
    ? "Aquí aparecen las películas que has guardado."
    : "Selecciona una película para conocer más.";
  volverInicio.classList.toggle("d-none", !mostrarSoloFavoritas);
}
function obtenerComentarios(id) {
  const todos = JSON.parse(localStorage.getItem("cineReviewComentarios") || "{}");
  return todos[id] || [];
}
function mostrarDetalle(id) {
  peliculaActiva = peliculas.find(p => p.id === Number(id));
  if (!peliculaActiva) return;
  document.getElementById("tituloModal").textContent = peliculaActiva.titulo;
  const comentarios = obtenerComentarios(peliculaActiva.id);
  document.getElementById("contenidoModal").innerHTML = `
    <div class="row g-4">
      <div class="col-12 col-sm-5">
        <img class="detail-poster" src="${peliculaActiva.poster}" alt="Póster de ${escaparHTML(peliculaActiva.titulo)}"
          onerror="this.onerror=null;this.src='https://placehold.co/500x750/222938/ffffff?text=Poster+no+disponible';" />
      </div>
      <div class="col-12 col-sm-7">
        <p><span class="detail-label">Calificación:</span> ★ ${peliculaActiva.calificacion}/10</p>
        <p><span class="detail-label">Estreno:</span> ${peliculaActiva.anio}</p>
        <p><span class="detail-label">Género:</span> ${escaparHTML(peliculaActiva.genero)}</p>
        <p><span class="detail-label">Director:</span> ${escaparHTML(peliculaActiva.director)}</p>
        <p><span class="detail-label">Duración:</span> ${escaparHTML(peliculaActiva.duracion)}</p>
        <p><span class="detail-label">Plataforma de Streaming:</span> ${escaparHTML(peliculaActiva.plataforma)}</p>
        <h3 class="h6 mt-4">Sinopsis</h3>
        <p>${escaparHTML(peliculaActiva.sinopsis)}</p>
        <h3 class="h6 mt-3">Actores principales</h3>
        <p>${escaparHTML(peliculaActiva.actores)}</p>
      </div>
    </div>
    <hr class="border-secondary my-4" />
    <h3 class="h5">Reseña</h3>
    <div class="review-box mb-4">${escaparHTML(peliculaActiva.resena)}</div>
    <h3 class="h5">Comentarios de usuarios</h3>
    <div id="listaComentarios">
      ${comentarios.length ? comentarios.map(c => `
        <div class="comment-item">
          <div class="fw-semibold">${escaparHTML(c.nombre)}</div>
          <div>${escaparHTML(c.texto)}</div>
          <div class="comment-date mt-1">${escaparHTML(c.fecha)}</div>
        </div>`).join("") : '<p class="text-secondary">Todavía no hay comentarios. ¡Sé el primero!</p>'}
    </div>
    <form id="formComentario" class="mt-3">
      <div class="mb-3">
        <label for="nombreComentario" class="form-label">Tu nombre</label>
        <input id="nombreComentario" class="form-control" maxlength="40" required placeholder="Escribe tu nombre" />
      </div>
      <div class="mb-3">
        <label for="textoComentario" class="form-label">Tu comentario</label>
        <textarea id="textoComentario" class="form-control" rows="3" maxlength="500" required placeholder="¿Qué te pareció la película?"></textarea>
      </div>
      <button type="submit" class="btn btn-cine">Publicar comentario</button>
    </form>`;
  document.getElementById("formComentario").addEventListener("submit", guardarComentario);
  modal.show();
}
function guardarComentario(evento) {
  evento.preventDefault();
  if (!peliculaActiva) return;
  const nombre = document.getElementById("nombreComentario").value.trim();
  const texto = document.getElementById("textoComentario").value.trim();
  if (!nombre || !texto) return;
  const todos = JSON.parse(localStorage.getItem("cineReviewComentarios") || "{}");
  todos[peliculaActiva.id] = todos[peliculaActiva.id] || [];
  todos[peliculaActiva.id].push({
    nombre, texto, fecha: new Date().toLocaleString("es-CO")
  });
  localStorage.setItem("cineReviewComentarios", JSON.stringify(todos));
  mostrarDetalle(peliculaActiva.id);
}
lista.addEventListener("click", evento => {
  const botonFavorito = evento.target.closest("[data-favorito]");
  const botonDetalle = evento.target.closest("[data-detalle]");
  if (botonFavorito) {
    const id = Number(botonFavorito.dataset.favorito);
    let favoritas = obtenerFavoritas();
    favoritas = favoritas.includes(id) ? favoritas.filter(f => f !== id) : [...favoritas, id];
    guardarFavoritas(favoritas);
    renderizarPeliculas();
  }
  if (botonDetalle) mostrarDetalle(botonDetalle.dataset.detalle);
});
[buscador, filtroGenero, ordenFecha].forEach(elemento => {
  elemento.addEventListener("input", renderizarPeliculas);
  elemento.addEventListener("change", renderizarPeliculas);
});
document.getElementById("linkFavoritas").addEventListener("click", evento => {
  evento.preventDefault();
  mostrarSoloFavoritas = true;
  renderizarPeliculas();
  window.scrollTo({ top: document.querySelector("main").offsetTop - 70, behavior: "smooth" });
});
function irInicio(evento) {
  if (evento) evento.preventDefault();
  mostrarSoloFavoritas = false;
  renderizarPeliculas();
}
document.getElementById("linkInicio").addEventListener("click", irInicio);
document.getElementById("brandLink").addEventListener("click", irInicio);
volverInicio.addEventListener("click", irInicio);
actualizarContador();
renderizarPeliculas();
