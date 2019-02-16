# Task 2: View Movie Details

As a consumer, I would like to click on a Movie from the list view and see more information about it. When the user clicks on a movie they will navigate to a new route for that movie.

The detailed data for the movie needs to be loaded from the OMDb API. The URL to fetch the data is `http://www.omdbapi.com/?i=[imdbId]&apikey=c32d368e`, where `imdbId` is an attribute stored in the movie list data.

**Note:** The apikey parameter is required when fetching data.

After the data is loaded, store it in the redux store, then render the movie details to look like the comp (movie_details_comp.pdf).

Acceptance Criteria:
  1. Update the list view such that clicking a movie title or name will take the client to a movie detail page
  2. The movie details view should be served from the route `http://localhost:3000/{id}`

    For example:
      http://localhost:3000/5
      http://localhost:3000/710
      http://localhost:3000/9095

  For any movie:
  3. The view shows the poster, title, rating (IMDB rating out of 10), & description arranged as in the comp
  4. The view shows the budget, genres, release year, and runtime in a table as shown in the comp
  5. No need to include the navigation section.