"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import Submit from "./submit-button"
import { Button } from "../ui/button"
import { useState } from "react"
export default function TaskForm({ team, task }) {
    const [data, setData] = useState({})
    return (
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <div className="m-2 p-2 lg:mx-auto  w-full">
                    <h2 className="text-2xl font-semibold text-center pb-4"><span>New Task</span></h2>
                    <Separator />
                    <div className="mt-4 font-light w-full">
                        <Label htmlFor="title">Title</Label>
                        <Input className="my-2" id="title" type="text" name="title" />
                        <Label htmlFor="description">Description</Label>
                        <Textarea className="my-2" id="description" type="text" name="description" />
                        <Label htmlFor="startdate">Start Date</Label>
                        <Input className="my-2" id="startdate" type="datetime-local" name="startdate" />
                        <Label htmlFor="enddate">End Date</Label>
                        <Input className="my-2" id="enddate" type="datetime-local" name="enddate" />
                        <Label htmlFor="assignedto">Assign to</Label>
                        <Select id="assignedto">
                            <SelectTrigger className="w-[380px]">
                                <SelectValue placeholder="Assign to" />
                            </SelectTrigger>
                            <SelectContent>
                                {team.members.map(t => <SelectItem key={t.user._id} value={t.user._id}>{t.user.name}</SelectItem>)}
                            </SelectContent>
                        </Select>

                        <Button className="bg-indigo-500 mt-4">Create</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}
