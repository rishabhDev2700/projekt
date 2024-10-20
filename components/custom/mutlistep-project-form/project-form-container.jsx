"use client"
import ProjectForm from '@/components/custom/mutlistep-project-form/project-form'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useContext } from 'react'
import FormContext from './form-context'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
export default function ProjectFormContainer() {
    const { data, setData } = useContext(FormContext)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const postData = () => {
        setLoading(true)
        const url = '/api/projects'
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
            router.refresh()

        }).catch(err => {

            console.error('There has been a problem with your fetch operation:', err);
            throw error;
        })
    }

    return (

        <main className='p-2'>
            <ProjectForm />
            <div className='md:w-1/3 mx-auto flex justify-between py-8 px-2'>

                <Button onClick={() => postData()} disabled={loading} className="bg-blue-500 dark:text-white">{loading ? <Loader2 className="animate-spin" /> : "Create Project"}</Button>
            </div>
        </main>
    )

}