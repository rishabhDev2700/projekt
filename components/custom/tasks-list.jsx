import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function TasksList() {
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
                        </TableBody>
                    </Table>

                </ScrollArea>
                </CardContent>
                <CardFooter><Button><Link href="/tasks">All Tasks</Link></Button></CardFooter>
            </Card>
  )
}
