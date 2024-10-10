"use client"
import { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select"
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
export default function InvitationForm({ projectID }) {
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('viewer')
    const { toast } = useToast()
    const sendInvitation = async (e) => {
        e.preventDefault()
        if (!email) {
            toast({ title: "Enter the Email first!!" })
            return
        } else {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                toast({
                    title: "Invalid Email!",
                })
                return
            }
        }
        try {

            const response = await fetch('/api/projects/team', {
                method: 'POST', // Specifies the request type
                headers: {
                    'Content-Type': 'application/json', // Ensures the server understands it's receiving JSON
                },
                body: JSON.stringify({ project: projectID, email: email, role: role }), // Converts the JS object into a JSON string
            })
            if (response.ok) {
                toast({
                    title: "Invitation sent"
                })
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }
        catch (e) {
            console.log(e)
            toast({ title: `Something went wrong!${e}` })
        }

    }
    console.log("Invite to project:=>", projectID)
    return (
        <form className='mt-4' onSubmit={sendInvitation}>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <Label className="w-full" htmlFor="user-mail">Email</Label>
                    <Input className="w-full mt-4" id="user-mail" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Search Email" value={email} />
                </div>
                <div>
                    <Label className="w-full" htmlFor="role">Role</Label>

                    <Select id="role" onValueChange={setRole} value={role} defaultValue='viewer' required>
                        <SelectTrigger className="mt-4" >
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </div>
            <Button className="my-4 w-full h-12 bg-teal-500 hover:bg-teal-600">Invite</Button>
        </form>)
}
