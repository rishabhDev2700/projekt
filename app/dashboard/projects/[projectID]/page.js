import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchSingleProject } from "@/lib/getData";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskOverview from "@/components/custom/task-overview";
import { status, statusColor } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InvitationForm from "@/components/custom/invitation/invitation-form";
import TaskForm from "@/components/custom/task-form";

export default async function Page({ params }) {
  let user = await getSession();
  const { project, tasks } = await fetchSingleProject(
    user.userID,
    params.projectID
  );
  return (
    <Card className="m-2 p-2 w-full lg:w-5/6 xl:w-2/3 mx-auto shadow-md shadow-black/20 dark:bg-neutral-900">
      <CardHeader className=" flex flex-row justify-between">
        <div className="text-3xl font-bold">{project.title}</div>
        <div className="inline">
          <Link href={`/dashboard/projects/${project._id}/edit`}>
            <Button size="icon" className="bg-purple-500 hover:bg-purple-600">
              <Pencil1Icon />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 lg:gap-12">
          <img
            alt="project-img"
            className="rounded-lg shadow-md shadow-black/20 lg:h-96 lg:mx-auto lg:w-full object-cover"
            src="https://images.pexels.com/photos/7911758/pexels-photo-7911758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />

          <div className="py-4">
            <CardDescription>{project.description}</CardDescription>
            <div>{project.status}</div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 lg:gap-12">
          <Card className="my-4">
            <div className="flex justify-between items-center p-2">
              <CardTitle>Team</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-indigo-400 hover:bg-indigo-800">
                    <Pencil1Icon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Fill the following to invite</DialogTitle>
                    <DialogDescription>
                      Enter the email and select the role
                    </DialogDescription>
                    <InvitationForm projectID={params.projectID} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <ScrollArea>
              {/* {project.team.map((m, i) => {
                                return <Card key={i} className="p-2 mx-2 my-1 hover:bg-black/10 flex justify-between items-center text-sm font-sm">
                                    <div>
                                        {m.email}
                                    </div>
                                    <div className="bg-purple-400 text-white p-2 rounded-md">
                                        {m.role}
                                    </div>
                                </Card>
                            })} */}
            </ScrollArea>
          </Card>

          <Card className="my-4">
            <div className="flex justify-between items-center p-2">
              <CardTitle>Tasks</CardTitle>
              <TaskForm
                projectID={params.projectID}
                team={JSON.parse(JSON.stringify(project.team))}
              />
            </div>
            <div className="px-2">
              {tasks.map((t) => (
                <TaskOverview
                  projectID={params.projectID}
                  task={t}
                  text={t.status}
                  color={`bg-${statusColor(t.status)}-500`}
                  key={t.id}
                />
              ))}
            </div>
          </Card>
        </div>
        {/* <KanbanBoard tasks={[...tasks]} /> */}
      </CardContent>
    </Card>
  );
}
