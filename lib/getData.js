import connectMongo from "@/models/db";
import { Project } from "@/models/project";
import { Event } from "@/models/event";
import { Task } from "@/models/task";
import { Types } from "mongoose";

export async function fetchAllProjects(userID) {
    const objID = new Types.ObjectId(userID)
    try {
        await connectMongo()
        const projects = await Project.find({
            $or: [
                { user: objID },      // If the user field equals objID
                { team: { $in: [objID] } }  // If the objID is in the team array
            ]
        });
        return projects
    }
    catch (err) {
        console.log(err)
    }
}

export async function fetchMyProjects(userID) {
    try {
        await connectMongo()
        const projects = await Project.find({ user: userID })
        return projects
    }
    catch (err) {
        console.log(err)
    }

}

export async function fetchMyEvents(userID, projectID) {
    try {
        await connectMongo()
        const events = await Event.find({
            project: projectID,   // Match the project ID
            invitees: userID      // Match if userID is present in the invitees array
        })
        return events
    }
    catch (err) {
        console.log(err)
    }
}

export async function fetchMyTasks(userID) {
    try {
        await connectMongo()
        const tasks = await Task.find({ user: userID }).sort({ deadline: 1 })
        return tasks
    }
    catch (err) {
        console.log(err)
    }
}


export async function fetchSingleProject(userID, projectID) {
    try {
        await connectMongo()
        const obID = new Types.ObjectId(userID)
        const project = await Project.findOne({ _id: projectID, $or: [{ user: obID }, { team: obID }] })
        const t = await Task.find({ project: project._id })
        const tasks = t.map(t => {
            return { id: t._id, title: t.title, description: t.description, status: t.status }
        })
        return { project: project, tasks: tasks }
    }
    catch (err) {
        console.log(err)
    }

}

export async function fetchSingleTask(taskID) {
    try {
        await connectMongo()
        const task = await Task.findOne({ _id: taskID })
        return task
    }
    catch (err) {
        console.log(err)
    }

}


export async function fetchSingleEvent(userID, eventID) {
    try {
        await connectMongo()
        const event = await Event.findOne({ _id: eventID, user: userID })
        return event
    }
    catch (err) {
        console.log(err)
    }

}

export async function fetchProjectsByEmail(email) {
    try {
        // Connect to your MongoDB database (replace with your connection string)
        await connectMongo();

        const projects = await Project.find({
            'team.email': email
        }, { // Specify which fields to include
            _id: true,
            title: true,
            description: true,
            team: { $elemMatch: { email } } // Include the matching team member
        });

        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}