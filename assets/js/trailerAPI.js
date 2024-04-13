const baseUrl = `https://api.kinocheck.de/movies?`;

async function getTrailerID(tmdbID) {
    let trailerID;

    try {
        const url = `${baseUrl}tmdb_id=${tmdbID}&language=en&categories=Trailer`;
        const response = await fetch(url); //get movie by tmdb id
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    return trailerID;
}
