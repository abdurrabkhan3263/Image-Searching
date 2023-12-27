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
let inputval = 'all';
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
        const apiData = data;
        data.results.forEach((value,index)=>{
            let img = value.urls['small'];
            let title = value.alt_description;
            data += `
            <div class="img">
                <div class="image">
                    <a href="#" target='_blank' id=${index}><img src="${img}" alt="Ocean" id=${index}></a>
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
        document.querySelectorAll('.img').forEach((value)=>{
            value.addEventListener('click' , (e)=>{
                const data = e.target
                if(data.hasAttribute('id')){
                    const downloadVal = apiData.results[data.id].links['download']
                    console.log(apiData.results[data.id].links)
                    data.parentNode.setAttribute('href' , downloadVal)
                }
            })
        })
    }).catch((error)=>{
        logic = false;
        phoBox.innerHTML = '';
        errorPage.classList.add('error')
        throw new Error('Find Some Error');
    })
    
}



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
