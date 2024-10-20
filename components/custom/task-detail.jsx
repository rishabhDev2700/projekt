"use client"
import { useState, useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { status as st } from '@/lib/constants'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { formatDateToInput } from '@/lib/utils'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

export default function TaskDetail({ projectID, taskID, task, team }) {
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [status, setStatus] = useState(task.status)
    const [note, setNote] = useState(task.note)
    const [deadline, setDeadline] = useState(formatDateToInput(task.deadline))
    const [comments, setComments] = useState(task.comments)
    const [assigned, setAssigned] = useState(task.user)
    const { toast } = useToast()
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Updated task data
        const updatedTask = {
            title,
            description,
            status,
            note,
            deadline,
            user: assigned, // Assigned user
        };

        try {

            const response = await fetch(`/api/projects/${projectID}/tasks/${taskID}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask)
            });
            if (response.ok) {
                const updatedTask = await response.json();
                toast({ title: "Task updated successfully!" });
                router.push(`/dashboard/projects/${projectID}`)
                // Optionally refresh or redirect
            } else {
                toast({ title: "Failed to update the task." });
            }
            // Assuming you have a backend API at this endpoint
            // Optionally, show success message or update UI accordingly
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };
    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this Task?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/projects/${projectID}/tasks/${taskID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast({ title: "Task deleted successfully!" });
                router.push(`/dashboard/projects/${projectID}`)
                // Optionally redirect or refresh the page
            } else {
                toast({ title: "Failed to delete the Task." });
            }
        } catch (error) {
            console.error("Error deleting Task:", error);
        }
    };
    const currentAssignedUser = (id) => {
        for (let m of team) {
            if (id === m._id) {
                return m.user.name
            }
        }
        return ''
    }
   
    return (
        <Card className="dark:bg-neutral-900 mx-2 border-2 shadow-md shadow-black/20">
            <CardHeader>
                <CardTitle>
                    <Label>Title</Label>
                    <Input className="mb-4" value={title} onChange={(e) => setTitle(e.target.value)} />
                </CardTitle>
                <CardDescription>
                    <Label>Description</Label>
                    <Textarea rows="8" className="mb-4" value={description} onChange={(e) => setDescription(e.target.value)}>
                    </Textarea>
                    <Label>Note</Label>
                    <Textarea rows="8" className="mb-4" id="note" value={note} onChange={(e) => setNote(e.target.value)} />
                    <Label>Deadline</Label>
                    <Input className="mb-4" type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className=''>
                    <Label htmlFor="status">Status:</Label>
                    <Select id="status" onValueChange={setStatus} value={status} defaultValue={status}>
                        <SelectTrigger className="w-[180px] mb-4">
                            <SelectValue placeholder={status} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Not started">Not started</SelectItem>
                            <SelectItem value="Ongoing">Ongoing</SelectItem>
                            <SelectItem value="Finished">Finished</SelectItem>
                            <SelectItem value="Halted">Halted</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>

                    <Label htmlFor="assigned">Assigned to:</Label>
                    <Select id="assigned" onValueChange={setAssigned} value={assigned} defaultValue={assigned}>
                        <SelectTrigger className="w-[180px] mb-4">
                            <SelectValue placeholder={assigned} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectContent>
                                {team.map(t => <SelectItem key={t.user._id} value={t.user._id}>{t.user.name}</SelectItem>)}
                            </SelectContent>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-between">
                    <Button onClick={handleSubmit}>Update</Button>
                    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                </div>
            </CardContent>
        </Card>
    )
}
