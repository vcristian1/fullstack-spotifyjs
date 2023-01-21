import { validateRoute } from '../../lib/auth'

// validateRoute wraps our handler, and it wont call this handler unless you are authenticated
export default validateRoute((req, res, user) => {
  res.json(user)
})
