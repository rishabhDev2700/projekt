import TasksList from "@/components/custom/tasks-table";
import EventsList from "@/components/custom/events-list";
import ProjectsTable from "@/components/custom/projects-table";
import { Suspense } from "react";
import { Loader } from "lucide-react";
export default function Page() {

    return (
        <main className="xl:w-2/3 lg:w-5/6 mx-auto lg:grid lg:grid-cols-2">
            <Suspense fallback={<Loader className="animate-spin" />}>
                <TasksList />
            </Suspense>
            <Suspense fallback={<Loader className="animate-spin" />}>
                <ProjectsTable />
            </Suspense>
            <Suspense fallback={<Loader className="animate-spin" />}>
                <EventsList />
            </Suspense>
        </main>
    )
}
