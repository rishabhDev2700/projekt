import React from 'react'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
export default function ProjectForm({ data, setData }) {
    return (
        <AnimatePresence>
            <motion.div animate={{ opacity: [0, 1] }} exit={{ x: [ 0,100],opacity:[1,0] }} transition={{ duration: 1 }}>

                <Card className="m-2 p-2 dark:bg-neutral-900 shadow-md shadow-black/20 lg:w-1/3 lg:mx-auto lg:mt-12 dark:border-2 dark:border-white/40">
                    <CardHeader className="text-2xl font-semibold text-center"><span>New Project</span></CardHeader>
                    <Separator />
                    <CardContent className="mt-4 font-light w-full">
                        <form className='lg:px-12'>
                            <Label htmlFor="title">Title</Label>
                            <Input className="my-2" id="title" type="text" name="title" required />
                            <Label htmlFor="description">Description</Label>
                            <Textarea className="my-2" id="description" type="text" name="description" required />
                            <Label htmlFor="startdate">Start Date</Label>
                            <Input className="my-2" id="startdate" type="datetime-local" name="startdate" required />
                            <Label htmlFor="enddate">End Date</Label>
                            <Input className="my-2" id="enddate" type="datetime-local" name="enddate" required />
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </AnimatePresence>
    )
}
