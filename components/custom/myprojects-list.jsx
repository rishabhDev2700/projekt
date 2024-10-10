import React from 'react'
import ProjectsList from './projects-list'
import { fetchMyProjects } from '@/lib/getData'
import ProjectCard from './project-card'
import { getSession } from '@/lib/session'
import { Button } from '../ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
export async function MyProjectsList() {
    const user = await getSession()
    const projects = await fetchMyProjects(user.userID)
    console.log(projects)
    return (
        <ProjectsList title="My Projects" button={<Link href="/dashboard/myprojects/add"><Button><PlusIcon /></Button></Link>}>
            {projects.map((p, i) => {
                return <ProjectCard key={i} title={p.title} description={p.description} id={p._id} status={p.status} />
            })}
        </ProjectsList>
    )
}
