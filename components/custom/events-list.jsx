"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Loader } from "lucide-react";
import { formatDateToInput } from "@/lib/utils";
export default function EventsList() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  console.log(date);
  const fetchEvents = async (e) => {
    const fdate = formatDateToInput(date);
    console.log(date);
    const response = await fetch("http://localhost:3000/api/events/", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        date: fdate,
      }),
    });
    const body = await response.json();
    console.log("Body:", body);
    setEvents(body.events);
  };
  useState(() => {
    console.log("Fetch Effect triggered");
    fetchEvents();
  }, [date]);
  return (
    <Card className="m-2 p-2 dark:bg-neutral-900 shadow-md shadow-black/20 lg:col-span-2">
      <CardHeader className="text-2xl font-semibold text-center">
        <span>Events</span>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 font-light w-full lg:grid lg:grid-cols-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onValueChange={setDate}
          className="rounded-md border mx-auto"
        />
        <ScrollArea className="h-72 lg:col-span-2 shadow-inner shadow-black/30 rounded-lg p-4 mt-4 lg:mt-0 snap-y snap-mandatory">
          {/* {loading ?? <Loader className="animate-spin" />} */}
          {events.length < 1 ? (
            <div>No events</div>
          ) : (
            events.map((e) => (
              <Card
                key={e._id}
                className="mb-4 shadow-md shadow-black/20 snap-start dark:bg-neutral-800"
              >
                <CardHeader className="font-bold text-neutral-800">
                  {e.title}
                </CardHeader>
                <CardContent>
                  <CardTitle className="pb-2 font-normal">
                    {e.description}
                  </CardTitle>
                  <CardDescription>{e.note}</CardDescription>
                </CardContent>
                <Separator></Separator>
                <CardFooter className="mt-4">Timing: {e.datetime}</CardFooter>
              </Card>
            ))
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="ml-12">
        <span className="bg-teal-400 text-white rounded-md p-4 lg:ml-4">
          Total Events: {events.length}
        </span>
      </CardFooter>
    </Card>
  );
}
