const getWeather =(query) =>{
    location_p.textContent = 'Loading weather data...'
    temp_p.textContent = ''
    forecast_p.textContent = ''
    precip_p.textContent = ''
    icon_img.innerHTML = ''
    wind_speed.innerHTML = ''
    wind_dir.innerHTML = ''
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
        wind_dir.innerHTML = `Wind Direction: ${data.forecast.wind_dir}`
        wind_speed.textContent = `Wind Speed: ${data.forecast.wind_speed}`
    })
})

} 
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message= document.querySelector('#message')
const temp_p = document.querySelector('#temp')
const location_p = document.querySelector('#location')
const forecast_p = document.querySelector('#forecast')
const precip_p = document.querySelector('#precip')
const icon_img = document.querySelector('#icon')
const wind_dir = document.querySelector('#wind-dir')
const wind_speed = document.querySelector('#wind-speed')




weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const userInput = searchElement.value
    getWeather(userInput)
})