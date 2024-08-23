"use client"
import { Card, CardHeader, CardContent } from '../../ui/card'
import { Separator } from '../../ui/separator'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'
import FormContext from './form-context'
export default function ProjectForm() {
    const { data, setData } = useContext(FormContext)
    return (
        <AnimatePresence>
            <motion.div animate={{ opacity: [0, 1] }} exit={{ x: [0, 100], opacity: [1, 0] }} transition={{ duration: 1 }}>

                <Card className="m-2 p-2 dark:bg-neutral-900 shadow-md shadow-black/20 lg:w-1/3 lg:mx-auto lg:mt-12 dark:border-2 dark:border-white/40">
                    <CardHeader className="text-2xl font-semibold text-center"><span>New Project</span></CardHeader>
                    <Separator />
                    <CardContent className="mt-4 font-light w-full">
                        <div className='lg:px-12'>
                            <Label htmlFor="title">Title</Label>
                            <Input className="my-2" id="title" type="text" name="title" onChange={(e) => setData({ ...data, title: e.target.value })} value={data.title} />
                            <Label htmlFor="description">Description</Label>
                            <Textarea className="my-2" id="description" type="text" name="description" onChange={(e) => setData({ ...data, description: e.target.value })} value={data.description} />
                            <Label htmlFor="startdate">Start Date</Label>
                            <Input className="my-2" id="startdate" type="datetime-local" name="startdate" onChange={(e) => setData({ ...data, startdate: e.target.value })} value={data.startdate} />
                            <Label htmlFor="enddate">End Date</Label>
                            <Input className="my-2" id="enddate" type="datetime-local" name="enddate" onChange={(e) => setData({ ...data, enddate: e.target.value })} value={data.enddate} />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </AnimatePresence>
    )
}
