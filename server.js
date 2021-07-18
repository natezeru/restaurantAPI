const express = require("express");
const path = require('path'); 

const {Restaurant, Menu, Item} = require('./models/index.js');

const app = express();
const port = 3000;


app.use(express.json())  //understand path.join  //adding body parser

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


//create a new restarurant 

app.post('/restaurant', async(req,res) =>{
  let restarurant = await Restaurant.create(req.body)
  res.send("New Restaurant Created") //res.send to send message to client that its created
})


// delete a restaurant

app.delete('/restaurant/:id', async(req, res) => {
  await Restaurant.destroy({
    where: { id: req.params.id}  //destroying restaurant where id is matched
  })
  res.send("deleted restaurant")
})
//get restaurant and assoication  //got menus associated with restaurant how do i get items aswell - ask dan

app.get('/restaurantAssociation/:id', async(req,res) => {
  let restaurant = await Restaurant.findByPk(req.params.id, {include: Menu}, {include: Item});
  res.json({restaurant})
})

//update restaurant based on id 

app.put('/restaurant/:id', async(req, res) => {
  let updated = await Restaurant.update(req.body, {
    where: {id: req.params.id}   //update restaurant where id matches , the req.body
  })     //req.body will tell us what the updates are... the req.params tell us what restaurant gets updated
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
//update menu by id 
app.put('/menu/:id', async(req, res) => {
  let updated = await Menu.update(req.body, {
    where: {id: req.params.id}   //update menu where id matches , the req.body
  })     //req.body will tell us what the updates are... the req.params tell us what restaurant gets updated
})



//create menu
app.post('/menu', async(req,res) => {
  let menu = await Menu.create(req.body)
  res.send('menu created')
})


//delete menu by id
app.delete('/menu/:id', async(req, res) => {
  await Menu.destroy({
    where: { id: req.params.id}  //destroying menu where id is matched
  })
  res.send("deleted menu")
})


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

//delete item by id

app.delete('/item/:id', async(req, res) => {
  await Item.destroy({
    where: { id: req.params.id}  //destroying item where id is matched
  })
  res.send("deleted item")
})

//create an item

app.post("/item", async(req,res) => {
  let item = await Item.create(req.body)
  res.json("item created")
})

//update item by id 
app.put('/item/:id', async(req, res) => {
  let updated = await Item.update(req.body, {
    where: {id: req.params.id}   //update item where id matches , the req.body
  })     //req.body will tell us what the updates are... the req.params tell us what restaurant gets updated
  res.send("Item updated")
})

// listen
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
