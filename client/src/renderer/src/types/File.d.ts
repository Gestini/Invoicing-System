export interface Node {
    id: number;
    name: string;
    children?: Node[];
    url?: string;
    type: number | null;
}