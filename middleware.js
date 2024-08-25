import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { decrypt, updateSession } from "./lib/session"

const protectedPath = "/dashboard"
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
export async function middleware(request) {
    const path = request.nextUrl.pathname
    const isProtected = path.startsWith(protectedPath)
    if (path.startsWith('/api')) {
        console.log("Routing to API")
    }
    console.log("Protected Route? ", isProtected)
    if (!isProtected) {
        return NextResponse.next()
    }
    let cookie = cookies().get('session')?.value
    let session = await decrypt(cookie)
    if (session) {
        console.log("**Session updated**")
        return await updateSession(cookie)
    } else {
        console.log("Redirecting to the sign in page")
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
}
