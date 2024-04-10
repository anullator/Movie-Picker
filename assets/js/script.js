const streamAvailAPI = '4e07f7e371msh03925504bb9f3f0p12b002jsn5482b87d7178';
const streamBaseURL = 'https://streaming-availability.p.rapidapi.com';


// store movie input to local storage
function storeTitle(movieInput) {
    // const title = document.getElementById('title').value;

    if (movieInput) {
        localStorage.setItem('title', movieInput);
        document.getElementById('title').value = '';
    } else {
        alert('Please enter a movie title');
    }
}

// handle click on search button
function handleSearch(event) {
    event.preventDefault();
    const movieInput = document.getElementById('title').value;
    storeTitle(movieInput);
    fetchdata(movieInput);
}

// get movies using api
async function fetchdata(movieInput) {
    // const movieInput = document.getElementById('title').value;
    const url = `${streamBaseURL}/search/title?title=${movieInput}&country=us&show_type=all&output_language=en`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4e07f7e371msh03925504bb9f3f0p12b002jsn5482b87d7178',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// render movies

// load function and add event listeners
window.onload = function() {
    document.getElementById('search').addEventListener('click', handleSearch); //revert to handle search
}