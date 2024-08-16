import React from 'react'
import { getSession } from '@/lib/session'
export default async function Page() {
    const session = await getSession()
  return (
    <>
    <div>Dashboard</div>
    {session.user.name}
    </>
  )
}
