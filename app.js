const express = require('express')
const https = require('https')
const app = express()
const request = require('request')
const PORT = 1985;
const mongoose = require('mongoose')
const cron = require('node-cron')
const cors = require('cors');
const urlocal='mongodb://localhost:27017'
const url= process.env.URL_MONGO || urlocal;
const bodyParser = require('body-parser');
const Flight = require("./flight");
const { response } = require('./app');




//let options = {json: true};
app.use(bodyParser.json());
app.use(cors({origin: '*'}))
app.get('/', (req, res) => { 
    res.send('Robot is running')
});
app.listen(PORT);

//connection à MongoDB
mongoose.connect("mongodb+srv://laetitia:laetitia@aerodataboxproject4.ezdkr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
 {   //pour recuperer le 1er paramètre, aller sur mongodb, cliquer sur connect > connect your application
     useNewUrlParser: true, useUnifiedTopology:true
    }).then(()=>{
        console.log("connexion success !");//si ça fonctionne on affiche cela dans la console
    }).catch((error) =>{
        console.log(error); //sinon on affiche l'erreur
    });

app.get('/flights', (req, res) =>{

    Flight.find({})
    .then((flights)=>{
        console.log(flights);
        return res.status(200).json({flights})
        
    }) 
    .catch((err)=>{
        return res.status(400).json({error})
    })

})

app.get("/flights/:number", (req, res) =>{

    var number = req.params.number;

    Flight.find({})
    
        let flightByNumber= flights.filter(function(f){
            return f.number == number;
        })
       
        return res.status(200).json({flightByNumber})
    }) 
    .catch((err)=>{
        return res.status(400).json({error})
    })

}) 

