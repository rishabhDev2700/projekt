"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
export default function ProjectUpdateForm() {
    const [data, setData] = useState({ projectID: project._id, title: project.title, description: project.description, startdate: formatDateToInput(project.startdate), enddate: formatDateToInput(project.enddate) })
    const { toast } = useToast()
    const router = useRouter()
    const handleUpdate = async () => {
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
        <div>ProjectUpdateForm</div>
    )
}
