const express = require("express");
const path = require('path'); 

const {Restaurant, Menu, Item} = require('./models/index.js');

const app = express();
const port = 3000;


app.use(express.json())  //understand path.join

//route to all Restaurants
app.get('/restaurant', async(req,res) =>{
  let restaurant = await Restaurant.findAll()
  res.json({restaurant})
})

//get restaurant by id   //got a specfic restaurant from database and returned it 

app.get('/restaurant/:id', async(req,res) => {
  let restaurant = await Restaurant.findByPk(req.params.id);
  res.json({restaurant})
})

//get restaurant and assoication  //got menus associated with restaurant how do i get items aswell - ask dan

app.get('/restaurantAssociation/:id', async(req,res) => {
  let restaurant = await Restaurant.findByPk(req.params.id, {include: Menu}, {include: Item});
  res.json({restaurant})
})


//route to all Menus
app.get('/menu', async(req,res) => {
  let menu = await Menu.findAll()
  res.json({menu})
})

//get menu by id 
app.get("/menu/:id", async(req,res) => {
  let menu = await Menu.findByPk(req.params.id)
  res.json({menu})
})

//get menu and association


//create menu



//delete menu



//route to all Items
app.get('/item', async(req,res) => {
  let item = await Item.findAll()
  res.json({item}) // sending back as json
})

//get item by id 

app.get('/item/:id', async(req,res) => {
  let item = await Item.findByPk(req.params.id)
  res.json({item})
}) 
//get item and association
app.get('/itemAssociation/:id', async(req,res) => {
  let item = await Item.findByPk(req.params.id, {include: Menu}) //add a second arguement....include block to pass in object. get all menus that have items
  res.json({item})
})




// listen
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
