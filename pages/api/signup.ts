import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// Importing to help with the JWT to track you as far as authentication goes.
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    
}
