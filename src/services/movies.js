
const MoviesService = {
  getAllMovies: () => fetch('http://localhost:3001/movies/all')
      .then(function(response) {
        return response.json();
      })
}

export default MoviesService;
