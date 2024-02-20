// Import files
import { Router } from 'express'
import db from '../db.js'
import lodash from 'lodash'

// Create router
const router = Router()

// location (exact match)
// max_price (price equal to or lower than)
// min_rooms (rooms equal to or greater than)
// search (fuzzy search anywhere in the description)
// sort (the field to sort by)
// order (sort ascending or descending)

// /houses?location=Bali&max_price=100&min_rooms=3&search=pool&sort=price&order=desc
// All houses located in 'Bali' AND with a price of 100 or less AND with 3 rooms or more AND with a description that includes the word 'pool', sorted by price in descending order

// switch ()
//   case (1):

// Define a Get route for fetching the list of houses
router.get('/houses', async (req, res) => {
  const { location, max_price, min_rooms, search, sort, order } = req.query
  let finalQuery = 'SELECT * FROM houses'

  const intialQuery = req.query

  if (lodash.isEmpty(intialParamas) == true) {
    finalQuery = finalQuery
  } else {
    if (location) {
      console.log('location? ', location)
      finalQuery = finalQuery.concat(` WHERE location = '${location}'`)
    }

    if (max_price) {
      finalQuery = location
        ? finalQuery.concat(` AND price_per_night <= ${max_price}`)
        : finalQuery.concat(` WHERE price_per_night <= ${max_price}`)
    }

    if (min_rooms) {
      finalQuery =
        location || max_price
          ? finalQuery.concat(` AND bedrooms >= ${min_rooms}`)
          : finalQuery.concat(` WHERE bedrooms >= ${min_rooms}`)
    }

    if (search) {
      finalQuery =
        location || max_price || min_rooms
          ? finalQuery.concat(` AND description LIKE '%${search}%'`)
          : finalQuery.concat(` WHERE description LIKE '%${search}%'`)
    }

    if (sort) {
      if (sort === 'price') {
        finalQuery = finalQuery.concat(` ORDER BY price_per_night`)
      } else {
        finalQuery = finalQuery.concat(` ORDER BY ${sort}`)
      }
    }

    if (order) {
      finalQuery = finalQuery.concat(` ${order}`)
    }
  }

  // switch (intialQuery) {
  //   case location:
  //     finalQuery = finalQuery.concat(` WHERE location = ${location}`)
  //   case max_price:
  //     req.params = finalQuery.concat(` AND price_per_night <= ${max_price}`)
  //   case min_rooms:
  //     finalQuery = finalQuery.concat(` AND bedrooms >= ${min_rooms}`)
  //   case search:
  //     finalQuery = finalQuery.concat(` WHERE description LIKE %${search}%`)
  //   case sort:
  //     finalQuery = finalQuery.concat(` ORDER BY ${sort}`)
  //   case order:
  //     finalQuery = finalQuery.concat(` ${order}`)
  // }

  console.log('Req queries: ', finalQuery)

  try {
    const { rows } = await db.query(finalQuery)
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

// Define a Get route for fetching individual house
router.get('/houses/:house_id', async (req, res) => {
  let house_id = req.params.house_id
  try {
    const { rows } = await db.query(
      `SELECT * FROM houses WHERE house_id = ${house_id}`
    )
    if (!rows.length) {
      throw new Error('Property not found')
    }
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

// Export the router
export default router
