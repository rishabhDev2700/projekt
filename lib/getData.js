import connectMongo from "@/models/db";
import { Project } from "@/models/project";
import { Event } from "@/models/event";
import { Task } from "@/models/task";
import { Types } from "mongoose";
import { Invitation } from "@/models/invitation";

export async function fetchAllProjects(userID) {
  try {
    await connectMongo();
    const projects = await Project.find({
      $or: [
        { user: userID }, // User is the project owner
        { "team.members.user": userID }, // User is in the team members array
      ],
    });
    return projects;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchMyProjects(userID) {
  const id = new Types.ObjectId(userID);
  try {
    await connectMongo();
    const projects = await Project.find({ user: id });
    return projects;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchMyEvents(userID) {
  try {
    await connectMongo();
    const events = await Event.find({
      invitees: userID, // Match if userID is present in the invitees array
    });
    return events;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchMyTasks(userID) {
  try {
    await connectMongo();
    const tasks = await Task.find({ user: userID }).sort({ deadline: 1 });
    return tasks;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchSingleProject(userID, projectID) {
  try {
    await connectMongo();
    let project = await Project.findOne({ _id: projectID })
      .populate({
        path: "team",
        match: { "members.user": userID }, // Filter team members by userId
        populate: { path: "members.user" },
      })
      .exec();
    // If project exists but the team doesn't match (i.e. user not in team), team will be null
    const tasks = await Task.find({ project: projectID });
    if (!project || !project.team) {
      throw new Error("Project not found or user not part of the team");
    }
    project = JSON.parse(JSON.stringify(project));
    return { project, tasks };
  } catch (err) {
    console.log(err);
    return { project: {}, tasks: [] };
  }
}

export async function fetchSingleTask(taskID, projectID) {
  try {
    await connectMongo();
    const task = await Task.findOne({ _id: taskID, project: projectID });
    return task;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchSingleEvent(userID, eventID) {
  try {
    await connectMongo();
    const event = await Event.findOne({ _id: eventID, user: userID });
    return event;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchProjectsByEmail(email) {
  try {
    // Connect to your MongoDB database (replace with your connection string)
    await connectMongo();

    const projects = await Project.find(
      {
        "team.email": email,
      },
      {
        // Specify which fields to include
        _id: true,
        title: true,
        description: true,
        team: { $elemMatch: { email } }, // Include the matching team member
      },
    );

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function fetchProjectTasks(userID, projectID) {
  try {
    await connectMongo();
    const tasks = await Task.find({ user: userID, project: projectID });
    return [...tasks];
  } catch (e) {
    console.log("Something went wrong:", e);
    return [];
  }
}

export async function fetchMyInvitations(email) {
  try {
    const invitations = await Invitation.find({ email, status: false })
      .populate({ path: "project", select: "title description" })
      .exec();
    if (!invitations) {
      return [];
    }
    return JSON.parse(JSON.stringify(invitations));
  } catch (e) {
    console.log("Error fetching invitations:", e);
    return [];
  }
}
