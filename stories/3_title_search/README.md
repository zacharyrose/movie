# Task 3: Searching for movies by title

As a consumer, I would like to be able to browse a list of movies based on my search.

The navigation section will have a text input and "Search" button on the right side. The text input should allow the user to enter a search term, then when the user clicks the button:
1. The URL will change to include the search term in a "q" parameter

    For example: Searching for 'Time' will navigate to `http://localhost:3000/?q=Time`

2. The movie search endpoint will be queried for new results.
3. The new results will be stored in the redux store.
4. The list of results will display only the search results.

The search results data for the movie needs to be loaded from the local server API. The URL to fetch the data is `http://localhost:3001/movies/search?s=[term]`, where `term` can be any search query.


Acceptance Criteria:
  1. There is a navigation section on each page which includes a text input and "Search" button
  2. Searching causes the user to navigate to the homepage with the term in a "q" parameter
  3. The page then loads data from the search endpoint and displays that list
  4. The movie list should like like the default homepage view (see list_search_comp.pdf)
  5. No need to include movie list hover behavior.
