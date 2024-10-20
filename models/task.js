import { model, models, Schema, Types } from "mongoose"

const commentSchema = Schema({
    user: Types.ObjectId,
    task: Types.ObjectId,
    comment: String,
})



const taskSchema = Schema({
    title: String,
    description: String,
    deadline: Date,
    user: {type:Types.ObjectId, ref:"User"},
    project: Types.ObjectId,
    status: { type: String, default: "Not started" },
    file: String,
    note: String,
    comments: [commentSchema]
})

export const Task = models.Task || model('Task', taskSchema)