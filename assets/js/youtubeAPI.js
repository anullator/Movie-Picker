const ytKey = 'AIzaSyAnOiMuIflUnZmFkuMsdxyRDEvSYnfde3Y';
const ytBaseUrl = `https://www.googleapis.com/youtube/v3/videos`;

async function getYtFrame(trailerID) {

    const fetchUrl = `${ytBaseUrl}?key=${ytKey}&id=${trailerID}&part=id,snippet,player`;

    let ytHTML;
    try {
        const response = await fetch(fetchUrl);
        const result = await response.json();
        console.log(result);

        // testing only <-------
        const player = result.items[0].player;
        console.log(player);
        
        ytHTML = result.items[0].player.embedHtml; // gets YouTube iframe

    } catch (error) {
        console.log(error);
    }
    return ytHTML;
}

async function renderTrailer(tmdbID) {
    const trailerID = await getYtID(tmdbID); //gets youtube video id
    const ytFrame = await getYtFrame(trailerID); //gets to youtube iframe
    console.log(ytFrame);

    $('#trailer-container').append(ytFrame); //appends iframe to container
    const url = $('iframe').attr('src');
    $('iframe').attr('src', `https:${url}`); //sets ifram src url

}


