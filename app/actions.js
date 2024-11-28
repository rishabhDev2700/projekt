"use server"

import { sendVerificationEmail } from "@/lib/email"
import { hashPassword, validatePassword } from "@/lib/password"
import { createSession, deleteSession } from "@/lib/session"
import connectMongo from "@/models/db"
import { User } from "@/models/user"
import { generateVerificationToken } from "@/lib/token"

export async function login(form) {
    const data = { email: form.get('email'), password: form.get('password') }
    await connectMongo()
    const user = await User.findOne({ email: data.email })
    if (validatePassword(data.password, user.password)) {
        await createSession(JSON.stringify({ userID: user._id, name: user.name, email: user.email }))
    }
}


export async function register(form) {
    const verificationToken = generateVerificationToken()
    const data = { email: form.get('email'), name: form.get('name'), password: form.get('password'), verificationCode: verificationToken }
    data.password = await hashPassword(data.password)
    try {

        await connectMongo()
        const user = await User.findOne({ email: data.email })
        if (!user) {
            const newUser = await User.create(data)
            await sendVerificationEmail(data.email, newUser._id, verificationToken)
        }
        else {
            throw new Error("User already exists")
        }
    }
    catch (e) {
        console.log(e)
    }
}

export async function logout(form) {
    await deleteSession()
    redirect("/")
}

