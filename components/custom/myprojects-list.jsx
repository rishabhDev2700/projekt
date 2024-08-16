import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '../ui/button'
import Link from 'next/link'
import ProjectCard from './project-card'
export default function MyProjectsList() {
    return (
        <Card className="lg:m-4 p-2 dark:bg-neutral-900 shadow-md shadow-black/20">
            <div className="text-2xl font-semibold py-4 px-4 lg:px-12 flex justify-between">
                <div className='inline-block'>My Projects</div> <Button className="inline-block"><Link href="/dashboard/myprojects/add">New Project</Link></Button>
            </div>
            <Separator />
            <CardContent className="mt-4 font-light">
                <ScrollArea className="min-h-[65vh] flex flex-wrap">
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
