"use client"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from "../ui/separator"
import { useState } from 'react'
import { ScrollArea } from "../ui/scroll-area"
export default function EventsList() {
    const [date, setDate] = useState(new Date())
    console.log(date)
    return (
        <Card className="m-4 p-2 dark:bg-neutral-900 shadow-md shadow-black/20 lg:col-span-2">
            <CardHeader className="text-2xl font-semibold text-center"><span>Events</span></CardHeader>
            <Separator />
            <CardContent className="mt-4 font-light w-full lg:grid lg:grid-cols-3">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-auto mx-auto"
                />
                <ScrollArea className="h-72 lg:col-span-2 shadow-inner shadow-black/30 rounded-lg p-4 mt-4 lg:mt-0 snap-y snap-mandatory">
                    <Card className="mb-4 shadow-md shadow-black/20 snap-start dark:bg-neutral-800">
                        <CardHeader className="font-bold text-neutral-800">Event Name</CardHeader>
                        <CardContent>
                            <CardTitle className="pb-2 font-normal">Agenda</CardTitle>
                            <CardDescription>note for meeting</CardDescription>
                        </CardContent>
                        <Separator></Separator>
                        <CardFooter className="mt-4">Timing: xx-xx</CardFooter>
                    </Card>
                    <Card className="p-2 mb-2 shadow-md shadow-black/20 snap-start dark:bg-neutral-800">
                        <CardTitle className="p-2">Event Name</CardTitle>
                        <CardContent>
                            <CardHeader>Agenda of meeting</CardHeader>
                            <CardDescription>note for meeting</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="p-2 mb-2 shadow-md shadow-black/20 snap-start dark:bg-neutral-800">
                        <CardTitle className="p-2">Event Name</CardTitle>
                        <CardContent>
                            <CardHeader>Agenda of meeting</CardHeader>
                            <CardDescription>note for meeting</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="p-2 mb-2 shadow-md shadow-black/20 snap-start dark:bg-neutral-800">
                        <CardTitle className="p-2">Event Name</CardTitle>
                        <CardContent>
                            <CardHeader>Agenda of meeting</CardHeader>
                            <CardDescription>note for meeting</CardDescription>
                        </CardContent>
                    </Card>

                </ScrollArea>
            </CardContent>
            <CardFooter><span className="bg-neutral-900 text-white rounded-md p-4 lg:ml-4">Total Events: 9</span></CardFooter>
        </Card>
    )
}
