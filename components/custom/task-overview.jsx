import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Pencil2Icon } from "@radix-ui/react-icons"
import Link from "next/link"
export default function TaskOverview({ task, color, text,projectID }) {
    console.log(color)
    return (
        <Card className="py-2 px-4 my-1 hover:bg-black/10 flex justify-between items-center text-sm font-light">
            {task.title}
            <div className="flex items-center">
                <div className={`${color} text-white p-2 rounded-md`}>
                    {text}
                </div>
                <Link href={`/dashboard/projects/${projectID}/tasks/${task.id}`}>
                    <Button className="ml-4" variant="outline" size="icon"><Pencil2Icon /></Button>
                </Link>
            </div>
        </Card>)
}
