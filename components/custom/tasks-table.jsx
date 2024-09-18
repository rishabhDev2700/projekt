import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import Link from 'next/link'
import { EnterIcon } from '@radix-ui/react-icons'
import { fetchMyTasks } from '@/lib/getData'
import { getSession } from '@/lib/session'
import { status } from '@/lib/constants'

export default async function TasksTable() {
    const user = await getSession()
    let tasks = await fetchMyTasks(user.userID)
    return (
        <Card className="m-4 p-2 dark:bg-neutral-900 shadow-md shadow-black/20">
            <CardHeader className="text-2xl font-semibold"><div>My Tasks</div></CardHeader>
            <Separator />
            <CardContent className="mt-4 font-light">
                <ScrollArea className="max-h-64">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold text-neutral-700 dark:text-white">
                                    Task
                                </TableHead>
                                <TableHead className="font-bold text-neutral-700 dark:text-white">
                                    Status
                                </TableHead>
                                <TableHead className="font-bold text-neutral-700 dark:text-white">
                                    Deadline
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.length > 0 ? tasks.map(t => (<TableRow key={t._id}>
                                <TableCell>{t.title}</TableCell>
                                <TableCell> <Button className={`bg-${status[t.status].color}-500`}>{status[t.status].text}</Button></TableCell>
                                <TableCell>{t.dealine}</TableCell>
                                <TableCell><Link href={`/dashboard/tasks/${t._id}`}><Button size="icon"><EnterIcon /></Button></Link></TableCell>

                            </TableRow>)) : <TableRow><TableCell>No task</TableCell></TableRow>}
                            {/* <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Developer</TableCell>
                                <TableCell>xx/xx/xxxx</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Developer</TableCell>
                                <TableCell>xx/xx/xxxx</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Developer</TableCell>
                                <TableCell>xx/xx/xxxx</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Developer</TableCell>
                                <TableCell>xx/xx/xxxx</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Developer</TableCell>
                                <TableCell>xx/xx/xxxx</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Developer</TableCell>
                                <TableCell>xx/xx/xxxx</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Developer</TableCell>
                                <TableCell>xx/xx/xxxx</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Developer</TableCell>
                                <TableCell>xx/xx/xxxx</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Developer</TableCell>
                                <TableCell>xx/xx/xxxx</TableCell>
                            </TableRow> */}
                        </TableBody>
                    </Table>

                </ScrollArea>
            </CardContent>
            <CardFooter><Link href="/dashboard/tasks"><Button className="bg-blue-400">All Tasks</Button></Link></CardFooter>
        </Card>
    )
}
