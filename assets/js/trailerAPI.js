// try using kinocheck api instead https://api.kinocheck.com/
//can use imdb key from  movie api to get trailer

const baseUrl = `https://api.kinocheck.de/movies?`;

async function getTrailers(tmdbID) {

    try {
        const url = `${baseUrl}tmdb_id=${tmdbID}&language=en&categories=Trailer`;
        const response = await fetch(url); //get movie by tmdb id
        const result = await response.json();
        console.log(result);
        renderTrailers(result);

    } catch (error) {
        console.log(error);
    }
}

function renderTrailers(movie) {
    const trailerUrl = movie.url;
    console.log(trailerUrl);

    const trailerFrame = document.createElement('iframe'); //create iframe

    $('#trailer-container').append(trailerFrame); //add iframe to container 

    $('#trailer-container').attr({
        allowfullscreen: true,
        height: 200,
        loading: 'eager',
        name: 'trailer',
        src: trailerUrl,
        width: 350,
    }) //adds attributes to trailer iframe
}
