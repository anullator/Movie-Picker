const ytKey = 'AIzaSyAnOiMuIflUnZmFkuMsdxyRDEvSYnfde3Y';
const ytBaseUrl = `https://www.googleapis.com/youtube/v3/videos`;

async function getYtFrame(trailerID) {
    const fetchUrl = `${ytBaseUrl}?key=${ytKey}&id=${trailerID}&part=id,snippet,player`;
    let ytHTML; // for iframe

    try {
        const response = await fetch(fetchUrl);
        const result = await response.json();

        ytHTML = result.items[0].player.embedHtml; // gets YouTube iframe
    } catch (error) {
        console.log(error);
    }
    return ytHTML;
}

async function renderTrailer(tmdbID, backdropUrl) {
    const trailerID = await getYtID(tmdbID); //gets youtube video id
    const ytFrame = await getYtFrame(trailerID); //gets to youtube iframe
    
    if (ytFrame) {
        $('#trailer-container').removeClass('no-trailer');
        $('#trailer-container').append(ytFrame); //appends iframe to container
        const url = $('iframe').attr('src');
        $('iframe').attr('src', `https:${url}`); //sets ifram src url
    } else {

        // display thumbnail placeholder
        $('#trailer-container').text('No trailer available');
        $('#trailer-container').addClass('no-trailer'); // adds class for the below css style

        //TODO: THIS CSS SHOULD PROBABLY BE PUT IN A CLASS in a css file THEN UNCOMMENT LINE 34 TO ATTACH THE CLASS TO THE ELEMENT
        $('.no-trailer').css({
            'background-image': `url(${backdropUrl})`,
            'background-size': 'contain',
            'background-repeat': 'no-repeat',
            'min-height': '200px',
            'opacity': '50%',
            'z-index': '-1',
        });
    }
}


