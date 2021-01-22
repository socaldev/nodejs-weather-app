const request = require('postman-request')
const forecast = (lat, long, callback) => {
    const uri = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${long},${lat}`
    request( {uri: uri, json: true}, (error, response, body)=>{
        if (error){
            callback('Unable to connect to location service!', undefined)
        } else if ( body.success == false ){
            error = body.error.info
            callback(error, undefined)
        } else {
            const { location:{name, region}, current:{temperature, precip, weather_descriptions, weather_icons} }  = body
            data = {
                city: name,
                region,
                temp: temperature,
                precip,
                desc: weather_descriptions,
                icon: weather_icons[0]
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast

