import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.json({
    title: 'Contempo-node',
    description: 'Just another node API boilerplate'
  })
})

export default router
