'use strct';

//packages
const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');

//global varables
const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.static('public'));
const DATABASE_URL = process.env.DATABASE_URL;
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

const client = new pg.Client(DATABASE_URL);
client.on('error', (error) => console.error(error));

//routes
app.get('/', getPokemonData);

//route handlers
app.get('/', (request, response) => {

   response.render('index');
})

function getPokemonData(request, response) {
 let searchPokemon = request.body.name;
 console.log(request.body.pokemon.name);
 const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${searchPokemon}`;

 superagent.get(urlPokemon)

   .then( result => {
     const pokemonObj = result.body.pokemon;

     const newPokemonArr = pokemonObj.map(index => {
       return new Pokemon (index);
     })
     response.render('/', {newPokemonArr : newPokemonArr});
   })
   .catch(error => {
    // response.status(500).render('pages/error');
    console.log(error);
    response.status(500).send(error);
   })
}

//constructor
function Pokemon (request, response) {
  this.name = pokemonObj.name;
  this.url = pokemonObj.url;
}

//start app
client.connect()
.then( () => {
  app.listen(PORT, () => console.log(`running the server on PORT : ${PORT} working`));

})