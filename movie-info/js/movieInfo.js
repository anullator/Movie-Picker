
const movieInput = localStorage.getItem('title');

async function getMovieData() {
    const id = localStorage.getItem('selectedMovie');
    console.log(id);

    // get movie from api
    const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6c33289f24466f62dfa52aceefb07e8a`);
    const responseJson = await movie.json();
    console.log(responseJson)

    // gets movie details from api
    const details = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=6c33289f24466f62dfa52aceefb07e8a`);
    const jsonDetails = await details.json();
    console.log(jsonDetails);

    // get top 5 actors
    const actors = jsonDetails.cast;
    console.log(actors);
    
    for (let i = 0; i < 5; i++) {

        // create elements
        const actorBox = document.createElement('div');
        const nameEl = document.createElement('h3');
        const characterEl = document.createElement('p');
        const headshotEl = document.createElement('img');

        // set content of elements
        nameEl.innerHTML = actors[i].name;
        characterEl.innerHTML = `Character: ${actors[i].character}`;
        const headshotUrl = actors[i].profile_path;
        headshotEl.src = `https://image.tmdb.org/t/p/w500${headshotUrl}`;

        // add elements to document
        actorBox.appendChild(nameEl);
        actorBox.appendChild(characterEl);
        actorBox.appendChild(headshotEl);
        $('#actors-box').append(actorBox);

    }

    // get directors
    const directors = jsonDetails.crew.filter(member => 
        member.department === 'Directing'
    )
    console.log(directors);

    directors.forEach(director => {
        // create elements
        const directorBox = document.createElement('div');
        const nameEl = document.createElement('h3');
        const headshotEl = document.createElement('img');

        // set content of elements
        nameEl.innerHTML = director.name;
        const headshotUrl = director.profile_path;
        headshotEl.src = `https://image.tmdb.org/t/p/w500${headshotUrl}`;

        // add elements to document
        directorBox.appendChild(nameEl);
        directorBox.appendChild(headshotEl);
        $('#director-box').append(directorBox);
    })


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


