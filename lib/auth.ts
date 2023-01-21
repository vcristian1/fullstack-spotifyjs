// All of our helpers with Authentication
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

// A handler is a function that takes in a request and a response. validateRoute is checking if there is a token in your cookie and if its a valid token, and a valid user. If all is true we will call the handler
export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { SPOTIFYJS_ACCESS_TOKEN: token } = req.cookies

    if (token) {
      let user

      try {
        // Verifies the token by passing in token and the token secret
        const { id } = jwt.verify(token, 'hello')
        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authorized' })
        return
      }
      return handler(req, res, user)
    }
  }
}
