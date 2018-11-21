const express = require('express');
const app = express();
let http = require('http');
const https = require('https')
let url = require('url')
let qstring = require('querystring')
const PORT = process.env.PORT || 3000
const ROOT_DIR = '/public';
const API_KEY = '5b8d8bb697810bdbb3b328f89556484a';

function sendResponse(recipesData, res){
  var page = '<html><head><title>Food4Thought</title>' +
    '<style>' +
    '.img {vertical-align:top; display:inline-block; text-align:center; width:400px;}' +
    '.caption {display: block;}' +
    '.container {vertical-align: middle; text-align: center;}' +
    'input {padding-bottom: 7px; padding-top: 5px; padding-left: 5px; font-size: medium;}' +
    'button { height: 35px; color: white; background-color: lightskyblue;}' +
    '</style></head>' +
    '<body>' +
    '<width=1500 height=6000>' +
    '<form method="post">' +
    '<div class="container">' +
    'Enter an ingredient: <input type="text" size="40" name="ingredient" id="ingredient" />' +
    '<button id="submit" onclick="Get Recipes()" style="margin-bottom: 50px;">Submit</button>' +
    '</div></form>'
  if (recipesData!==null) {
    page += 'Recipes: ' + '<p>' //weatherData is string format but other get is null or object type
    let foods = JSON.parse(recipesData).recipes
    for(let i=0;i<foods.length;i++){
      page+=`<div class="img"><a href=${foods[i].f2f_url} target="_blank" >` +
      `<img src=${foods[i].image_url} width='320' height='210'></a>` +
      `<span class="caption">${foods[i].title}</span></div>`
    }
  }
  page += '</p></body></html>'
  res.end(page);
}

//collect incoming data and send them to client
function parseRecipes(recipesResponse, res){
  let recipesData = ''
  recipesResponse.on('data', function (chunk) {
    recipesData += chunk
  })
  //console.log('222: ' + recipesData)
  recipesResponse.on('end', function () {
    sendResponse(recipesData, res)
  })
}

//use api key to get recipes from food2fork
function getRecipes(ingredient, res){
  const options = {
    host: 'www.food2fork.com',
    path: `/api/search?q=${ingredient}&key=${API_KEY}`
  }
  https.request(options, function(apiResponse){
    parseRecipes(apiResponse, res);
  }).end()
}

app.get('/recipes', (req, res) => {
  let ingre = req.query.ingredient
  if(!ingre) {
    getRecipes('',res)
  }
})

//using express middleware
app.use(function(req, res) {
  let requestURL = req.url
  let query = url.parse(requestURL).query //GET method query parameters if any
  let method = req.method
  console.log(`${method}: ${requestURL}`)
  console.log(`query: ${query}`) //GET method query parameters if any

  if (req.method == "POST") {
    let reqData = ''
    req.on('data', function(chunk) {
      reqData += chunk
    })
    req.on('end', function() {
      console.log(`reqData: ${reqData}`);//city=Ottawa
      var queryParams = qstring.parse(reqData)
      console.log(`queryParams: ${JSON.stringify(queryParams)}`)//{"city":"Ottawa"}
      getRecipes(queryParams.ingredient, res)//only send query string data
    })
  }
   if (req.method=="GET") {
    let reqData_get = ''
    req.on('data',chunck=>{
      reqData_get +=chunck
    })

    req.on('end',()=>{
      let req_ingre = qstring.parse(query).ingredient
      if (req_ingre) {
        getRecipes(req_ingre,res)
      }else {
        sendResponse(null, res)//pass get '/' through
      }
    })
    return
  }
})

//app.use(express.static(__dirname + ROOT_DIR)) //provide static server

// app.get('/', function (req, res) {
//   getRecipes('cake', res);
// })
// app.get('/recipes.html', function (req, res) {
//   var name = req.query.ingredient || 'cake';
//   getRecipes(name, res);
// })
// app.get('/index.html', function (req, res) {
//   var name = req.query.ingredient || 'cake';
//   console.log("index")
//   getRecipes(name, res);
// })

//start server
app.listen(PORT, err => {
  if(err) console.log('error: ' + err)
  else {
    console.log(`Server listening on port: ${PORT} CNTL-C to Quit`)
    console.log('To Test')
    console.log('http://localhost:3000/recipes.html')
    console.log('http://localhost:3000/recipes')
    console.log('http://localhost:3000/index.html')
    console.log('http://localhost:3000/')
    console.log('http://localhost:3000')
  }
})
