export interface Recipe {
    getRecipebyid(id: number): unknown;
    id?: number;
    title: '';
    description: '';
    Steps: '';
    category: '';
    totalRating: Float32Array;
    image: string;
}
