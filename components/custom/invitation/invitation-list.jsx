"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from "react";
import { ROLES } from '@/lib/constants';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
export default function InvitationList({ invitations }) {
    const [loading, setLoading] = useState(true);
    const { toast } = useToast()
    const router = useRouter()
    const handleAcceptInvitation = (invitationID) => {
        // Implement your logic to accept the invitation (e.g., update the database)
        fetch(`/api/projects/invitations/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: invitationID,
            }),
        });
        toast({ title: "Accepted invitation to project" });
        router.refresh()
    };

    const handleRejectInvitation = (invitationID) => {
        // Implement your logic to reject the invitation (e.g., update the database)
        fetch(`/api/projects/invitations/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: invitationID
            }),
        });
        toast({ title: "Rejected invitation to project" });

    };

    return (
        <div className="mx-auto md:w-5/6 xl:w-2/3">
            <h2 className="text-3xl my-4 pl-8 underline">Invitations</h2>
            {invitations.length === 0 && !loading && <p className="text-center text-gray-500">No invitations found.</p>}
            <ul className="mt-4">
                {invitations.map((invitation) => (
                    <li key={invitation._id} className="mb-4 mx-4 border px-4 py-2 rounded-xl shadow-md shadow-black/10 flex justify-between items-center">
                        <h2 className="text-xl font-bold">{invitation.project.title}</h2>
                        <p className="text-gray-700">Role: {ROLES[invitation.role]}</p>
                        <div className="flex items-center space-x-4 mt-2">
                            <Button className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => handleAcceptInvitation(invitation._id)}>Accept</Button>
                            <Button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleRejectInvitation(invitation._id)}>Reject</Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>)
}
