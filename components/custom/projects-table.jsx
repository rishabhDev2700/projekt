import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import Link from 'next/link'
import { EnterIcon, Link1Icon } from '@radix-ui/react-icons'
import { getSession } from '@/lib/session'
import { fetchAllProjects } from '@/lib/getData'
import { Link2Icon } from 'lucide-react'
export default async function ProjectsTable() {
    const user = await getSession()
    const projects = await fetchAllProjects(user.userID)
    return (
        <Card className="m-4 p-2 dark:bg-neutral-900 shadow-md shadow-black/20 flex flex-col justify-between">
            <CardHeader className="text-2xl font-semibold h-5/12"><div>My Projects</div></CardHeader>
            <Separator />
            <CardContent className="mt-4 font-light h-4/6">
                <ScrollArea className="max-h-64">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold text-neutral-700 dark:text-white">
                                    Project
                                </TableHead>
                                <TableHead className="font-bold text-neutral-700 dark:text-white">
                                    Description
                                </TableHead>
                                <TableHead className="font-bold text-neutral-700 dark:text-white">
                                    <Link2Icon />
                                </TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map(p => <TableRow key={p._id}>
                                <TableCell>{p.title}</TableCell>
                                <TableCell>{p.description}</TableCell>
                                {/* <TableCell>{p.enddate}</TableCell> */}
                                <TableCell><Link href={`/dashboard/projects/${p._id}`}><Button size="icon"><EnterIcon /></Button></Link></TableCell>
                            </TableRow>)}

                        </TableBody>
                    </Table>

                </ScrollArea>
            </CardContent>
            <CardFooter className="h-1/6"><Link href="/dashboard/projects"><Button className="bg-purple-400">All Projects</Button></Link></CardFooter>
        </Card>
    )
}
