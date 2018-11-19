const express = require('express');
const app = express();
let http = require('http');
const PORT = process.env.PORT || 3000
const ROOT_DIR = '/public';
const API_KEY = 'b8b802dca5e13422b25a369168af427f';

function sendResponse(recipesData, res){

}

//collect incoming data and send them to client
function parseRecipes(recipesRespones, res){
  let recipesData = ''
  recipesRespones.on('data', function (chunk) {
    recipesData += chunk
  })
  recipesRespones.on('end', function () {
    sendResponse(recipesData, res)
  })
}

//use api key to get recipes from food2fork
function getRecipes(ingredient, res){
  const options = {
    host: 'www.food2fork.com',
    path: `/api/search?q=${ingredient}&key=${API_KEY}`
  }
  http.request(options, function(apiResponse){
    parseRecipes(apiResponse, res);
  }).end()
}

//using express middleware
app.all('*', function(req, res, next){
  console.log('-------------------------------');
  console.log('req.path: ', req.path);
  console.log('serving:' + __dirname + ROOT_DIR + req.path);
  next();
});

app.get('/', function (req, res) {
  getRecipes('cake', res);
})
app.get('/recipes', function (req, res) {
  var name = req.query.ingredient || 'cake';
  getRecipes(name, res);
})
app.get('/recipes.html', function (req, res) {
  var name = req.query.ingredient || 'cake';
  getRecipes(name, res);
})
app.get('/index.html', function (req, res) {
  var name = req.query.ingredient || 'cake';
  getRecipes(name, res);
})

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {console.log(`Server listening on port: ${PORT}`)}
})
