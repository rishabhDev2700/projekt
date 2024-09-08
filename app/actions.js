"use server"

import { sendVerificationEmail } from "@/lib/email"
import { hashPassword, validatePassword } from "@/lib/password"
import { createSession, deleteSession } from "@/lib/session"
import connectMongo from "@/models/db"
import { User } from "@/models/user"
import { generateVerificationToken } from "@/lib/token"

export async function login(form) {
    const data = { email: form.get('email'), password: form.get('password') }
    console.log("Credentials:", data)
    await connectMongo()
    const user = await User.findOne({ email: data.email })
    if (validatePassword(data.password, user.password)) {
        await createSession(JSON.stringify({ userID: user._id, name: user.name, email: user.email }))
    }
    return
}


export async function register(form) {
    const verificationToken = generateVerificationToken()
    console.log("Verification token:", verificationToken)
    const data = { email: form.get('email'), name: form.get('name'), password: form.get('password'), verificationCode: verificationToken }
    console.log(data)
    data.password = await hashPassword(data.password)
    await connectMongo()
    const newUser = await User.create(data)
    console.log("New user ID:", newUser._id)
    await sendVerificationEmail(data.email, newUser._id, verificationToken)
}

export async function logout(form) {
    await deleteSession()
    redirect("/")
}

