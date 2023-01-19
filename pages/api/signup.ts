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
  // This try/catch is not working, e.message says invalid invocation of create. he 'User already exists!' error is received each time a post request is sent
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })
  } catch (err) {
    res.status(401)
    res.json({ error: 'User already exists' })
    console.log(err.message)
    return
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    'hello',
    { expiresIn: '8h' }
  )

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('TRAX_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  )

  res.json(user)
}
