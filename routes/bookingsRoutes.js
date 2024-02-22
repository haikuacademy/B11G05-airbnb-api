import { Router } from 'express'
import db from '../db.js'
const router = Router()

// Fetch all bookings
router.get('/bookings', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM bookings')

    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

// Fetch bookings with index of 1
router.get('/bookings/:bookingId', async (req, res) => {
  const { bookingId } = req.params
  try {
    const { rows } = await db.query(
      `SELECT * FROM bookings WHERE booking_id = ${bookingId}`
    )
    if (!rows.length) {
      throw new Error('Booking Id not found.')
    }
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

// Delete booking
router.delete('/bookings/:bookingId', async (req, res) => {
  try {
    const { rows } = await db.query(`
  DELETE FROM bookings WHERE booking_id = ${req.params.bookingId}
  RETURNING *`)
    if (!rows.length) {
      throw new Error('Booking not found')
    }
    res.json('Booking successfully deleted')
  } catch (err) {
    console.log(err.message)
    res.json(err.message)
  }
})


export default router
