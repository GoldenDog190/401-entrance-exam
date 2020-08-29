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
app.post('/pokemon', getPokemonData);
app.get('/pokemon/:id', newPokemon);
app.get('/books/id', showPokemon);

//route handlers
app.get('/', (request, response) => {
  client.query('SELECT * FROM pokemons')
  .then(result => {
    console.log(result.rows);
      response.render('pages/index', {newPokemonArr : newPokemonArr});
    })
    response.render('pages/index');
  });

  app.get('/pokemon/pokemon', (request, response) => {
    response.render('pages/pokemon/pokemon');
  
  });

function showPokemon(request, response) {
  client.query('SELECT * FROM pokemons WHERE id=$1', [request.params.id])
  .then( result => {
     response.render('/', {pokemon:result.rows[0]});
  })
}

function newPokemon(request, response){
  console.log(request.body);
  const {name, url} = request.body;

  const SQL = `INSERT INTO pokemons (name, url) VALUES ($1, $2) RETURNING id`;
  const pokeArray = [name, url];

  client.query(SQL, pokeArray)
  .then((result) => {

    response.redirect('/', result);

  })
}

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
   });
};

//constructor
function Pokemon (request, response) {
  this.name = pokemonObj.name;
  this.url = pokemonObj.url;
}

//start app
client.connect()
.then( () => {
  app.listen(PORT, () => console.log(`running the server on PORT : ${PORT} working`));
  });