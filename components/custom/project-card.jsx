import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
export default function ProjectCard() {
    return (
        <Card className="w-full lg:w-72 rounded-xl lg:inline-block m-2 lg:m-4 hover:scale-105 duration-200 shadow-md shadow-black/10">
            <img className='rounded-t-lg p-0 m-0 h-1/2' src="https://images.unsplash.com/photo-1721475246144-98e4f01f3a6c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

            <CardContent className="h-1/2 flex flex-col justify-evenly">
                <CardTitle className="py-8">Master Project</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet consectetur, adipi...</CardDescription>
                <Button className="mt-4 self-end"><Link href="/dashboard/myprojects/43242"><ChevronRight /></Link></Button>
            </CardContent>
        </Card>
    )
}
