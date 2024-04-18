const baseUrl = `https://api.kinocheck.de/movies`;

async function getYtID(tmdbID) {
    let ytID;

    try {
        const url = `${baseUrl}?tmdb_id=${tmdbID}&language=en&categories=Trailer`;
        const response = await fetch(url); //get movie by tmdb id
        const result = await response.json();

        ytID = result.trailer.youtube_video_id;
    } catch (error) {
        console.log(error);
    }
    return ytID;
}
