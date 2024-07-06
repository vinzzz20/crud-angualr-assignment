export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: RatingProps;

}

interface RatingProps {
    rate: number;
    count: number;
}