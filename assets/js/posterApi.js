
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzMzMjg5ZjI0NDY2ZjYyZGZhNTJhY2VlZmIwN2U4YSIsInN1YiI6IjY2MTVmOTU3NjZhMGQzMDE0YTJmY2VhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LuqkAnwdSd6tX7f-6S_12VEqC_d6FyGiVMkp0DTRB7E'
    }
};

fetch('https://api.themoviedb.org/3/authentication', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));