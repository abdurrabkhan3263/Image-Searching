// API AND VARIABLES
let page = 1;
const acessKey = '81aqmoL2lqmjNypRX6hh9LdfZH2k6vIRJSYyXncBTCw';


// SELECTORS VARIABLES
const input = document.querySelector('#search');
const srBtn = document.querySelector('#submit');
const phoBox = document.querySelector('.photosBox');
const loadMore = document.querySelector('.btn');
const img = document.querySelector('.img');
const home = document.querySelector('.home')
let data = '';
let inputval = 'nature';
let logic = false;


// FUNCTION FOR EVENT LISTENER
async function searchImg(input,loadValue){
    const inputBar = document.querySelector('#search')
    if(input === ''){
        inputBar.value = "Search Anything Bhai";
        return;
    }
    inputval = input
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputval}&client_id=${acessKey}`
    const response = await fetch(url).then((response)=>{
        return response.json()
    }).then((data)=>{
        logic = true;
        const value = data;
        data.results.forEach((value,index)=>{
            let img = value.urls['small_s3'];
            let title = value.alt_description;
            data += `
            <div class="img" id=${index}>
            <img src=${img} alt="${title}">
            <p>${title}</p>
        </div>
            `
        })
        if(loadValue){
            data =  loadValue + data.slice(16,data.length)
        }else{
            data = data.slice(16,data.length)
        }
        phoBox.innerHTML = data;
    }).catch((error)=>{
        throw new Error('Find Some Error');
    })
}

function load(){
    if(logic){
        loadval = phoBox.innerHTML;
        page = page + 1;
        searchImg(inputval,loadval)
    }
}



// EVENT LISTENER
srBtn.addEventListener('click' , (e)=>{
    const inputValue = input.value
    e.preventDefault();
    searchImg(inputValue)
})

loadMore.addEventListener('click' ,()=>{
    load();
});



(
    function onLoad(){
        searchImg(inputval)
    }
)();

    // home.addEventListener('click' , function(){
    //     searchImg(inputval,data)
    // }); if any one solve this home feature please solve it and explain it
