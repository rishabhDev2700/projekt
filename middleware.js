import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { updateSession } from "./lib/session"

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
    console.log("Protected Route? ",isProtected)
    if (!isProtected){
        return NextResponse.next()
    }
    const session  = cookies().get('session')?.value
    if(session){
        return await updateSession(session)
    }else{
        console.log("Redirecting to the sign in page")
        return NextResponse.redirect(new URL('/',request.nextUrl))
    } 
}
