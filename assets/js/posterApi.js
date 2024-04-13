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
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?${apiKey}`)
        console.log(response)

        if (!response.ok) {
            throw new error('could not fetch')
        }

        const responseJson = await response.json();

        const posterList = responseJson.posters
        const posterImage = posterList[0].file_path
        const posterBox = document.getElementById('posterBox')
        const poster = document.createElement('img')
        poster.src = `https://image.tmdb.org/t/p/w500${posterImage}`

        posterBox.appendChild(poster)
        console.log(responseJson)
    }
    catch (error) {
        console.error(error)
    }
}
