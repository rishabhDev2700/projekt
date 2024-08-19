import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchSingleProject } from "@/lib/getData"
import { getSession } from "@/lib/session"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { ScrollArea } from "@/components/ui/scroll-area"
export default async function Page({ params }) {
    let user = await getSession()
    // const project = await fetchSingleProject(user.userID, params.projectID)
    return (
        <Card className="m-2 p-2 w-full lg:w-2/3 mx-auto shadow-md shadow-black/20 dark:bg-neutral-900">
            <CardHeader className=" text-3xl font-bold">project?.title</CardHeader>
            <CardContent >
                <div className="grid lg:grid-cols-2 lg:gap-12">

                    <img className="rounded-lg shadow-md shadow-black/20 lg:h-96 lg:mx-auto lg:w-full object-cover" src="https://images.pexels.com/photos/7911758/pexels-photo-7911758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    
                    <div className="py-4">
                        <CardDescription>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae est diam. Sed faucibus varius pharetra. Vestibulum in magna fermentum, pretium lorem a, ullamcorper arcu. Etiam maximus velit est, vel suscipit libero porttitor non. Duis mattis, urna aliquam efficitur venenatis, risus lacus sollicitudin ipsum, non auctor odio tortor nec risus. Aliquam vel ante nunc. Integer vehicula magna in ante imperdiet pulvinar id id felis. Sed pellentesque congue dapibus. Fusce mattis a dui sit amet tristique. Ut ultrices odio justo, eget consequat diam bibendum eu. Sed eu arcu nulla. Sed non mattis arcu, vitae ornare tortor. Ut condimentum varius imperdiet.
                        </CardDescription>
                        <div>
                            
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
                            <Card className="p-2 my-1 hover:bg-black/10">Member-1</Card>
                            <Card className="p-2 my-1 hover:bg-black/10">Member-2</Card>
                            <Card className="p-2 my-1 hover:bg-black/10">Member-3</Card>
                            <Card className="p-2 my-1 hover:bg-black/10">Member-4</Card>
                        </ScrollArea>
                    </Card>

                    <Card className="my-4">
                        <div className="flex justify-between items-center p-4">
                            <CardTitle>Team</CardTitle>
                            <Button className="bg-indigo-400 hover:bg-indigo-800" size="icon"><Link href="/dashboard/projects/432432/tasks"><Pencil1Icon /></Link></Button>
                        </div>
                        <Card className="p-2 my-1 hover:bg-black/10">Task-1</Card>
                        <Card className="p-2 my-1 hover:bg-black/10">Task-2</Card>
                        <Card className="p-2 my-1 hover:bg-black/10">Task-3</Card>
                        <Card className="p-2 my-1 hover:bg-black/10">Task-4</Card>
                    </Card>

                </div>
            </CardContent>
        </Card>

    )
}
