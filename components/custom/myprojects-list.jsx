import React from 'react'
import ProjectsList from './projects-list'
import { fetchMyProjects } from '@/lib/getData'
import ProjectCard from './project-card'
import { getSession } from '@/lib/session'
export async function MyProjectsList() {
    const user = await getSession()
    const projects = await fetchMyProjects(user.userID)
    return (
        <ProjectsList title="My Projects">
            {projects.map((p) => {
                return <ProjectCard title={p.title} description={p.description} id={p._id} />
            })}
        </ProjectsList>
    )
}
