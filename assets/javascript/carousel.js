// Const

const sliders = document.querySelector('.carousel-b');


// Variable's

var year = '2022'; // ano atual

var scrollPerClick;


// Table's

var tables = {
    'geral':{
        'scrollAmount': 0, // não mexer
        'number': 6 // escolha de 1 a 6
    },
    'apis': {
        'key': 'c7208c7bd5cb1f231e3f2b65995c56b0', // key

        // api's links
        1: '&sort_by=popularity.desc',
        2: '&certification_country=US&certification=R&sort_by=vote_average.desc',
        3: '&with_genres=18&primary_release_year='+ year,
        4: '&with_genres=18&sort_by=vote_average.desc&vote_count.gte=10',
        5: '&certification_country=US&certification.lte=G',
        6: '&primary_release_year='+ year
    }
};


// call

showMovieData();


// function click

function sliderScrollLeft(){
    sliders.scrollTo({
        top: 0,
        left: (tables['geral']['scrollAmount'] -= scrollPerClick),
        behavior: 'smooth'
    });

    if(tables['geral']['scrollAmount'] < 0){
        tables['geral']['scrollAmount'] = 0
    }

    console.log('-'+ tables['geral']['scrollAmount']);
};

function sliderScrollRight(){
    if(tables['geral']['scrollAmount'] <= sliders.scrollWidth - sliders.clientWidth){
        sliders.scrollTo({
            top: 0,
            left: (tables['geral']['scrollAmount'] += scrollPerClick),
            behavior: 'smooth'
        })
    }

    console.log('+'+ tables['geral']['scrollAmount']);
};


// function carousel

async function showMovieData(){
    const api_key = tables['apis']['key'];
    const api_url = tables['apis'][tables['geral']['number']];

    var result = await axios.get(
        'https://api.themoviedb.org/3/discover/movie?api_key='+ api_key +''+ api_url
    );

    result = result.data.results

    result.map(function(cur, index){
        sliders.insertAdjacentHTML(
            'beforeend',
            `
            <img class='img-${index}' src='https://image.tmdb.org/t/p/w185/${cur.poster_path}' alt='${cur.title}' />
            `
        )
    })

    scrollPerClick = 400;

    console.log(result);
};