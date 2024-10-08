import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function ProjectsList({ title, children, button }) {
    return (
        <Card className="lg:w-5/6 xl:w-2/3 lg:mx-auto lg:my-4 m-2 dark:bg-neutral-900 shadow-md shadow-black/20">
            <div className="text-2xl font-semibold py-4 px-4 lg:px-12 flex justify-between">
                <div className='inline-block'>{title}</div> {button}
            </div>
            <Separator />
            <CardContent className="mt-4 font-light">
                <ScrollArea className="min-h-[65vh] grid lg:grid-col-4 place-items-center content-start">
                    {children}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
