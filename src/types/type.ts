export type GuitarProps = {
    name: string;
    image: string;
    description: string;
    price: number;
    addToCart: (name: string) => void
}

export type GuitarE = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    quantity: number;
}