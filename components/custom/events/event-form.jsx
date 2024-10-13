"use client"; // This is a client-side component

import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';

export default function EventForm({ event, projectId }) {
    // Initialize the form state with event data if available, otherwise empty/default values
    const [data, setData] = useState({
        _id: event?._id || '',
        title: event?.title || '',
        description: event?.description || '',
        note: event?.note || '',
        datetime: event?.datetime || '',
        invitees: event?.invitees || [],  // Assuming invitees is an array of user IDs
        project: event?.project || projectId || '',  // Either use provided projectId or from event
    });

    const { toast } = useToast();
    const router = useRouter();

    // Function to handle event update or creation
    const handleSave = async () => {
        try {
            const url = data._id ? `/api/events/${data._id}` : '/api/events/';
            const method = data._id ? 'PUT' : 'POST';  // POST for new event, PUT for updating
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const updatedEvent = await response.json();
                toast({ title: data._id ? "Event updated successfully!" : "Event created successfully!" });
                router.push(`/dashboard/projects/${data.project}`);  // Redirect to project page
            } else {
                toast({ title: "Failed to save the event." });
            }
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    // Function to delete the event
    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this event?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/events/${data._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast({ title: "Event deleted successfully!" });
                router.push(`/dashboard/projects/${data.project}`);
            } else {
                toast({ title: "Failed to delete the event." });
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <>
            <h1 className="text-4xl font-thin mx-4 py-8">{data._id ? "Edit Event" : "Create Event"}</h1>
            <div>
                <Label className="mx-4" htmlFor="title">Title</Label>
                <Input className="p-2 m-2" type="text" placeholder="Title"
                    onChange={(e) => setData({ ...data, title: e.target.value })} value={data.title} />

                <Label className="mx-4" htmlFor="description">Description</Label>
                <Textarea className="p-2 m-2" placeholder="Description" rows="8"
                    onChange={(e) => setData({ ...data, description: e.target.value })} value={data.description} />

                <Label className="mx-4" htmlFor="note">Note</Label>
                <Textarea className="p-2 m-2" placeholder="Note" rows="4"
                    onChange={(e) => setData({ ...data, note: e.target.value })} value={data.note} />

                <Label className="mx-4" htmlFor="datetime">Date & Time</Label>
                <Input className="p-2 m-2" type="datetime-local" placeholder="Date & Time"
                    onChange={(e) => setData({ ...data, datetime: e.target.value })} value={data.datetime} />

                {/* Assuming invitees is a list of user IDs and you'll implement logic for selecting them */}
                <Label className="mx-4" htmlFor="invitees">Invitees</Label>
                <Input className="p-2 m-2" type="text" placeholder="Invitee User IDs (comma-separated)"
                    onChange={(e) => setData({ ...data, invitees: e.target.value.split(',') })} value={data.invitees.join(',')} />

                <div className="flex justify-between m-4">
                    <Button onClick={handleSave}>{data._id ? "Update Event" : "Create Event"}</Button>
                    {data._id && <Button onClick={handleDelete} variant="destructive">Delete</Button>}
                </div>
            </div>
        </>
    );
}
