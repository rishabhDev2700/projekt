"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion, AnimatePresence } from 'framer-motion'
import FormContext from './form-context'
import { TrashIcon } from '@radix-ui/react-icons'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useToast } from '@/components/ui/use-toast'
import Submit from '../submit-button'

export default function TeamForm() {
    const [team, setTeam] = useState([])
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('viewer')
    const { toast } = useToast()
    const saveTeam = () => {
        fetch('/api/project/team', {
            method: 'POST', // Specifies the request type
            headers: {
                'Content-Type': 'application/json', // Ensures the server understands it's receiving JSON
            },
            body: JSON.stringify(team), // Converts the JS object into a JSON string
        })
    }
    const removeFromTeam = (email) => {
        let updatedTeam = team.filter((e) => e.email !== email)
        setTeam(updatedTeam)
        toast({
            title: "Email removed",
        })
    }
    const addUserToTeam = (e) => {
        e.preventDefault()
        const exist = team.find(u => u.email === email)
        if (!email) {
            toast({
                title: "Email field empty!",
            })
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
        if (exist) {
            setEmail('')
            setRole('')
            toast({
                title: "Email already included",
            })
            return
        }
        setTeam([...team, { email: email, role: role }])
        toast({
            title: "Added Successfully",
            description: "Email Added",
        })
        setEmail('')
        setRole('')
    }
    return (
        <AnimatePresence>
            <motion.div animate={{ opacity: [0, 1] }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className='p-2 lg:p-8 flex flex-col items-center'>
                <h1 className="text-2xl">Your Team</h1>
                <ScrollArea className="h-[45vh] lg:h-[30vh] lg:w-2/5 lg:mx-auto w-full snap-y snap-mandatory shadow-inner">
                    <Table className="p-1 lg:p-2 my-4 w-full dark:bg-neutral-900 dark:text-white dark:border-2 border rounded-lg shadow-md shadow-black/20">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Action </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {team.length !== 0 ? team.map((e, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{e.email}</TableCell>
                                        <TableCell>{e.role}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => removeFromTeam(e.email)}><TrashIcon /></Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) : <TableRow>
                                <TableCell>No member. Enter the email below to invite</TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </ScrollArea>

                <form className='w-full lg:w-2/5 my-4' onSubmit={addUserToTeam}>
                    <div className="grid grid-cols-3">
                        <div className="col-span-2">
                            <Label className="w-full" htmlFor="user-mail">Enter Email</Label>
                            <Input className="w-full mt-4" id="user-mail" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Search Email" value={email} />
                        </div>
                        <div>
                            <Label className="w-full" htmlFor="role">Select Role</Label>

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
                    <Button className="my-4 w-full h-12 bg-teal-500 hover:bg-teal-600" type="submit">Add</Button>
                    <Submit text="Invite" color="purple" />
                </form>
            </motion.div>
        </AnimatePresence>
    )
}
