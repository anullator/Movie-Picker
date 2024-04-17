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
        poster.src = `https://image.tmdb.org/t/p/w500${posterImage}`
        poster.onclick = function () {
            console.log('clicked', responseJson.id)
            localStorage.setItem('selectedMovie', responseJson.id)
            window.location.href = "/movie-info/index.html"
        }
        posterBox.appendChild(poster)
        console.log(responseJson)
        
    }
    catch (error) {
        console.error(error)
    }
}

async function trendingMovies() {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&${apiKey}`)

        if (!response.ok) {
            throw new error('could not fetch')
        }

        const { results } = await response.json()
        console.log(results)

        const topMovieBox = document.getElementById('topMovieBox');
        for (i = 0; i < 8; i++) {
            const topMovie = results[i]
            console.log(topMovie)
            const moviePoster = topMovie.poster_path
            const topMoviePoster = document.createElement('img')
            topMoviePoster.setAttribute('class', 'top-movie-poster')
            topMoviePoster.src = `https://image.tmdb.org/t/p/w500${moviePoster}`
            topMovieBox.appendChild(topMoviePoster)
            const movieTitle = topMovie.title
            console.log(movieTitle)
            topMoviePoster.onclick = function () {
                localStorage.setItem('selectedMovie', topMovie.id)
                window.location.href = "movie-info/index.html" // potentially await page load

                // fetch id and video info for selected video trailer
                    // await trailer video
                    // if no video, insert placeholder of my choice (othervideo, thumbnail, text etc)
            }
        }

    }
    catch (error) {
        console.error(error)
    }
}
