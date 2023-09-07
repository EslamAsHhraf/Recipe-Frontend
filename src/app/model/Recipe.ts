export interface Recipe {
    id?:number;
    title : string;
    description : string;
    steps :string ;
    category : string;
    totalRating : Float32Array;
    image : string ;
}
