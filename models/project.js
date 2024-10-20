import { Schema, models, model, Types } from "mongoose";


const teamSchema = Schema({
    project: {
        type: Types.ObjectId,
        ref: 'Project'

    },
    members: [{
        user: { type: Types.ObjectId, ref: "User", required: true },
        role: { type: Number, required: true }
    }],
})
teamSchema.index({ 'members.user': 1 });

const projectSchema = Schema({
    user: Types.ObjectId,
    title: String,
    description: String,
    startdate: Date,
    enddate: Date,
    status: String,
    team: { type: Types.ObjectId, ref: 'Team' },
})


export const Team = models.Team || model('Team', teamSchema)
export const Project = models.Project || model('Project', projectSchema)