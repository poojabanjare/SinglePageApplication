## Movie Search App

This is a simple movie search app built with HTML, CSS, and JavaScript. It allows users to search for movies using the OMDb API, view movie details in a modal, and manage a watchlist.

### Features

#### HTML:

-   **Semantic HTML5 elements:** Used for better structure and accessibility (header, main, div, img, h1-h3, p, ul, li, button).
-   **Input field:** For searching movie titles.
-   **Movie grid:** Displays movie posters and titles in a responsive grid layout.
-   **Modal:** Used to display detailed information about a selected movie.
-   **Watchlist button:** Opens a section to view saved movies.

#### CSS:

-   **External stylesheet (style.css):** Keeps CSS separate for maintainability.
-   **Responsive grid layout:** Adapts to different screen sizes.
-   **Modal styling:** Creates an overlay effect for movie details.
-   **Hover effects:**  For interactive elements.

#### JavaScript:

-   **Fetches data from OMDb API:** Uses `fetch` to retrieve movie data.
-   **Dynamically renders content:** Updates the HTML to display movie results and details.
-   **Modal functionality:** Shows and hides the movie details modal.
-   **Local storage:** Persists the watchlist even after the browser is closed.
-   **Search input event handling:** Fetches and displays movies as the user types.
-   **Error handling:** Provides user-friendly messages in case of API errors.
    
### Functionalities

-   **Search for movies:** Type a movie title in the search bar to get started.
-   **View movie details:** Click on a movie poster to open a modal with more information.
-   **Add/remove movies from watchlist:** Click the "Add to Watchlist" button on a movie's details page.
-   **View watchlist:** Click the "Watchlist" button to see your saved movies.
    
### How to Run

1.  Make sure you have an API key from OMDb. Replace `'YOUR_API_KEY'` in `script.js` with your actual API key.
2.  Open `index.html` in your web browser.

### Potential Improvements

-   Implement pagination for search results.
-   Add the ability to filter or sort movie results.
-   Improve the UI/UX with animations and transitions.
-   Write more comprehensive error handling for different API response scenarios.
-   Add user authentication to store watchlists on a server. 
