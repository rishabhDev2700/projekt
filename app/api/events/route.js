import { fetchMyEvents } from "@/lib/getData";
import { getSession } from "@/lib/session";
import connectMongo from "@/models/db";
import { Event } from "@/models/event";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Getting user for fetching events");
  const user = await getSession();
  const events = await fetchMyEvents(user.userID);
  console.log("Returning response");
  return NextResponse.json({ events: events });
}

export async function POST(request) {
  console.log("triggered");
  const body = await request.json();
  console.log(body);
  const date = new Date(body.date);
  const start = new Date(date.setUTCHours(0, 0, 0, 0));
  const end = new Date(date.setUTCHours(23, 59, 59, 999));
  console.log(start.toDateString());
  console.log(end.toDateString());
  await connectMongo();
  const events = await Event.find({
    datetime: {
      $gte: start,
      $lte: end,
    },
  });
  return NextResponse.json({ events: events });
}

export async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();
      const { title, description, note, datetime, invitees, project } =
        req.body;

      // Create a new event
      const newEvent = new Event({
        title,
        description,
        note,
        datetime,
        invitees,
        project,
      });

      const savedEvent = await newEvent.save();

      res.status(201).json(savedEvent); // Respond with the created event
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create event." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

// Fix the errors below

export async function PUT(req) {
  const body = await req.json();

  try {
    await connectMongo();
    const { id, title, description, note, datetime, invitees } = body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        note,
        datetime,
        invitees,
      },
      { new: true }, // Return the updated document
    );

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" });
    }

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update event." });
  }
}

export async function DELETE(req) {
  const data = await req.json();
  const id = data.id;
  const { userID } = await getSession();
  try {
    await connectMongo();
    const deletedEvent = await Event.findOneAndDelete({
      _id: id,
      user: Types.ObjectId(userID),
    });

    if (!deletedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete event." },
      { status: 400 },
    );
  }
}
