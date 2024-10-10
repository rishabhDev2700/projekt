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
import { Link2Icon } from 'lucide-react'

export default async function TasksTable() {
    const user = await getSession()
    let tasks = await fetchMyTasks(user.userID)
    return (
        <Card className="m-4 p-2 dark:bg-neutral-900 shadow-md shadow-black/20 flex flex-col justify-between">
            <CardHeader className="text-2xl font-semibold h-5/12 my-auto"><div>My Tasks</div></CardHeader>
            <Separator />
            <CardContent className="mt-4 font-light h-4/6">
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
                                    <Link2Icon />
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
                        </TableBody>
                    </Table>

                </ScrollArea>
            </CardContent>
            <CardFooter className="h-1/6"><Link href="/dashboard/tasks"><Button className="bg-blue-400">All Tasks</Button></Link></CardFooter>
        </Card>
    )
}
