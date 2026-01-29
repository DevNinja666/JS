<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Movie Search (OMDB)</title>
<style>
body {
  font-family: Arial, sans-serif;
  background: #f6efe7;
  text-align: center;
}
.search-box {
  width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  background: #f6efe7;
  border-radius: 5px;
}
.search-box input, select, button {
  width: 90%;
  padding: 8px;
  margin: 6px 0;
}
.films {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
.film {
  width: 200px;
  border: 1px solid #ccc;
  padding: 10px;
  background: #fff;
}
.film img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}
.pagination {
  margin: 20px;
}
.pagination button {
  margin: 0 3px;
  padding: 5px 10px;
}
.modal {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
}
.modal-content {
  background: #fff;
  width: 600px;
  margin: 50px auto;
  padding: 20px;
  position: relative;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  font-size: 20px;
}
</style>
</head>
<body>
<h2>Search:</h2>
<div class="search-box">
  <label>Title:</label><br>
  <input type="text" id="title"><br>
  <label>Type:</label><br>
  <select id="type">
    <option value="">Any</option>
    <option value="movie">Movie</option>
    <option value="series">Series</option>
    <option value="episode">Episode</option>
  </select><br>
  <button onclick="searchMovies()">Search</button>
</div>
<h3>Films:</h3>
<div class="films" id="films"></div>
<div class="pagination" id="pagination"></div>
<!-- ===== MODAL WINDOW ===== -->
<div class="modal" id="modal">
  <div class="modal-content">
    <span class="close" onclick="closeModal()">✖</span>
    <div id="modal-body"></div>
  </div>
</div>
<script>

const API_KEY = "YOUR_API_KEY";
let currentPage = 1;
let lastQuery = "";-
function searchMovies(page = 1) {
  currentPage = page;
  const title = document.getElementById("title").value;
  const type = document.getElementById("type").value;
  lastQuery = title;
  if (!title) return alert("Enter movie title");
  let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&page=${page}`;
  if (type) url += `&type=${type}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "False") {
        document.getElementById("films").innerHTML = "No results";
        return;
      }
      renderFilms(data.Search);
      renderPagination(data.totalResults);
    });
}
function renderFilms(movies) {
  const container = document.getElementById("films");
  container.innerHTML = "";
  movies.forEach(m => {
    container.innerHTML += `
      <div class="film">
        <img src="${m.Poster !== "N/A" ? m.Poster : ""}">
        <p><b>${m.Title}</b></p>
        <p>${m.Type} | ${m.Year}</p>
        <button onclick="showDetails('${m.imdbID}')">Details</button>
      </div>
    `;
  });
}
function renderPagination(total) {
  const pages = Math.ceil(total / 10);
  const pag = document.getElementById("pagination");
  pag.innerHTML = "";
  if (currentPage > 1) {
    pag.innerHTML += `<button onclick="searchMovies(${currentPage - 1})"><<</button>`;
  }
  for (let i = 1; i <= pages && i <= 5; i++) {
    pag.innerHTML += `<button onclick="searchMovies(${i})">${i}</button>`;
  }
  if (currentPage < pages) {
    pag.innerHTML += `<button onclick="searchMovies(${currentPage + 1})">>></button>`;
  }
}
function showDetails(id) {
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
    .then(res => res.json())
    .then(m => {
      document.getElementById("modal-body").innerHTML = `
        <h3>${m.Title}</h3>
        <img src="${m.Poster}" width="200"><br><br>
        <b>Released:</b> ${m.Released}<br>
        <b>Genre:</b> ${m.Genre}<br>
        <b>Country:</b> ${m.Country}<br>
        <b>Director:</b> ${m.Director}<br>
        <b>Actors:</b> ${m.Actors}<br>
        <b>Awards:</b> ${m.Awards}<br><br>
        <p>${m.Plot}</p>
      `;
      document.getElementById("modal").style.display = "block";
    });
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
</script>
</body>
</html>
