// Import necessary files
import { Router } from 'express'
const router = Router()

// Define a Get route for fetching the list of houses
router.get('/houses', (req, res) => {
  res.send('Hello from Houses')
})

// Export the router
export default router
