import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import connectMongo from "@/models/db";
import { Invitation } from "@/models/invitation";
import { User } from "@/models/user"
import { Team } from "@/models/project";
import { Types } from "mongoose";
import { generateEmailContent, sendEmail } from "@/lib/email";
export async function POST(req) {
    const u = await getSession()
    if (!u) {
        console.log("Anonymous user!")
        return NextResponse.json({ "message": "Not authorized" }, { status: 401 })
    }
    // try {
    const body = await req.json()
    await connectMongo();
    const existingUser = await User.findOne({ email: body.email });
    if (!existingUser) {
        // Step 2: Send invitation email if the user doesn't exist
        const { text, html } = generateEmailContent(ROLES[body.role], "http://projekt.fuzzydevs.com")
        await sendEmail({
            name: "CEO",
            address: "admin@fuzzydevs.com"
        },
            body.email,
            'You’re invited to join the project!',
            { text },
            { html }
        );
        console.log("User doesnt exist")
        await Invitation.create({ project: body.project, email: body.email, role: Number(body.role) })
        return NextResponse.json({ message: 'Email and Invitation sent successfully!' }, { status: 200 });

    }
    console.log("Existing user:", existingUser)
    const userID = existingUser ? existingUser._id : null;
    const team = await Team.findOne({
        project: body.project,
        members: { $elemMatch: { user: new Types.ObjectId(userID) } }
    });
    console.log("Team:", team)
    if (team) {
        console.log("User already in the team")
        return NextResponse.json({ message: 'User is already part of the team.' }, { status: 400 });
    }
    const invitation = new Invitation({
        project: body.project,
        email: body.email,
        role: body.role,
        user: userID,
    });
    await invitation.save();
    return NextResponse.json({ message: 'Invitation sent successfully!' }, { status: 200 });

} 
