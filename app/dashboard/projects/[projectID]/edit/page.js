import UpdateForm from '@/components/custom/update-form'
import { Card } from '@/components/ui/card'

import { fetchSingleProject } from '@/lib/getData'
import { getSession } from '@/lib/session'
import { formatDateToInput } from '@/lib/utils'
export default async function Page({ params }) {
  const user = await getSession()
  let {project} = await fetchSingleProject(user.userID, params.projectID)
  project = {
    _id: project._id,
    title: project.title,
    description: project.description,
    startdate: formatDateToInput(project.startdate),
    enddate: formatDateToInput(project.enddate)
  }
  return (
    <>
      <Card className="m-2 p-2 lg:w-5/6 xl:w-2/3 mx-auto shadow-md shadow-black/20 dark:bg-neutral-900">
        <UpdateForm project={project} />
      </Card>
    </>
  )
}
