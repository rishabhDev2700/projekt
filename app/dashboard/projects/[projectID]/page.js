import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchSingleProject } from "@/lib/getData"
import { getSession } from "@/lib/session"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import TaskOverview from "@/components/custom/task-overview"
import { status } from "@/lib/constants"
import KanbanBoard from "@/components/custom/kanban-board/board"
export default async function Page({ params }) {
    let user = await getSession()
    const { project, tasks } = await fetchSingleProject(user.userID, params.projectID)
    return (
        <Card className="m-2 p-2 w-full lg:w-5/6 xl:w-2/3 mx-auto shadow-md shadow-black/20 dark:bg-neutral-900">
            <CardHeader className=" text-3xl font-bold">{project.title}</CardHeader>
            <CardContent >
                <div className="grid lg:grid-cols-2 lg:gap-12">

                    <img className="rounded-lg shadow-md shadow-black/20 lg:h-96 lg:mx-auto lg:w-full object-cover" src="https://images.pexels.com/photos/7911758/pexels-photo-7911758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

                    <div className="py-4">
                        <CardDescription>
                            {project.description}
                        </CardDescription>
                        <div>
                            {project.status}
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 lg:gap-12">

                    <Card className="my-4">
                        <div className="flex justify-between items-center p-2">
                            <CardTitle>Team</CardTitle>
                            <Link href="/dashboard/projects/432432/team"><Button className="bg-indigo-400 hover:bg-indigo-800" size="icon"><Pencil1Icon /></Button></Link>
                        </div>
                        <ScrollArea>
                            {project.team.map((m, i) => {
                                return <Card key={i} className="p-2 mx-2 my-1 hover:bg-black/10 flex justify-between items-center text-sm font-sm">
                                    <div>
                                        {m.email}
                                    </div>
                                    <div className="bg-purple-400 text-white p-2 rounded-md">
                                        {m.role}
                                    </div>
                                </Card>
                            })}

                        </ScrollArea>
                    </Card>

                    <Card className="my-4">
                        <div className="flex justify-between items-center p-2">
                            <CardTitle>Tasks</CardTitle>
                            <Link href="/dashboard/projects/432432/tasks"> <Button className="bg-indigo-400 hover:bg-indigo-800" size="icon"><Pencil1Icon /></Button></Link>
                        </div>
                        <div className="px-2">
                            {
                                tasks.map((t) => {
                                    return (
                                        <TaskOverview task={t} text={status[t.status].text} color={status[t.status].color} key={t.id} />

                                    )
                                })}
                        </div>

                    </Card>

                </div>
                {/* <KanbanBoard tasks={[...tasks]} /> */}
            </CardContent>
        </Card>

    )
}
