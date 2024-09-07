import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
export default function ProjectCard({ id, title, description, status }) {
    return (
        <Card className="-z-50 lg:w-56 rounded-xl lg:inline-block my-2 lg:m-1 hover:scale-95 duration-200 shadow-md shadow-black/10">
            <img className='rounded-t-lg p-0 m-0 h-1/2 ' src="https://images.unsplash.com/photo-1721475246144-98e4f01f3a6c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <CardHeader className="h-1/4">
                <CardTitle className="py-4">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="h-1/4 flex flex-col justify-evenly self-end">

                <div className="flex justify-between items-center">
                    <div className="border-2 p-2 rounded-md hover:bg-gray-500 hover:text-white duration-200">{status}</div>
                    <Link href={`/dashboard/projects/${id}`}><Button><ChevronRight /></Button></Link>
                </div>
            </CardContent>
        </Card>
    )
}
