import TasksList from "@/components/custom/tasks-table";
import EventsList from "@/components/custom/events-list";
import ProjectsTable from "@/components/custom/projects-table";
export default function Page() {
    
    return (
        <main className="xl:w-1/2 mx-auto lg:grid lg:grid-cols-2">
            <TasksList/>
            <ProjectsTable />
            <EventsList />
        </main>
    )
}
