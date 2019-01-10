'use strict'

const db = require('../server/db')
const {User, Plant, OrderNumber, OrderHistory} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const fern = await Plant.create({
    name: 'Fern',
    description: 'Generic houseplant',
    price: 1259,
    inventory: 40,
    imageUrl: 'https://vizpainter.com/wp-content/uploads/fern.gif'
  })

  const poisonIvy = await Plant.create({
    name: 'Poison Ivy',
    description: 'Good for bad kids',
    price: 200,
    inventory: 40,
    imageUrl:
      'https://10dyuk2k99c42ykeneovawpk-wpengine.netdna-ssl.com/wp-content/uploads/poisonivy0-200x200.jpg'
  })

  const aloe = await Plant.create({
    name: 'Aloe',
    description: 'For bad kids that learned their lesson',
    price: 8000,
    inventory: 40,
    imageUrl:
      'https://images-eu.ssl-images-amazon.com/images/I/41gLgt2qDXL._AC_US200_.jpg'
  })

  const venusFlytrap = await Plant.create({
    name: 'Venus Flytrap',
    description: 'Treatment for Insectophobia',
    price: 1599,
    inventory: 40,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1A_yp-up-UbQDJhp8-Sgz-lE_u2orX4jPdetbTRILH-wxl9v21w'
  })

  const bonsai = await Plant.create({
    name: 'Bonsai Tree',
    description: 'For celebrations',
    price: 20000,
    inventory: 40,
    imageUrl:
      'https://cdn1.bigcommerce.com/server4100/6ys4nr/product_images/uploaded_images/jade-bonsai-tree.jpg?t=1398725710'
  })

  const idahoPotato = await Plant.create({
    name: 'Idaho Potato',
    description: 'Great for making fries',
    price: 759,
    inventory: 40,
    imageUrl: 'https://www.orderacme.com/products/image/41/medium'
  })

  const redPotato = await Plant.create({
    name: 'Red Potato',
    description: 'Great for making red fries',
    price: 659,
    inventory: 40,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91TQVz1JcWL._AC_UL200_SR200,200_.jpg'
  })

  const purplePotato = await Plant.create({
    name: 'Purple Potato',
    description: 'Great for making purple fries',
    price: 559,
    inventory: 40,
    imageUrl:
      'https://www.marxfoods.com/images/Viking-Purple-Potatoes_VikingPurpleHeirloomPotatoes-1.jpg?resizeid=13&resizeh=200&resizew=200'
  })

  const yukonGold = await Plant.create({
    name: 'Yukon Gold Potato',
    description: 'Great for making gold fries',
    price: 459,
    inventory: 40,
    imageUrl:
      'https://d2lnr5mha7bycj.cloudfront.net/product-image/file/primary_eb84dfc5-d9c6-4b83-a267-db480366dc9c.png'
  })

  const weepingFig = await Plant.create({
    name: 'Weeping Fig',
    description: 'Does not actually have figs',
    price: 1111,
    inventory: 40,
    imageUrl:
      'http://gardenplants.comparespecies.com/PImg/Weeping-Fig350Normal_200.jpg'
  })

  const weepingWillow = await Plant.create({
    name: 'Weeping Willow',
    description: 'Supplies an endless amount of saltwater',
    price: 4252,
    inventory: 40,
    imageUrl:
      'http://rs282.pbsrc.com/albums/kk269/DuckWillow/willowtree.jpg~c200'
  })

  const whompingWillow = await Plant.create({
    name: 'Whomping Willow',
    description: 'Great cure for people that step on your lawn',
    price: 1337,
    inventory: 40,
    imageUrl:
      'https://i.pinimg.com/236x/a4/46/2e/a4462e2598acccf086772515eeda858f--thumbprint-tree-fingerprint-tree.jpg'
  })

  const groot = await Plant.create({
    name: 'Groot',
    description: 'I am groot',
    price: 12059,
    inventory: 40,
    imageUrl:
      'https://vignette.wikia.nocookie.net/weeklyplanet/images/d/d3/Groot.jpg/revision/latest?cb=20170430212107'
  })

  const babyGroot = await Plant.create({
    name: 'Baby Groot',
    description: 'I am groot, just high pitched',
    price: 6050,
    inventory: 40,
    imageUrl:
      'https://i.ebayimg.com/thumbs/images/g/N-UAAOSwruxbD130/s-l200.jpg'
  })

  const catnip = await Plant.create({
    name: 'Catnip',
    description: 'How do cats say 420?',
    price: 420,
    inventory: 420,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51GwjNZt0iL._SX425_.jpg'
  })

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'bob@email.com', password: '456'}),
    User.create({email: 'milly@email.com', password: '789'}),
    User.create({email: 'yoyo@email.com', password: '127'}),
    User.create({email: 'mocha@email.com', password: '321'})
  ])

  const orderNumbers = await Promise.all([
    OrderNumber.create({userId: 1}),
    OrderNumber.create({userId: 4}),
    OrderNumber.create({userId: 5}),
    OrderNumber.create({userId: 2}),
    OrderNumber.create({userId: 1}),
    OrderNumber.create({userId: 4}),
    OrderNumber.create({userId: 3})
  ])

  const orderHistories = await Promise.all([
    OrderHistory.create({
      plantId: 3,
      ordernumberId: 1,
      quantity: 2,
      bought: true,
      soldprice: 124,
      date: '2018-08-09 04:12:02'
    }),
    OrderHistory.create({
      ordernumberId: 1,
      plantId: 3,
      quantity: 2,
      bought: true,
      soldprice: 124,
      date: '2018-08-09 04:12:02'
    }),
    OrderHistory.create({
      ordernumberId: 1,
      plantId: 5,
      quantity: 1,
      bought: true,
      soldprice: 1454,
      date: '2018-08-09 04:12:02'
    }),
    OrderHistory.create({
      ordernumberId: 2,
      plantId: 3,
      quantity: 4,
      bought: true,
      soldprice: 1244,
      date: '2018-08-09 04:12:02'
    }),
    OrderHistory.create({
      ordernumberId: 3,
      plantId: 1,
      quantity: 1,
      bought: false,
      soldprice: 12344
    }),
    OrderHistory.create({
      ordernumberId: 3,
      plantId: 2,
      quantity: 10,
      bought: false,
      soldprice: 213124
    }),
    OrderHistory.create({
      ordernumberId: 3,
      plantId: 7,
      quantity: 1,
      bought: false,
      soldprice: 32124
    }),
    OrderHistory.create({
      ordernumberId: 4,
      plantId: 8,
      quantity: 2,
      bought: true,
      soldprice: 12124,
      date: '2018-09-04 01:05:02'
    }),
    OrderHistory.create({
      ordernumberId: 4,
      plantId: 9,
      quantity: 1,
      bought: true,
      soldprice: 1324,
      date: '2018-09-04 01:05:02'
    }),
    OrderHistory.create({
      ordernumberId: 5,
      plantId: 2,
      quantity: 1,
      bought: false,
      soldprice: 23124
    }),
    OrderHistory.create({
      ordernumberId: 6,
      plantId: 3,
      quantity: 2,
      bought: true,
      soldprice: 12124,
      date: '2019-01-09 11:05:02'
    })
  ])

  //console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
