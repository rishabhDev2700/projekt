"use client"

import { DndContext } from "@dnd-kit/core"
import Droppable from "./droppable"
import Draggable from "./draggable"
import { useState } from "react"

const columns = [
    { id: 1, color: "bg-neutral-500", title: 'To Do' },
    { id: 2, color: "bg-blue-400", title: 'Ongoing' },
    { id: 3, color: "bg-green-400", title: 'Completed' }
];

export default function KanbanBoard(props) {
    const [tasks, setTasks] = useState([
        ...props.tasks
        // { id: 1, title: 'UI', description: 'Task description', status: 1 },

    ]);
    console.log("board:", props.tasks)
    function handleDragEnd(event) {
        console.table(event)
        if (event.over) {
            const updatedTasks = tasks.map(t => {
                if (t.id == event.active._id) {
                    const newStatus = event.over.id || t.status; // Default to current status if mapping is missing
                    console.log("New state:".newStatus)
                    return { ...t, status: newStatus };
                }
                return t;
            });

            setTasks(updatedTasks);
        }
    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-3 lg:mx-auto gap-4">

                {columns.map(c => {
                    return (
                        <Droppable key={c.id} id={c.id} title={c.title} color={c.color}>
                            {
                                props.tasks.filter(t => t.status == c.id).map(t => <Draggable key={t.id} id={t.status}>{t.title}</Draggable>)
                            }

                        </Droppable>
                    )
                })}
            </div>
        </DndContext>
    )
}
