"use client"
import { useState, useContext, useEffect } from 'react'
import { Card, CardTitle, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { Separator } from '../../ui/separator'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogTrigger } from '../../ui/dialog'
import { Button } from "@/components/ui/button"
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import FormContext from './form-context'
export default function TaskCreator() {
  const { data, setData } = useContext(FormContext)
  const [tasks, setTasks] = useState(data.tasks)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [note, setNote] = useState('')
  const addTask = () => {
    setTasks([...tasks, { title, description, deadline, note }])
  }
  useEffect(() => {
    setData({ ...data, tasks: [...tasks] })
  }, [tasks])
  return (
    <AnimatePresence>
      <motion.div animate={{ opacity: [0, 1] }} exit={{ x: -100 }} transition={{ duration: 1, ease: "circInOut" }}>
        <Dialog>
          <Card className="lg:w-1/3 lg:my-4 lg:mx-auto p-2 dark:bg-neutral-900 shadow-md shadow-black/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl p-2 w-1/3">Project tasks</CardTitle>
              <DialogTrigger asChild className='flex justify-center'>
                <Button variant="outline" className="m-4"><Plus /> Task</Button>
              </DialogTrigger>        </div>
            <Separator />
            <CardContent className="py-4">
              {data.tasks ? data.tasks.map((t) => <Card key={t.title} className="py-2 px-4 my-2 shadow-md shadow-black/10">
                <CardTitle className="m-2">{t.title}</CardTitle>
                <CardContent>
                  <CardDescription>{t.description}</CardDescription>
                </CardContent>
              </Card>) : <div className='text-center'>Add Tasks to Project</div>}
            </CardContent>
          </Card>

          <DialogContent className="mx-auto w-[95vw] rounded-md">
            <DialogHeader>
              <DialogTitle className="py-4">Edit profile</DialogTitle>
              <DialogDescription>
                Add Task
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title of the task"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description of the task"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Deadline
                </Label>
                <Input
                  id="deadline"
                  onChange={(e) => setDeadline(e.target.value)}
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
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Extra information"
                  className="col-span-3"
                />
              </div>
              <Button onClick={() => addTask()}><Plus /> Add</Button>
            </div>
            <div className='w-52 mx-auto'>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  )
}
