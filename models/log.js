import { Schema, model, models, Types } from "mongoose";



const LogSchema = new Schema({
    userID: Types.ObjectId,
    userName: string,
    action: string,
    date: date,
    project: Types.ObjectId
})


export const Log = models.Log || model("Log", LogSchema)