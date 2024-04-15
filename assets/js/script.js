const streamAvailAPI = '4e07f7e371msh03925504bb9f3f0p12b002jsn5482b87d7178';
const streamBaseURL = 'https://streaming-availability.p.rapidapi.com';


// store movie input to local storage
function storeTitle(movieInput) {
    // const title = document.getElementById('title').value;

    if (movieInput) {
        localStorage.setItem('title', movieInput);
        document.getElementById('title').value = '';
    } else {
        alert('Please enter a movie title');
    }
}

function storeId(tmdbId) {
    if (tmdbId) {
        localStorage.setItem('tmdbID', tmdbId)
    }
}

// handle click on search button
function handleSearch(event) {
    event.preventDefault();
    $('#posterBox').empty(); // clears previous poster from postercontainer
    $('#trailer-container').empty(); //clears previous trailer from trailer container

    const movieInput = document.getElementById('title').value;
    storeTitle(movieInput);
    window.location.href = "movie-search/index.html"
}

// get movies using api
async function fetchdata(movieInput) {
    const url = `${streamBaseURL}/search/title?title=${movieInput}&country=us&show_type=all&output_language=en`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4e07f7e371msh03925504bb9f3f0p12b002jsn5482b87d7178',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const { result } = await response.json();
        // grabbing tmdbID within api
        const movieList = result
        for (let i = 0; i < movieList.length; i++) {
            let movies = movieList[i]
            const tmdbId = movies.tmdbId
            // attaching tmdbID to moviePoster function
            moviePosters(tmdbId);

        }
        storeId(tmdbId)
        renderTrailer(tmdbId);
        movieTitle(tmdbId);

        console.log(result)

    } catch (error) {
        console.error(error);
    }
}
// render movies

// load function and add event listeners
window.onload = function () {
    document.getElementById('search').addEventListener('click', handleSearch); //revert to handle search
    trendingMovies()

}