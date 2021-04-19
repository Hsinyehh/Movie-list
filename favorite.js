const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const movies = JSON.parse(localStorage.getItem('favoriteMovies'))//收藏清單

const dataPanel = document.querySelector('#data-panel')


//display movie data
function renderMovie(data) {
  let rawHTML = ''
  data.forEach((item) => {
    // title, image, id
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${POSTER_URL + item.image}" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        </div>
      <div class="card-footer">
        <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id}">More</button>
        <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">x</button>
      </div>
      </div >
    </div >
  </div > `
  })
  dataPanel.innerHTML = rawHTML
}



// Show Movie modal
function showMovieModal(id) {
  const movieTitle = document.querySelector('#movie-modal-title')
  const movieImage = document.querySelector('#movie-modal-image')
  const movieDate = document.querySelector('#movie-modal-date')
  const movieDescription = document.querySelector('#movie-modal-description')
  axios.get(INDEX_URL + id)
    .then(response => {
      // handle success
      const data = response.data.results
      movieTitle.innerText = data.title
      movieDate.innerText = 'Release date: ' + data.release_date
      movieDescription.innerText = data.description
      movieImage.innerHTML = `< img src = "${POSTER_URL + data.image}" class="img-fluid"
    alt = "Movie poster" > `

    })
    .catch(error => {
      // handle error
      console.log(error)
    })


}

function removeFromFavorite(id) {
  if (!movies) return

  const movieID = movies.findIndex((movie) => movie.id === id)
  if (movieID === -1) return
  movies.splice(movieID, 1)
  localStorage.setItem('favoriteMovies', JSON.stringify(movies))
  renderMovie(movies)
}


//listen to dataPanel,   display movie content by button
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

renderMovie(movies)




