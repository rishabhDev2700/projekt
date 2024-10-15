import { Schema, models, model, Types } from "mongoose";

const invitationSchema = Schema({
    project: { type: Types.ObjectId, ref: 'Project' },
    email: String,
    role: Number,
    status: {
        type: Boolean,
        default: false
    }
})


export const Invitation = models.Invitation || model('Invitation', invitationSchema)