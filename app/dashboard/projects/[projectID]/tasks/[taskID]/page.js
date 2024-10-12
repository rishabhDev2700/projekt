import TaskDetail from '@/components/custom/task-detail'
import { fetchSingleProject, fetchSingleTask } from '@/lib/getData'
import { getSession } from '@/lib/session'

export default async function TaskPage({ params }) {
    const user = await getSession()
    const data = await fetchSingleTask(params.taskID, params.projectID)
    console.log("Task data:", data)
    const task = { title: data.title, description: data.description, deadline: data.deadline, status: data.status, note: data.note, comments: data.comments }
    // const task = { title: "", description: "", deadline: "", status: "", note: "", comments: [] }
    let { project } = await fetchSingleProject(user.userID, params.projectID)
    project = JSON.parse(JSON.stringify(project))
    return (
        <div className="lg:w-5/6 xl:w-2/3 lg:mx-auto my-4">
            <TaskDetail projectID={params.projectID} taskID={params.taskID} task={task} projectTeam={project.team.members} />
        </div>
    )
}
