const express = require("express");
const path = require('path'); 

const {Restaurant, Menu, Item} = require('./models/index.js');

const app = express();
const port = 3000;


app.use(express.json())  //understand path.join

//route to all Restaurants
app.get('/Restaurant', async(req,res) =>{
  let restaurant = await Restaurant.findAll()
  res.json({restaurant})
})

//route to all Menus
app.get('/Menu', async(req,res) => {
  let menu = await Menu.findAll()
  res.json({menu})
})


//route to all Items
app.get('/Item', async(req,res) => {
  let item = await Item.findAll()
  res.json({item}) // sending back as json
})





// listen
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
