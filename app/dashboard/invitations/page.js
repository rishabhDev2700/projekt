"use client"
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";







const fakeData = [
  {
    _id: 'project1',
    title: 'Project 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    team: [
      {
        email: 'user1@example.com',
        role: 'Project Manager'
      },
      {
        email: 'user2@example.com',
        role: 'Developer'
      }
    ]
  },
  {
    _id: 'project2',
    title: 'Project 2',
    description: 'Nulla facilisi. Ut fermentum, arcu eu placerat tincidunt, velit lacus accumsan velit.',
    team: [
      {
        email: 'user3@example.com',
        role: 'Designer'
      },
      {
        email: 'user4@example.com',
        role: 'Tester'
      }
    ]
  },
  // Add more fake data as needed
];


export default function Page() {
  const [invitations, setInvitations] = useState(fakeData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        // const data = await fetchProjectsByEmail('your_email'); // Replace with your actual email
        // setInvitations(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  const handleAcceptInvitation = (projectId) => {
    // Implement your logic to accept the invitation (e.g., update the database)
    console.log('Accepting invitation for project:', projectId);
  };

  const handleRejectInvitation = (projectId) => {
    // Implement your logic to reject the invitation (e.g., update the database)
    console.log('Rejecting invitation for project:', projectId);
  };

  return (
    <div className="mx-auto md:w-5/6 xl:w-2/3">
      <h2 className="text-3xl my-4 pl-8 underline">Invitations</h2>
      {loading && <p className="text-center text-gray-500">Loading invitations...</p>}
      {invitations.length === 0 && !loading && <p className="text-center text-gray-500">No invitations found.</p>}
      <ul className="mt-4">
        {invitations.map((invitation) => (
          <li key={invitation._id} className="mb-4 mx-4 border px-4 py-2 rounded-xl shadow-md shadow-black/10 flex justify-between items-center">
            <h2 className="text-xl font-bold">{invitation.title}</h2>
            <p className="text-gray-700">Role: {invitation.team[0].role}</p>
            <div className="flex items-center space-x-4 mt-2">
              <Button className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => handleAcceptInvitation(invitation._id)}>Accept</Button>
              <Button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleRejectInvitation(invitation._id)}>Reject</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};