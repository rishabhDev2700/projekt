"use client"
import ProjectForm from '@/components/custom/mutlistep-project-form/project-form'
import TaskCreator from '@/components/custom/mutlistep-project-form/task-creator'
import TeamSelector from '@/components/custom/mutlistep-project-form/team-selector'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState, useContext } from 'react'
import FormContext from './form-context'
import { useToast } from '@/components/ui/use-toast'
export default function ProjectFormContainer() {
    const { data, setData } = useState(FormContext)
    const [loading, setLoading] = useState(false)
    const [formIndex, setFormIndex] = useState(0)
    const { toast } = useToast()

    const postData = () => {
        setLoading(true)
        console.log(data)
        toast({
            title: "Saved Successfully",
            description: "Project created",
        })
        setLoading(false)
    }
    const formComponents = [
        <ProjectForm />,
        <TeamSelector />,
        <TaskCreator />
    ]
    return (

        <main className='p-2'>
            {formComponents[formIndex]}
            <div className='md:w-1/3 mx-auto flex justify-between py-8 px-2'>
                <Button disabled={formIndex === 0} onClick={() => setFormIndex(formIndex - 1)}>Previous</Button>
                {formIndex === 2 ?
                    <Button onClick={() => postData()} className="bg-blue-500">Create Project</Button> :
                    <Button disabled={formIndex === 2} onClick={() => setFormIndex(formIndex + 1)}>Next</Button>
                }
            </div>
        </main>
    )
}
