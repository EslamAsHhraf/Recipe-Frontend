export interface Recipe {
    id?: number;
    title: string;
    description: string;
    steps: string;
    createdBy:number;
    category: number;
    totalRating: number;
    imageFile: string;
}
