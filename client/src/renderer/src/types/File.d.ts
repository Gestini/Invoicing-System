export interface Node {
  id: number;
  name: string;
  folder: boolean;
  path: string;
  file?: string | null
  type?: string | null;
}

export type LocalFile = {
  name: string;
  path: string;
  type: string;
  file: any; // Cambia 'string' a 'File'
  folder: boolean;
};

interface File {
  name: string;
  path: string; // Debe ser siempre un string, no undefined
  type: string;
  file: any; // Considera ser más específico aquí
  folder: boolean;
}