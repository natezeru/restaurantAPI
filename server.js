const express = require("express");
const path = require('path'); 
const {Restaurant, Menu, Item} = require('./models/index.js');

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')))   //understand path.join


//will add routes
// 1)client makes a request -> request URL -> URL -> http request -> http response


//will add routes
app.get('/Item', async (req, res) => {
    //goes into the database and looks for all Items
    const allItems = await Item.findAll()
    //server will respond with all the items found in the database
    res.json(allItems)
})

//understand how the work with math.random

app.get('/randomItem', async (req, res) => {
    const randomNum = Math.floor(Math.random() * 100)
    const randomItem = await Item.findByPk(randomNum)

    res.json(randomItem)
})



app.get('/Restaurants', async (req, res) => {
  const allRestaurants = await Restaurant.findAll()

  res.json(allRestaurants)
})


app.get('/Restaurants/:id', async (req, res) => {

  //eager loading! We can nest include blocks, to fetch associations of associations
  const restaurant = await Restaurant.findByPk(req.params.id, {include : {
      model : Menu,
      include: Item
  }});
  res.json({ restaurant })
})

app.get('/menus/:id', async (req, res) => {
  //General querying with association using include
  const menu = await Menu.findByAll(req.params.id, {include: Item})
  res.json({ menu })
})

//Get Menu by name, using WHERE

app.get('/menus/name/:title', async (req, res) => {
  //General querying with association using include
  const menu = await Menu.findAll({
      where: {
          title : req.params.title 
      }
  })
  res.json({ menu })
})


// Delete an Item

app.delete('/Item/:id', async(req,res) => {
  await Item.destroy({
      where: {id: req.params.id}
  })
  res.send("Deleted Item")
})

//post restuarnats
app.post('/Restaurants', async (req, res) => {
  let newRestaurant = await Restaurant.create(req.body)
  res.status(200).send('New Restaurant Created !')
} )


app.post('/Item')
//Update an Item Name

app.put("/Item/:id", async (req, res) => {
	let updated = await Item.update(req.body, {
		where : {id : req.params.id} 
	})
	res.send("Updated Item!!")

})

// listen
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
