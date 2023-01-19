import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// Importing to help with the JWT to track you as far as authentication goes.
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync()
  const { email, password } = req.body

  let user

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })
  } catch (e) {
    res.status(401)
    res.json({ error: 'User already exists' })
    return
  }
  // What object do you want to hash
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    'hello',
    { expiresIn: '8hr' }
  )
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('SPOTIFYJS_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      // will allow the user to maintain a logged in status while arriving from an external link.
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  )

  res.json(user)
}
