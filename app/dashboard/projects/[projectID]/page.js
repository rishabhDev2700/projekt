import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchSingleProject } from "@/lib/getData"
import { getSession } from "@/lib/session"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil1Icon, Pencil2Icon } from "@radix-ui/react-icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import TaskOverview from "@/components/custom/task-overview"
import { status } from "@/lib/constants"
export default async function Page({ params }) {
    let user = await getSession()
    console.log(user)
    const { project, tasks } = await fetchSingleProject(user.userID, params.projectID)
    return (
        <Card className="m-2 p-2 w-full lg:w-1/2 mx-auto shadow-md shadow-black/20 dark:bg-neutral-900">
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
                        <div className="flex justify-between items-center p-4">
                            <CardTitle>Team</CardTitle>
                            <Button className="bg-indigo-400 hover:bg-indigo-800" size="icon"><Link href="/dashboard/projects/432432/team"><Pencil1Icon /></Link></Button>
                        </div>
                        <ScrollArea>
                            {project.team.map((m, i) => {
                                return <Card key={i} className="py-2 px-4 my-1 hover:bg-black/10 flex justify-between items-center">
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
                        <div className="flex justify-between items-center p-4">
                            <CardTitle>Tasks</CardTitle>
                            <Button className="bg-indigo-400 hover:bg-indigo-800" size="icon"><Link href="/dashboard/projects/432432/tasks"><Pencil1Icon /></Link></Button>
                        </div>
                        <div className="px-4">
                            {
                                tasks.map((t) => {
                                    return <TaskOverview key={t._id} task={t} text={status[t.status].text} />
                                })
                            }
                        </div>

                    </Card>

                </div>
            </CardContent>
        </Card>

    )
}
