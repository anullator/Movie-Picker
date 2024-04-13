// try using kinocheck api instead https://api.kinocheck.com/
//can use imdb key from  movie api to get trailer

const baseUrl = `https://api.kinocheck.de/movies?`;

async function getTrailers(tmdbID) {

    try {
        const url = `${baseUrl}tmdb_id=${tmdbID}&language=en&categories=Trailer`;
        const response = await fetch(url);
        const result = response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }

}
