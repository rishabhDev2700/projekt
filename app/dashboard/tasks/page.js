import TaskOverview from '@/components/custom/task-overview'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { status } from '@/lib/constants'
import { fetchMyTasks } from '@/lib/getData'
import { getSession } from '@/lib/session'
export default async function Page() {
    const user = await getSession()
    const tasks = await fetchMyTasks(user.userID)

    return (
        <Card className="m-2 p-2 w-full lg:w-5/6 xl:w-2/3 mx-auto shadow-md shadow-black/20 dark:bg-neutral-900">
            <CardHeader>
                <CardTitle>My Tasks</CardTitle>
                <CardDescription>These are your tasks from all the projects </CardDescription>
                <CardContent>
                    {
                        tasks.map((t,i) => <TaskOverview key={i} task={t} text={status[t.status].text} color={ status[t.status].color } />)
                    }
                </CardContent>
            </CardHeader>
        </Card>
    )
}
