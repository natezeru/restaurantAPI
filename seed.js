const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index') //Q: WHY import these models from index vs. from each separate model file?

//Q: Why do you think each object inside of the arrays are structured the way that they are?
//Q: What do you think will happen when we 'seed' this file?
const seedRestaurant = [
  {
    name: 'Panda Express',
    location: 'Texas',
    cuisine: 'Chinese'
  },
  {
    name: 'CFA',
    location: 'Dallas',
    cuisine: 'American'
  },
  {
    name: 'Mcdonalds',
    location: 'Houston',
    cuisine: 'American'
  },
  {
    name: 'Taste of Italy',
    location: 'Dallas',
    cuisine: 'Italian'
  },
  {
    name: 'Fogo De Chao',
    location: 'Dallas',
    cuisine: 'Steak House'
  },
]

const seedMenu = [
  {
    title: 'Breakfast'
    //RestaurantId : 1
  },
  {
    title: 'Lunch'
   // RestaurantId : 2
  },
  {
    title: 'Dinner'
    //RestaurantId : 3
  },
]

const seedItem = [
  {
    name: 'Porter House Steak',
    image: 'someimage.jpg',
    price: 29.5,
    MenuId : 3,
  },
  {
    name: 'Chicken Tenders Meal',
    image: 'someimage.jpg',
    price: 10.50,
    
    MenuId : 2
  },
  {
    name: 'Pancakes',
    image: 'someimage.jpg',
    price: 7.50,
    
    MenuId : 1
  },
  {

   name: "Eggs Benedict",
    image: "someimage",
    price: 8.99,
    
    MenuId: 1,
  },
  {

    name: "Chicken Sandwich Combo",
     image: "someimage",
     price: 7.99,
     
     MenuId: 2,
   },{
     name:"Spicy Chicken Sandwich Combo",
     price: 8.99,
     image:"someimage",
    
     MenuId: 2     
   },

   {

    name: "Super Salad and Tofu",
     image: "someimage",
     price: 13.99,
     MenuId: 3
   },
   {
     name:" Honey Sesame Chicken Breast",
     image:"someimage",
     price: 11.99,
     
    MenuId: 3

   }
  
]


//Q: Try to decifer the following function.
//Q: Why are we using async and await?
const seed = async () => {
  try {
    await sequelize.sync({force: true})
    await Restaurant.bulkCreate(seedRestaurant, {validate: true})
    await Menu.bulkCreate(seedMenu, {validate: true})
    await Item.bulkCreate(seedItem, {validate: true})
    console.log('Seeding success!')
    sequelize.close()
  } catch (error) {
    console.log('SOMETHING WENT WRONG WITH THE SEEDING: ', error)
  }
}

//Q: What is seed() returning?
seed()
    .then(() => {
      console.log('Seeding success!')
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
    })

