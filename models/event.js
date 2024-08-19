import {models,model,Schema,Types} from "mongoose"

const eventSchema = Schema({
    title:String,
    description:String,
    note:String,
    datetime:Date,
    invitees: [Types.ObjectId],
    project:Types.ObjectId
})

export const Event =  models.Event || model('Event',eventSchema)