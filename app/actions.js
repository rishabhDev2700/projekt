"use server"

import { hashPassword, validatePassword } from "@/lib/password"
import { createSession } from "@/lib/session"
import connectMongo from "@/models/db"
import { User } from "@/models/user"


export async function login(form) {
    const data = {email:form.get('email'),password:form.get('password')}
    console.log("Credentials:",data)
    await connectMongo()
    const user = await User.findOne({email:data.email})
    if(validatePassword(data.password,user.password)){
        await createSession(JSON.stringify({userID:user._id,name:user.name,email:user.email}))
    }
    return
}


export async function register(form){
    const data = {email:form.get('email'),name:form.get('name'),password:form.get('password')} 
    console.log(data)
    data.password = await hashPassword(data.password)
    await connectMongo()
    const id = await User.create(data)
}


