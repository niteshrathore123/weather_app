const search=document.querySelector('.search');
search.addEventListener('keypress',searchQuery);

function searchQuery(event){
   
    if(event.keyCode===13){
        getSearchResult(search.value);
        search.value="";
    }
    
}
function getSearchResult(query){
    fetch( `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=7e57d5c6e49f932b8cb2ff823900f893`)
    .then(weather =>{
        return weather.json();
    }).then(displayResult)
    .catch((error)=>{
            console.error('Error: ',error);
    });
    
}  
function displayResult(weather){ 
  
    let city=document.querySelector('.location .city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;

    let currentDate=new Date();
    let date=document.querySelector('.location .date');
    date.innerText=dateBuilder(currentDate);

    let temp=document.querySelector('.current .temp');
    temp.innerHTML= `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weath=document.querySelector('.current .weather');
    weath.innerText=weather.weather[0].main;

    let hiLow=document.querySelector('.hi-low');
    hiLow.innerText=`${Math.round(weather.main.temp_min)}°c/ ${Math.round(weather.main.temp_max)}°c`;
}
function dateBuilder(d){
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day=days[d.getDay()];
    let date=d.getDate(); 
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
