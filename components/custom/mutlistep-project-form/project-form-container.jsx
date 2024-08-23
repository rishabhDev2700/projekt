"use client"
import ProjectForm from '@/components/custom/mutlistep-project-form/project-form'
import TaskCreator from '@/components/custom/mutlistep-project-form/task-creator'
import TeamForm from './team-form'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useContext } from 'react'
import FormContext from './form-context'
import { useToast } from '@/components/ui/use-toast'
export default function ProjectFormContainer() {
    const { data, setData } = useContext(FormContext)
    const [loading, setLoading] = useState(false)
    const [formIndex, setFormIndex] = useState(0)
    const { toast } = useToast()

    const postData = () => {
        console.log(data)
        setLoading(true)

        console.log(JSON.stringify(data))
        const url = 'http://localhost:3000/api/projects'
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then((v) => {
            toast({
                title: "Saved Successfully",
                description: "Project created",
            })
            setLoading(false)
        }).catch(err => {

            console.error('There has been a problem with your fetch operation:', error);
            throw error;
        })

        // Check if the response is OK (status code in the range 200-299)
    }
    useEffect(() => {
        console.log("Data updated:", data)
    }, [data])

    const formComponents = [
        <ProjectForm />,
        <TeamForm />,
        <TaskCreator />
    ]
    return (

        <main className='p-2'>
            {formComponents[formIndex]}
            <div className='md:w-1/3 mx-auto flex justify-between py-8 px-2'>
                <Button disabled={formIndex === 0} onClick={() => setFormIndex(formIndex - 1)}>Previous</Button>
                {formIndex === 2 ?
                    <Button onClick={() => postData()} className="bg-blue-500">Create Project</Button> :
                    <Button onClick={() => setFormIndex(formIndex + 1)}>Next</Button>
                }
            </div>
        </main>
    )

}