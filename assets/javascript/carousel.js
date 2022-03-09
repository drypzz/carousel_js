
// Const

const sliders = document.querySelector('.carousel-b');

// Varialbes

var scrollPerClick;
var imagePadding = 20;
var scrollAmount = 0;


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
}

function sliderScrollRight(){
    if(scrollAmount <= sliders.scrollWidth - sliders.clientWidth){
        sliders.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: 'smooth'
        })
    }
}


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
            <img class='img-${index} slider-img' src='https://image.tmdb.org/t/p/w185/${cur.poster_path}' />
            `
        )
    })

    scrollPerClick = 400;
};