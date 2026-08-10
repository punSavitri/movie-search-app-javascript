
//assign variable to the DOM element
const moviesContainer = document.getElementById("movies-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//when the page finishes loading, then display random movies by default
document.addEventListener("DOMContentLoaded", () => {
  displayMovies();
});
//fetch movie data from OMDB API to display moviee by default popular
async function displayMovies() {
  
  //show loading message while fetching movies  
  moviesContainer.innerHTML = `<p> Loading movies...`;
    
    const randomSearchTerms = ["action", "comedy", "drama", "adventure"];
    const randomTerm =
      randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];
    
    //fetch movies from backend usig the random term
      const response = await fetch(`/movies?s=${randomTerm}`);
    const data = await response.json();
    console.log(data);    //log full API response for debugging

    //if moives exist, display them
    if (data.Search && data.Search.length > 0) {
      moviesToShow(data.Search);
    } else {
      moviesContainer.innerHTML = `<p>No random movies found.</p>`;
    }
 
}

//display movies dynamically inside the <div id="moivesContainer">
function moviesToShow(movies) {
    //clear previous results
    moviesContainer.innerHTML = "";
    //loop through each movie and create a moive card
    movies.map(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        //movie card structure
        movieCard.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h2>${movie.Title}</h2>
        <p>${movie.Year}</p>
        `;
      //Add movie card to the page
        moviesContainer.appendChild(movieCard);
    })
}

//handle search button click to fetch moview based on user input
searchButton.addEventListener("click", async() => {
 //get user search text
  const query = searchInput.value.trim();

  //only search if input is not empty
  if (query !== "") {
    try {
        //fetch movies based on search term
      const movies = await fetchMoviesQuery(query);
      //display movies on the page
      moviesToShow(movies);
    } catch (error) {
      console.log("Fetching error movies by query", error);
      return [];
    }
  }
  searchInput.value = " ";
})
//fetch movies from backend using a specific search query
async function fetchMoviesQuery(query) {

  try {
    //fetch the data using the backend route instead OMDB directly
    const response = await fetch(`/movies?s=${query}`);
    const data = await response.json();
    return data.Search;
  } catch (error) {
    console.error("Fetching error movies", error);
    moviesContainer.innerHTML = `<p>Error fetching movies. Please try again later.</p>`;
  }  
}


