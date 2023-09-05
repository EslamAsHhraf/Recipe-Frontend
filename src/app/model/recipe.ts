export interface Recipe {
    getRecipebyid(id: number): unknown;
    id?:number;
    title : "";
    description : "";
    Steps :"" ;
    Category : "";
    TotalRating : Float32Array;
    image : string ;
}
