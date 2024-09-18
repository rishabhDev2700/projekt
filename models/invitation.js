import { Schema, models, model, Types } from "mongoose";

const invitationSchema = Schema({
    project: Types.ObjectId,
    email: String,
    role: String,
    status: {
        type: Boolean,
        default:false
    }
})


export const Invitation = models.Invitation || model('Invitation',invitationSchema)