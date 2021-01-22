const request = require('postman-request')
const geocode =(query, callback)=>{
    uri = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(query) + `.json?access_token=${process.env.MAPBOX_KEY}`

    request({uri: uri, json: true}, (error, response, body)=> {
        if (error){
            callback('Unable to connect to geocode service!', undefined)
        } else if (!body.features[0]){
            callback('Error: No results found, try another search' )
        } else {
            const { features: [ {place_name, center } ]}  = body
            const data = {
                name: place_name,
                latitude: center[1],
                longitude: center[0]
            }
            callback(undefined, data)
        }
    })
}
module.exports = geocode