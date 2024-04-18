const apiKey = 'api_key=6c33289f24466f62dfa52aceefb07e8a'


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzMzMjg5ZjI0NDY2ZjYyZGZhNTJhY2VlZmIwN2U4YSIsInN1YiI6IjY2MTVmOTU3NjZhMGQzMDE0YTJmY2VhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LuqkAnwdSd6tX7f-6S_12VEqC_d6FyGiVMkp0DTRB7E'
    }
};

fetch('https://api.themoviedb.org/3/authentication', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

// poster API
async function moviePosters(id) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?${apiKey}&include_image_language=en`)

        if (!response.ok) {
            throw new error('could not fetch')
        }

        const responseJson = await response.json();
        const posterList = responseJson.posters
        const posterImage = posterList[0].file_path
        const posterBox = document.getElementById('posterBox')
        const poster = document.createElement('img')
        poster.setAttribute('class', 'poster')
        poster.src = `https://image.tmdb.org/t/p/w500${posterImage}`
        poster.onclick = function () {
            console.log('clicked', responseJson.id)
            localStorage.setItem('selectedMovie', responseJson.id)
            const baseURL = window.location.origin;

            // Check if running locally
            if (baseURL.includes("127.0.0.1")) {
                // Local development path
                window.location.href = baseURL + "/movie-info/index.html";
            } else {
                // Deployed path
                window.location.href = baseURL + "/Movie-Picker/movie-info/index.html";
            }
        }
        posterBox.appendChild(poster)
    }
    catch (error) {
        console.error(error)
    }
}

const searchBox = document.getElementById('searchBox')
const searchMessage = document.createElement('h2')
searchMessage.setAttribute('class', 'search-result-msg')
searchMessage.textContent = `Results for "${localStorage.getItem('title')}"`
searchBox.appendChild(searchMessage)


async function trendingMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&${apiKey}`);

        if (!response.ok) {
            throw new error('could not fetch');
        }

        const { results } = await response.json();
        const topMovieBox = document.getElementById('topMovieBox');
        for (i = 0; i < 12; i++) {
            const topMovie = results[i];
            const moviePoster = topMovie.poster_path;
            const topMoviePoster = document.createElement('img');
            topMoviePoster.setAttribute('class', 'top-movie-poster');
            topMoviePoster.src = `https://image.tmdb.org/t/p/w500${moviePoster}`;
            topMovieBox.appendChild(topMoviePoster);
            const movieTitle = topMovie.title;
            topMoviePoster.onclick = function () {
                localStorage.setItem('selectedMovie', topMovie.id)
                window.location.href = "./movie-info/index.html"
            }
        }

    }
    catch (error) {
        console.error(error)
    }
}
