// API AND VARIABLES
let page = 1;
const acessKey = '81aqmoL2lqmjNypRX6hh9LdfZH2k6vIRJSYyXncBTCw';


// SELECTORS VARIABLES
const input = document.querySelector('#search');
const srBtn = document.querySelector('#submit');
const phoBox = document.querySelector('.photosBox');
const loadMore = document.querySelector('.btn');
const img = document.querySelector('.img');
const home = document.querySelector('.home');
const reload = document.querySelector('.reload');
const errorPage = document.querySelector('.photosBox')
let data = '';
let inputval = 'a;;';
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
        errorPage.classList.remove('error')
        logic = true;
        const value = data;
        data.results.forEach((value,index)=>{
            let img = value.urls['small_s3'];
            let title = value.alt_description;
            data += `
            <div class="img">
                <div class="image">
                    <img src="${img}" alt="Ocean">
                </div>
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
        logic = false;
        phoBox.innerHTML = '';
        errorPage.classList.add('error')
        throw new Error('Find Some Error');
    })
}

img.addEventListener('click' , function(e){
    console.log("Hello")
})


function load(){
    if(logic){
        loadval = phoBox.innerHTML;
        page = page + 1;
        searchImg(inputval,loadval)
        if(page === 199){
            page = 1;
        }
    }
}

home.addEventListener('click' , function(e){
    searchImg(inputval ,)  
})

reload.addEventListener('click' , function(){
    page = page + 1;
    searchImg(inputval , )
    if(page === 199){
        page = 1;
    }
})

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
        searchImg(inputval , )
    }
)();
