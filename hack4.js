const API_KEY = 'f9ee71f4';  // Replace with your API key
const BASE_URL = 'https://www.omdbapi.com/';

const searchInput = document.getElementById('search-input');
const movieGrid = document.getElementById('movie-grid');
const movieDetails = document.getElementById('movie-details');
const movieInfo = document.getElementById('movie-info');
const closeButton = document.querySelector('.close-button');
const watchlistButton = document.getElementById('watchlist-button');

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Fetch Movies by Title
async function fetchMovies(query) {
    try {
        const url = `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;
        console.log(`Fetching from URL: ${url}`); // Log the URL for debugging
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API Response:', data); // Log the API response
        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieGrid.innerHTML = '<p>No movies found</p>';
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        movieGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
    }
}

// Display Movies in Grid
function displayMovies(movies, isWatchlist = false) {
    movieGrid.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title} (${movie.Year})</h3>
            ${isWatchlist ? `<button onclick="removeFromWatchlist('${movie.imdbID}')">Remove from Watchlist</button>` : ''}
        `;
        movieItem.addEventListener('click', () => fetchMovieDetails(movie.imdbID));
        movieGrid.appendChild(movieItem);
    });

    // Apply pop-out effect to images
    document.querySelectorAll('.movie-item img').forEach(img => {
        img.addEventListener('click', () => {
            img.classList.toggle('popout');
        });
    });
}

// Fetch Movie Details
async function fetchMovieDetails(imdbID) {
    try {
        const url = `${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`;
        const response = await fetch(url);
        const movie = await response.json();
        displayMovieDetails(movie);
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Display Movie Details in Modal
function displayMovieDetails(movie) {
    movieInfo.innerHTML = `
    <div class="movie-details-content">
        <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">
        <div class="details">
            <h2>${movie.Title}</h2>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Rating:</strong> ${movie.imdbRating}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Writer:</strong> ${movie.Writer}</p>
            <p><strong>Cast:</strong> ${movie.Actors}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>Language:</strong> ${movie.Language}</p>
            ${movie.Awards ? `<p><strong>Awards:</strong> ${movie.Awards}</p>` : ''}
            <button onclick="addToWatchlist('${movie.imdbID}')">Add to Watchlist</button>
        </div>
    </div>
    `;
    movieDetails.style.display = 'flex';
}

// Close Modal
closeButton.addEventListener('click', () => {
    movieDetails.style.display = 'none';
});

// Add Movie to Watchlist
function addToWatchlist(imdbID) {
    if (!watchlist.includes(imdbID)) {
        watchlist.push(imdbID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert('Movie added to watchlist!');
    } else {
        alert('Movie already in watchlist!');
    }
}

// Remove Movie from Watchlist
function removeFromWatchlist(imdbID) {
    watchlist = watchlist.filter(id => id !== imdbID);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    alert('Movie removed from watchlist!');
    showWatchlistMovies(); // Refresh watchlist view
}

// Show Watchlist Movies
watchlistButton.addEventListener('click', () => {
    movieGrid.innerHTML = '<h2>Watchlist</h2>';  // Add Watchlist header
    if (watchlist.length === 0) {
        movieGrid.innerHTML += '<p>No movies in watchlist</p>';
    } else {
        // Create a fragment to improve performance
        const fragment = document.createDocumentFragment();

        // Fetch all movies from the watchlist
        const promises = watchlist.map(async (imdbID) => {
            try {
                const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
                const movie = await response.json();
                
                const movieItem = document.createElement('div');
                movieItem.classList.add('movie-item');
                movieItem.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title} (${movie.Year})</h3>
                    <button onclick="removeFromWatchlist('${movie.imdbID}')">Remove from Watchlist</button>
                `;
                
                // Append movie item to the fragment
                fragment.appendChild(movieItem);
            } catch (error) {
                console.error('Error fetching watchlist movie details:', error);
            }
        });

        // Wait for all fetches to complete
        Promise.all(promises).then(() => {
            // Append the fragment to the movieGrid once all movies are fetched
            movieGrid.innerHTML = '';  // Clear the grid
            movieGrid.appendChild(fragment);  // Append the fetched movies
        });
    }
});

// Search Input Event Listener
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    console.log(`Search Query: ${query}`); // Log search query
    if (query) {
        fetchMovies(query);
    } else {
        movieGrid.innerHTML = ''; // Clear grid if no search query
    }
});

document.getElementById('back-to-menu').addEventListener('click', function() {
    window.location.href = 'hack4.html'; // Replace with the URL of your menu page
});
