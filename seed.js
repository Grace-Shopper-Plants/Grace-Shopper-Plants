const {db, User, Plant, Order} = require('./server/db')
const {green, red} = require('chalk')

const seed = async () => {
  await db.sync({force: true})

  const fern = await Plant.create({
    name: 'Fern',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl:
      'https://target.scene7.com/is/image/Target/GUEST_d448836b-bd3a-419a-a065-f7099152adac?wid=1400'
  })

  const poisonIvy = await Plant.create({
    name: 'Poison Ivy',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl:
      'http://beyondurgentcaremed.com/wp-content/uploads/2017/08/poison-ivy-plant.jpg'
  })

  const venusFlytrap = await Plant.create({
    name: 'Venus Flytrap',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const bonsai = await Plant.create({
    name: 'Bonsai Tree',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const aloe = await Plant.create({
    name: 'Aloe',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const idahoPotato = await Plant.create({
    name: 'Idaho Potato',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const redPotato = await Plant.create({
    name: 'Red Potato',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const purplePotato = await Plant.create({
    name: 'Purple Potato',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const yukonGold = await Plant.create({
    name: 'Yukon Gold Potato',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const weepingFig = await Plant.create({
    name: 'Weeping Fig',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const weepingWillow = await Plant.create({
    name: 'Weeping Willow',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const whompingWillow = await Plant.create({
    name: 'Whomping Willow',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const groot = await Plant.create({
    name: 'Groot',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const babyGroot = await Plant.create({
    name: 'Baby Groot',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  const catnip = await Plant.create({
    name: 'Catnip',
    description: 'Some stuff',
    price: 12.59,
    inventory: 40,
    imgUrl: ''
  })

  console.log(green('Seeding success!'))
  db.close()
}

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
  db.close()
})
