import {Schema,models,model,Types} from "mongoose";
import { User } from "./user";



const projectSchema = Schema({
    user:Types.ObjectId,
    title:String,
    description:String,
    startdate:Date,
    enddate:Date,
    team: [Types.ObjectId],
    status:String,
})


export const Project = models.Project || model('Project',projectSchema)