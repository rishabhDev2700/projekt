import { fetchProjectTasks, fetchSingleProject } from '@/lib/getData'
import { getSession } from '@/lib/session'

import TaskForm from '@/components/custom/task-form'
import { Card } from '@/components/ui/card'
export default async function page({ params }) {
    const user = await getSession()
    const tasks = await fetchProjectTasks(user.userID, params.projectID)
    let { project } = await fetchSingleProject(user.userID, params.projectID)
    project = JSON.parse(JSON.stringify(project))
    const list = tasks.map(t => <div key={t.title}>{t.title}</div>)
    return (
        <Card className='lg:w-2/3 lg:mx-auto mt-8 p-4'>
            <div className='flex justify-around w-full'>
                <h1 className="text-white">Project Tasks</h1>
                <TaskForm team={project.team} projectID={params.projectID} />
            </div>
            <div>
                {list}
            </div>
        </Card>
    )
}
