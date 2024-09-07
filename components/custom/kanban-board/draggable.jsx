import React from 'react'
import { useDraggable } from '@dnd-kit/core';
export default function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.1)`,
    } : undefined;


    return (
        <div className="border m-2 p-2 bg-white rounded-lg shadow-md shadow-black/10 duration-200 z-50" ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </div>
    );
}
