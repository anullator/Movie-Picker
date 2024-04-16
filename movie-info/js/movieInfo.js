
const movieInput = localStorage.getItem('title');

async function getMovieData() {
    const id = localStorage.getItem('selectedMovie')
    const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6c33289f24466f62dfa52aceefb07e8a`)
    const responseJson = await movie.json()
    console.log(responseJson)
}

getMovieData()