const getWeather =(query) =>{
    location_p.textContent = 'Loading weather data...'
    temp_p.textContent = ''
    forecast_p.textContent = ''
    precip_p.textContent = ''
    icon_img.innerHTML = ''
    fetch(`/weather?address=${query}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return message.textContent = data.error
        }
        console.log(data)
        temp_p.textContent = data.forecast.temp + '° Celsius'
        location_p.textContent = data.geocode.name 
        forecast_p.textContent = data.forecast.desc[0]
        precip_p.textContent = data.forecast.precip + '% chance of rain.'
        icon_img.innerHTML = `<img class="icon" src=${data.forecast.icon}>`
    })
})
//Test
} 
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message= document.querySelector('#message')
const temp_p = document.querySelector('#temp')
const location_p = document.querySelector('#location')
const forecast_p = document.querySelector('#forecast')
const precip_p = document.querySelector('#precip')
const icon_img = document.querySelector('#icon')




weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const userInput = searchElement.value
    getWeather(userInput)
})