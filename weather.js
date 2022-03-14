// const inputValue=document.querySelector("input");
// const submitBtn=document.querySelector("button");

// let cities = document.querySelector(".cities")
// let msg = document.querySelector(".msg")
// localcity=[]
// const getWeather= async(e)=>{
//     e.preventDefault()
//    console.log(inputValue.value);
// const responseData= await axios(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=4838f017a05b34465b93be7fd1569fda&units=metric`)
// console.log(responseData.data.weather[0]);
// const weather=responseData.data.weather[0];
// console.log(weather);
// if(localcity.includes(inputValue.value)){
//   msg.innerText=`You already know the weather for ${inputValue.value},Please search for another city`
// }else{
//   cities.innerText +=` <ul class="city">
// <li class="city-name"> ${inputValue.value}</li>

//   </ul>`
// }
// }


// submitBtn.addEventListener("click",getWeather)

const form=document.querySelector("section.top-banner form");
const input=document.querySelector("div.container input");
const msg=document.querySelector("span.msg");
const cityList=document.querySelector(".cities");

localStorage.setItem("apiKey", EncryptStringAES("c145b07765515b106a0bfa6a8a9e59ea"))
form.addEventListener("submit",(event)=>{
  event.preventDefault();
  getWeatherDataFromApi();
})
const getWeatherDataFromApi=async()=>{
let apiKey=DecryptStringAES(localStorage.getItem("apiKey"));
let inputVal=input.value;
let units="metric";
let lang="tr";
let url=`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=${units}&lang=${lang}`;



try {
  const response= await axios(url);
  console.log(response);



  const {main,name,sys,weather}=response.data
  console.log(main);
  //console.log(weather[0].icon);
  const iconUrl = `https://openweathermap.org/img/wn/${
            weather[0].icon}@2x.png`;
  
let cityCardList=cityList.querySelectorAll(".city");
let cityCardListArray=Array.from(cityCardList);

if(cityCardListArray.length>0){
  const filteredArray=cityCardListArray.filter(card=>card.querySelector(".city-name span").innerText==name);
  if(filteredArray.length >0){
    msg.innerText=`You already know the weather for ${name}, Please search for another city 😉`;
    form.reset();
    input.focus();
    return;
  }
}




  let createdCityCardLi=document.createElement("li");
  createdCityCardLi.classList.add("city");
  createdCityCardLi.innerHTML=`
  <h2 class="city-name" data-name="${name}, ${sys.country}">
      <span>${name}</span>
      <sup>${sys.country}</sup>
  </h2>
  <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
  <figure>
      <img class="city-icon" src="${iconUrl}">
      <figcaption>${weather[0].description}</figcaption>
  </figure>`  
  cityList.prepend(createdCityCardLi);  
  form.reset();
  input.focus();      
} catch (error) {
  msg.innerText=error;
  setTimeout(()=>{
 msg.innerText=""
  },5000)
}





console.log("apiKey",apiKey);
}