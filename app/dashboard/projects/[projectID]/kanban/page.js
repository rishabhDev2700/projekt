import KanbanBoard from '@/components/custom/kanban-board/board'
import { fetchMyTasks } from '@/lib/getData'
import { getSession } from '@/lib/session'

export default async function Page() {
    const user = await getSession()
    const tasks = await fetchMyTasks(user.userID)
  return (
      <div>
          <KanbanBoard tasks={tasks} />
    </div>
  )
}
