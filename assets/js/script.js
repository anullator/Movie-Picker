const streamAvailAPI = '4e07f7e371msh03925504bb9f3f0p12b002jsn5482b87d7178';
const streamAvailBaseURL = 'https://streaming-availability.p.rapidapi.com';


// store movie input to local storage
function storeTitle(event) {
    event.preventDefault(); // remove later
    const title = document.getElementById('title').value;

    if (title) {
        localStorage.setItem('title', title);
        document.getElementById('title').value = '';
    } else {
        alert('Please enter a movie title');
    }

}

function handleSearch() {
    fetchdata();
}

// get movies using api

// render movies

// load function and add event listeners
window.onload = function() {
    document.getElementById('search').addEventListener('click', storeTitle); //revert to handle search
}
