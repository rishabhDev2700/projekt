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
import { Button } from "../ui/button"
import { useState } from "react"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
export default function TaskForm({ team, task, projectID }) {
    if (!task) {
        task = {
            title: '',
            description: '',
            deadline: '',
            note: '',
            assignedTo: '',
        }
    }
    const [data, setData] = useState({})
    const [error, setError] = useState(null)
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Basic validation (optional)
        if (!data.title || !data.description || !data.deadline || !data.assignedTo) {
            setError("All fields are required")
            return
        }
        try {
            const res = await fetch(`/api/projects/${projectID}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Send the form data as JSON
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.error || 'Something went wrong')
            }
            // Reset form or handle success
            setData({
                title: '',
                description: '',
                deadline: '',
                note: '',
                assignedTo: '',
            })
            setError(null) // Clear errors on success
            alert('Task created successfully!')
            router.refresh()

        } catch (err) {
            console.error(err)
            setError(err.message)
        }
    }
    console.log(team.members)
    const currentAssignedUser = (id) => {
        for (let m of team.members) {
            if (m === m.user._id) {
                return m
            }
        }
        return ''
    }

    return (
        <Dialog>
            <DialogTrigger asChild><Button className="bg-teal-400 hover:bg-cyan-800" >
                <Pencil1Icon />
            </Button></DialogTrigger>
            <DialogContent>
                <div className="m-2 p-2 lg:mx-auto  w-full">
                    <h2 className="text-2xl font-semibold text-center pb-4">New Task</h2>
                    <Separator />
                    <div className="mt-4 font-light w-full">
                        <Label htmlFor="title">Title</Label>
                        <Input className="my-2" id="title" type="text" onChange={e => setData({ ...data, title: e.target.value })} value={data.title} />
                        <Label htmlFor="description">Description</Label>
                        <Textarea className="my-2" id="description" type="text" onChange={e => setData({ ...data, description: e.target.value })} value={data.description} />
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input className="my-2" id="deadline" type="datetime-local" onChange={e => setData({ ...data, deadline: e.target.value })} value={data.deadline} />
                        <Label htmlFor="note">Note</Label>
                        <Textarea className="my-2" id="note" onChange={e => setData({ ...data, note: e.target.value })} value={data.note} ></Textarea>
                        <Label htmlFor="assignedto">Assign to</Label>
                        <Select id="assignedto" onValueChange={e => setData({ ...data, assignedTo: e })} value={currentAssignedUser(data.assignedTo)}>
                            <SelectTrigger className="w-[380px]">
                                <SelectValue placeholder="Assign to" />
                            </SelectTrigger>
                            <SelectContent>
                                {team.members.map(t => <SelectItem key={t.user._id} value={t.user._id}>{t.user.name}</SelectItem>)}
                            </SelectContent>
                        </Select>

                        <Button className="bg-indigo-500 mt-4" onClick={e => handleSubmit(e)}>Create</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}
