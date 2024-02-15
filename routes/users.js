import express from 'express'

const router = express.Router()

// Define a GET route for fetching the list of users
router.get('/users', (req, res) => {
  res.send('List of users')
})

// Define a GET route for fetching a single user
router.get('/users/1', (req, res) => {
  res.send('User number 1')
})

// Export the router
export default router
