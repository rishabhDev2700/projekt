"use client"
import { useState } from 'react'
import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from '../ui/separator'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogTrigger } from '../ui/dialog'
import { Button } from "@/components/ui/button"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
export default function TaskCreator({data,setData}) {
  const [taskList, setTaskList] = useState([])
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [deadline,setDeadline] = useState("")
  const [note,setNote] = useState('')
  const addTask = ()=>{
    ()=>setTaskList(...taskList,{title:title,description:description,deadline:deadline,note:note})
    setData({...data,tasks:[...data.tasks,taskList]})
  } 
  return (
    <AnimatePresence>
      <motion.div animate={{opacity:[0,1]}} exit={{x:-100}} transition={{duration:1,ease:"circInOut"}}>

        <Dialog>
        <Card className="lg:w-1/3 lg:my-4 lg:mx-auto p-2 dark:bg-neutral-900 shadow-md shadow-black/20">
          <CardTitle className="text-xl p-2">Project tasks</CardTitle>
          <Separator />
          <CardContent>
            {taskList.length !== 0 ? taskList.map((t) => <Card>
              <CardTitle></CardTitle>
            </Card>) : <div className='text-center'>Add Tasks to Project</div>}
          </CardContent>
        </Card>
          <DialogTrigger asChild className='flex justify-center'>
            <Button variant="outline" className="m-4"><Plus /> Task</Button>
          </DialogTrigger>
          <DialogContent className="mx-auto w-[95vw] rounded-md">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Add Task
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={addTask}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  onChange={(e)=>setTitle(e.target.value)}

                  defaultValue="Title of the task"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  onChange={(e)=>setDescription(e.target.value)}
                  defaultValue="Description of the task"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Deadline
                </Label>
                <Input
                  id="deadline"
                  onChange={(e)=>setDeadline(e.target.value)}
                  type="datetime-local"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="note" className="text-right">
                  Note
                </Label>
                <Textarea
                  id="note"
                  onChange={(e)=>setNote(e.target.value)}
                  placeholder="Extra information"
                  className="col-span-3"
                />
              </div>
              <Button type="submit">Add Task</Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  )
}
