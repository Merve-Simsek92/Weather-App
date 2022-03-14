const inputValue=document.querySelector("input");
const submitBtn=document.querySelector("button");

let cities = document.querySelector(".cities")
let msg = document.querySelector(".msg")
localcity=[]
const getWeather= async(e)=>{
    e.preventDefault()
   console.log(inputValue.value);
const responseData= await axios(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=4838f017a05b34465b93be7fd1569fda&units=metric`)
console.log(responseData.data.weather[0]);
const weather=responseData.data.weather[0];
console.log(weather);
if(localcity.includes(inputValue.value)){
  msg.innerText=`You already know the weather for ${inputValue.value},Please search for another city`
}else{
  cities.innerText +=` <ul class="city">
<li class="city-name"> ${inputValue.value}</li>

  </ul>`
}
}


submitBtn.addEventListener("click",getWeather)