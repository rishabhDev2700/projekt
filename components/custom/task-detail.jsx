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

export default function TaskDetail({ task }) {
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [status, setStatus] = useState(task.status)
    const [note, setNote] = useState(task.note)
    const [comments, setComments] = useState(task.comments)
    const [assigned, setAssigned] = useState(task.user)
    const [team, setTeam] = useState([])
    useEffect(() => {

    }, [])
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
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* <div className="flex justify-between items-center w-52"> */}
                <div className=''>
                    <Label htmlFor="status">Status:</Label>
                    <Select id="status" onValueChange={setStatus} value={status} defaultValue={st[status].text}>
                        <SelectTrigger className="w-[180px] mb-4">
                            <SelectValue placeholder={`${st[status].text}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                st.map((st, i) => <SelectItem key={i} value={i}>{st.text}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div>

                    <Label htmlFor="assigned">Assigned to:</Label>
                    <Select id="assigned" onValueChange={setAssigned} value={assigned} defaultValue={assigned}>
                        <SelectTrigger className="w-[180px] mb-4">
                            <SelectValue placeholder={`${st[status].text}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                st.map((st, i) => <SelectItem key={i} value={i}>{st.text}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </div>
                {/* </div> */}
            </CardContent>
        </Card>
    )
}
