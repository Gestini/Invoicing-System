export interface Node {
    id: number;
    name: string;
    children?: Node[];
    url?: string;
    file?: string | null
    type: string | null;
}

export interface LocalFile {
    name: string;
    file: null | string;
    url: string;
    type: string | null;
}