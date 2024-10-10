"use client"
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Submit from './submit-button'
import { Button } from '../ui/button'
export default function UpdateForm({ project }) {
    const [data, setData] = useState({
        _id: project._id,
        title: project.title,
        description: project.description,
        startdate: project.startdate,
        enddate: project.enddate
    })
    const { toast } = useToast()
    const router = useRouter()
    console.log(data)
    const handleUpdate = async () => {
        console.log("Updating")
        try {
            const response = await fetch("/api/projects/", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const updatedProject = await response.json();
                toast({ title: "Project updated successfully!" });
                // Optionally refresh or redirect
            } else {
                toast({ title: "Failed to update the project." });
            }
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };
    const handleDelete = async () => {
        console.log("Delete")

        const confirmDelete = confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/projects/${project._id.toString()}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast({ title: "Project deleted successfully!" });
                router.push('/dashboard/projects')
                // Optionally redirect or refresh the page
            } else {
                toast({ title: "Failed to delete the project." });
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };
    return (
        <>
            <h1 className="text-4xl font-thin mx-4 py-8">Edit Project</h1>
            <div>
                <Label className="mx-4" htmlFor="">Title</Label>
                <Input className="p-2 m-2" type="text" placeholder="Title"
                    onChange={(e) => setData({ ...data, title: e.target.value })} value={data.title} />
                <Label className="mx-4" htmlFor="">Description</Label>
                <Textarea className="p-2 m-2" type="text" placeholder="Description" rows="8"
                    onChange={(e) => setData({ ...data, description: e.target.value })} value={data.description} />
                <Label className="mx-4" htmlFor="">Start date</Label>
                <Input className="p-2 m-2" type="datetime-local" placeholder="Start Date"
                    onChange={(e) => setData({ ...data, startdate: e.target.value })} value={data.startdate} />
                <Label className="mx-4" htmlFor="">End date</Label>
                <Input className="p-2 m-2" type="datetime-local" placeholder="End Date"
                    onChange={(e) => setData({ ...data, enddate: e.target.value })} value={data.enddate} />
                <div className='flex justify-between m-4'>
                    <Button onClick={() => handleUpdate()}>Update</Button>  
                    <Button onClick={() => handleDelete()} variant="destructive">Delete</Button>                 </div>
            </div>
        </>

    )
}
