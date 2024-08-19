import ProjectsList from '@/components/custom/projects-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <ProjectsList title="My Projects" >
      <Link href="/dashboard/myprojects/add">
      <Button ><Plus />New Project</Button>
        </Link>
    </ProjectsList>
  )
}
