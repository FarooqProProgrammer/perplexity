import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    // Check if the user has a valid next-auth token
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET })
    
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/home'],
}