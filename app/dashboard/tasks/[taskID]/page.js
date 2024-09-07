import TaskDetail from '@/components/custom/task-detail'
import { fetchSingleTask } from '@/lib/getData'
import { getSession } from '@/lib/session'

export default async function TaskPage({ params }) {
    const user = await getSession()
    const data = await fetchSingleTask(params.taskID)
    const task = { title: data.title, description: data.description, deadline: data.deadline, status: data.status, note: data.note, comments: data.comments }
    return (
        <div className="lg:w-5/6 xl:w-2/3 lg:mx-auto my-4">
            <TaskDetail task={task} />
        </div>
    )
}
