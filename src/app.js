require("dotenv").config()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const app = express()

const port = process.env.PORT || 3000
//Paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Serve static assets
app.use(express.static(publicDirPath, {
    extensions: ['html', 'htm']
}))

//Set up Handlebars engine + views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Routes
app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        temperature: 40,
        location: 'San Diego',
        precip: 100,
        forecast: 'Raining',
        units: 'Celsius'
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About',

    })
})
app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
    })
})
app.get('/weather', (req, res)=>{

    if (!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }
    geocode( req.query.address, (error, geocodeData = {}) => {
        if (error){
            //Send Error to browser
            res.send({
                error: error,
            }) 
        } else {
            const { latitude, longitude } = geocodeData
            //Get Forecast
            forecast(longitude, latitude, (error, forecastData = {})=>{
                if (error){
                    res.send({
                        error: error,
                    })
                } else {
                    res.send({
                        geocode: geocodeData,
                        forecast: forecastData,
                    })
                }
            })

        }
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'No search term provided'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404-help', {
        message: 'The Help Article you requested cannot be found.'
    })
})
app.get('*', (req,res)=>{
    res.render('404', {
        message: 'The page you requested cannot be found.'
    })
})
//Start Server
app.listen(port, ()=>{
    console.log('Server started successfully on port ' + port)
})


