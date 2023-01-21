import { NextResponse } from 'next/server'

const signedinPages = ['/', '/playist', '/library']

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.SPOTIFYJS_ACCESS_TOKEN

    if (!token) {
      return NextResponse.redirect('/signin')
    }
  }
}
