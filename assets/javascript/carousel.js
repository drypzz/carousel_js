
// Const

const sliders = document.querySelector('.carousel-b');

// Varialbes

var scrollAmount = 0;
var scrollPerClick;


// call

showMovieData();


// function click

function sliderScrollLeft(){
    sliders.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick),
        behavior: 'smooth'
    });

    if(scrollAmount < 0){
        scrollAmount = 0
    }

    console.log('-'+ scrollAmount);
};

function sliderScrollRight(){
    if(scrollAmount <= sliders.scrollWidth - sliders.clientWidth){
        sliders.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: 'smooth'
        })
    }

    console.log('+'+ scrollAmount);
};


// function carousel

async function showMovieData(){
    const api_key = 'c7208c7bd5cb1f231e3f2b65995c56b0';

    var result = await axios.get(
        'https://api.themoviedb.org/3/discover/movie?api_key='+ api_key +'&sort_by=popularity.desc'
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