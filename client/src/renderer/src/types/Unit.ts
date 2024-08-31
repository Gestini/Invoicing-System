export interface Unit {
    id: number;
    name: string;
    category?: string;
    description: string;
    link: string;
    ecommerce: string;
    image: string,
    owner: object,
    plan: object | null
}

