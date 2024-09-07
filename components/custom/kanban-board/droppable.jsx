import { useDroppable } from '@dnd-kit/core'
import React from 'react'

export default function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id
    })

    return (
        <div className="w-full border min-h-72 bg-neutral-100 shadow-inner rounded-xl mt-4" ref={setNodeRef}>
            <h2 className={`p-4 text-center rounded-t-xl ${props.color} text-white`}>{props.title}</h2>
            <div>
                {props.children}
            </div>
        </div>
    )
}
