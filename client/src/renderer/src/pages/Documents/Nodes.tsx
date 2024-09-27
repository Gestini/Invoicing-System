import React, { useState } from 'react'

export interface Node {
    id: number;
    name: string;
    children?: Node[];
    url?: string;
    type: number | null;
}


const [nodes, setNodes] = useState<Node[]>([]); // Estructura raíz