const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2NjNjhlM2RhMmIyMjFhZGQwYWIxNmZkYzBlZWRmYyIsInN1YiI6IjY2NThhN2ZjOWNkNDFiMjg3YTkzZTZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pfa7G9p7yRGM1ECjPDxox_zPd-TsQu9lElR6lSTgYno",
  },
};

const BASE_URL = "https://api.themoviedb.org/3";

let currentPage = 1;

function llamarAPI(page) {
  fetch(`${BASE_URL}/movie/top_rated?language=en-US&page=${page}`, options)
    .then((response) => response.json())
    .then((data) => dibujaDatos(data));
}

llamarAPI(1);

function dibujaDatos(json){
  const filas = json.results.map(obj => Pelicula(obj));

  document.querySelector('.aclamadas .aclamadasContainer').innerHTML = filas.join('');
}

function Pelicula(obj) {
  return `
    <div class="aclamadaItem">
  <a href="./pages/detalle.html">
    <img src="https://image.tmdb.org/t/p/w500/${obj.poster_path}" class="imagen" alt="${obj.title}">        
  </a>
    
    <p>${obj.title}</p>
    </div>
    `;
}
