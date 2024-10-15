import { models, model, Schema, Types } from "mongoose"
const eventSchema = new Schema({
    user: {
        type: Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    datetime: {
        type: Date,
        required: true,
    },
    invitees: [
        {
            type: Types.ObjectId,
            ref: 'User',
        }
    ],
    project: {
        type: Types.ObjectId,
        ref: 'Project',
        required: true,
    },
}, {
    timestamps: true
});
export const Event = models.Event || model('Event', eventSchema)