
const movieInput = localStorage.getItem('title');

async function getMovieData() {
    const id = localStorage.getItem('selectedMovie');
    console.log(id);
    const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6c33289f24466f62dfa52aceefb07e8a`);
    const responseJson = await movie.json();
    console.log(responseJson)

    // gets kinocheck movie object



    // appends poster to page
    const poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/w500${responseJson.poster_path}`;
    $('#posterBox').append(poster);

    // get and appends trailer to page
    renderTrailer(id);

    // ---- get and append movie details to page -----

    // movie title
    const titleEl = document.createElement('h2');
    titleEl.innerHTML = responseJson.title;
    $('#details-container').append(titleEl);

    // release date
    const dateEl = document.createElement('p');
    const unformattedDate =responseJson.release_date;
    const formattedDate = dayjs(unformattedDate).format('MMM DD, YYYY');
    dateEl.innerHTML = `Release Date: ${formattedDate}`;
    $('#details-container').append(dateEl);

    // movie summary
    const summaryEl = document.createElement('p');
    summaryEl.innerHTML = responseJson.overview;
    $('#details-container').append(summaryEl);

    // ---- add genres -----
    const genres = responseJson.genres;
    
    genres.forEach(genre => {
        const genreEl = document.createElement('li');
        genreEl.innerHTML = genre.name;
        $('#genres').append(genreEl);
    })

}

getMovieData()


