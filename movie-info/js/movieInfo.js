
const movieInput = localStorage.getItem('title');

async function getMovieData() {
    const id = localStorage.getItem('selectedMovie');
    console.log(id);

    // get movie from api
    const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6c33289f24466f62dfa52aceefb07e8a`);
    const responseJson = await movie.json();
    console.log(responseJson);
    const backdropUrl = `https://image.tmdb.org/t/p/w500${responseJson.backdrop_path}`;
    console.log(backdropUrl);

    // get and appends trailer to page
    renderTrailer(id, backdropUrl);

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
        actorBox.setAttribute('class', 'actor-flex')
        const nameEl = document.createElement('h3');
        const characterEl = document.createElement('p');
        const headshotBox = document.createElement('div')
        headshotBox.setAttribute('class', 'headshot-box')
        const headshotEl = document.createElement('img');
        headshotEl.setAttribute('class', 'headshot')

        // set content of elements
        nameEl.innerHTML = actors[i].name;
        characterEl.innerHTML = `Character: ${actors[i].character}`;
        const headshotUrl = actors[i].profile_path;
        headshotEl.src = `https://image.tmdb.org/t/p/w500${headshotUrl}`;

        // add elements to document
        actorBox.appendChild(nameEl);
        actorBox.appendChild(headshotBox)
        actorBox.appendChild(characterEl);
        headshotBox.appendChild(headshotEl);
        $('#actors-box').append(actorBox);
    }

    // get directors
    const directors = jsonDetails.crew.filter(member =>
        member.department === 'Directing'
    )

    directors.forEach(director => {
        // create elements
        const directorBox = document.createElement('div');

        const nameEl = document.createElement('h4');
        // const headshotEl = document.createElement('img');

        // set content of elements
        nameEl.innerHTML = director.name
        directorBox.setAttribute('class', 'director-name')
        // const headshotUrl = director.profile_path;
        // headshotEl.src = `https://image.tmdb.org/t/p/w500${headshotUrl}`;


        // set content of elements
        nameEl.innerHTML = director.name;

        // add elements to document
        directorBox.appendChild(nameEl);
        $('#director-box').append(directorBox);
    })

    // appends poster to page
    const poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/w500${responseJson.poster_path}`;
    poster.setAttribute('class', 'poster-info')
    $('#posterBox').append(poster);

    // ---- get and append movie details to page -----

    // movie title
    const titleEl = document.createElement('h2');
    titleEl.innerHTML = responseJson.title;
    $('#details-container').append(titleEl);

    // release date
    const dateEl = document.createElement('p');
    const unformattedDate = responseJson.release_date;
    const formattedDate = dayjs(unformattedDate).format('MMM DD, YYYY');
    dateEl.innerHTML = `Release Date: ${formattedDate}`;
    $('#details-container').append(dateEl);

    // movie summary
    const summaryEl = document.createElement('p');
    summaryEl.innerHTML = responseJson.overview;
    summaryEl.setAttribute('class', 'summaryEL')
    $('#details-container').append(summaryEl);

    // ---- add genres -----
    const genres = responseJson.genres;

    genres.forEach(genre => {
        const genreEl = document.createElement('p');
        genreEl.innerHTML = genre.name;
        $('#genres').append(genreEl);
    })

}

getMovieData();


