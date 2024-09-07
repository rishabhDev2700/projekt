import { fetchAllProjects } from '@/lib/getData'
import { getSession } from '@/lib/session'
import ProjectsList from './projects-list'
import ProjectCard from './project-card'
export default async function AllProjectsList() {
    const user = await getSession()
    const projects = await fetchAllProjects(user.userID)
    return (
        <ProjectsList title="Projects">
            {projects.map((p, i) => {
                return <ProjectCard key={i} title={p.title} description={p.description} id={p._id} status={p.status} />
            })}
        </ProjectsList>
    )
}
