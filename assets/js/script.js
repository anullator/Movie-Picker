const streamAvailAPI = '4e07f7e371msh03925504bb9f3f0p12b002jsn5482b87d7178';
const streamAvailBaseURL = 'https://streaming-availability.p.rapidapi.com';


// store movie input to local storage
function storeTitle() {
    const title = document.getElementById('title').textContent;
    localStorage.setItem('movie', title);
}

// get movies using api

// render movies

// load function and add event listeners
window.onload = function() {
    document.getElementById('search').addEventListener('click', handleSearch);
}
