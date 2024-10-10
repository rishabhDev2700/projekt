import React from 'react'
import { useDraggable } from '@dnd-kit/core';
// this is the item
export default function Draggable(props) {
    console.log("Item props:", props)
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.status,
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
