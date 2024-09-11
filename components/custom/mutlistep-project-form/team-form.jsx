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

export default function TeamForm() {
    const { data, setData } = useContext(FormContext)
    // const [team, setTeam] = useState(data.team)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const { toast } = useToast()

    const removeFromTeam = (email) => {
        let updatedTeam = data.team.filter((e) => e.email !== email)
        setData({ ...data, team:updatedTeam })
        toast({
            title: "Email removed",
        })
    }
    const addUserToTeam = (e) => {
        e.preventDefault()
        const exist = data.team.find(e => e.email === email)
        if (exist) {
            setEmail('')
            setRole('')
            toast({
                title: "Email already included",
            })
            return
        }
        setData({ ...data, team: [...data.team, { email: email, role: role }] })
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
                            {data.team.length !== 0 ? data.team.map((e, index) => {
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

                            <Select id="role" onValueChange={setRole} value={role} required>
                                <SelectTrigger className="mt-4" >
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Developer">Developer</SelectItem>
                                    <SelectItem value="Designer">Designer</SelectItem>
                                    <SelectItem value="Writer">Writer</SelectItem>
                                    <SelectItem value="Manager">Manager</SelectItem>
                                    <SelectItem value="Engineer">Engineer</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>
                    <Button className="my-4 w-full h-12" type="submit">Add</Button>
                </form>
            </motion.div>
        </AnimatePresence>
    )
}
