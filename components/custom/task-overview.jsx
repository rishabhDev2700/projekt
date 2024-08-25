import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Pencil2Icon } from "@radix-ui/react-icons"
import Link from "next/link"
export default function TaskOverview({ task, color, text }) {
    console.log(color)
    return (
        <Card  className="py-2 px-4 my-1 hover:bg-black/10 flex justify-between items-center">
            {task.title}
        <div className="flex items-center">
                <div className="bg-blue-400 text-white p-2 rounded-md">
                {text}
                </div>
                <Link href={`/dashboard/tasks/${task._id}`}>
            <Button className="ml-4" variant="outline" size="icon"><Pencil2Icon /></Button>
                </Link>
        </div>
    </Card>)
}
