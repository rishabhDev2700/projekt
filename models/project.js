import { Schema, models, model, Types } from "mongoose";


const member = Schema({
    email: String,
    role: String,
})

const projectSchema = Schema({
    user: Types.ObjectId,
    title: String,
    description: String,
    startdate: Date,
    enddate: Date,
    team: [member],
    status: String,
})


export const Project = models.Project || model('Project', projectSchema)