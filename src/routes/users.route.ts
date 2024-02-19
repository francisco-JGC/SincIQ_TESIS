import { Router } from 'express'
import { createUser } from '../controllers/user.controller'
import { handleBadRequestResponse } from '../utils/handleHttpsResponse'

const router = Router()

router.post('/', async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.json(
      handleBadRequestResponse({}, new Error('No user data provided'))
    )
  }

  if (email.indexOf('@') === -1) {
    return res.json(handleBadRequestResponse({}, new Error('Invalid email')))
  }

  if (password.length < 6) {
    return res.json(
      handleBadRequestResponse(
        {},
        new Error('Password must be at least 6 characters')
      )
    )
  }

  return res.json(await createUser(username, email, password))
})

export default router
