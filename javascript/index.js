
//assign variable to the element
const moviesContainer = document.getElementById("movies-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


document.addEventListener("DOMContentLoaded", () => {
  displayMovies();
});
//fetch movie data from OMDB API to display moviee by default popular
async function displayMovies() {
  
    moviesContainer.innerHTML = `<p> Loading movies...`;
    
    const randomSearchTerms = ["action", "comedy", "drama", "adventure"];
    const randomTerm =
      randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];
    
    const response = await fetch(`/movies?s=${randomTerm}`);
    const data = await response.json();
    console.log(data);

    if (data.Search && data.Search.length > 0) {
      moviesToShow(data.Search);
    } else {
      moviesContainer.innerHTML = `<p>No random movies found.</p>`;
    }
 
}
function moviesToShow(movies) {
    //clear previous results
    moviesContainer.innerHTML = "";
    //show each movie in the div="movies-container"
    movies.map(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h2>${movie.Title}</h2>
        <p>${movie.Year}</p>
        `;

        moviesContainer.appendChild(movieCard);
    })
}
searchButton.addEventListener("click", async() => {
  const query = searchInput.value.trim();

  if (query !== "") {
    try {
      const movies = await fetchMoviesQuery(query);
      moviesToShow(movies);
    } catch (error) {
      console.log("Fetching error movies by query", error);
      return [];
    }
  }
  searchInput.value = " ";
})

async function fetchMoviesQuery(query) {

  try {
    const response = await fetch(`/movies?s=${query}`);
    const data = await response.json();
    return data.Search;
  } catch (error) {
    console.error("Fetching error movies", error);
    moviesContainer.innerHTML = `<p>Error fetching movies. Please try again later.</p>`;
  }  
}


