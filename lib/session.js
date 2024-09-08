import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
const key = new TextEncoder().encode(process.env.SECRET_KEY)

const cookie = {
    name: "session",
    options: { httpOnly: true },
    duration: 24 * 60 * 60 * 1000
}

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime("1day")
        .sign(key)
}


export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, key, { algorithms: ["HS256"] })
        return payload
    }
    catch (err) {
        return null
    }
}

export async function createSession(data) {
    const expires = new Date(Date.now() + cookie.duration)
    const session = await encrypt({ user: data, expires })
    cookies().set(cookie.name, session, { ...cookie.options, expires })
    redirect('/dashboard')
}

export async function updateSession(session) {
    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 10000);
    const res = NextResponse.next()
    res.cookies.set({
        name: cookie.name,
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    })
    return res;
}

export async function getSession() {
    const session = cookies().get(cookie.name)?.value
    if (!session) {
        return null
    }
    let user = await decrypt(session)
    user = JSON.parse(user.user)
    return user

}


export async function deleteSession() {
    cookies().delete(cookie.name)
    redirect('/')
}