

export interface Pokemon{
    _id: number;
    name: string;
    image: string;
    species: string;
    type: string[];
    abilities: string[];
    stats: {
        hp: Number,
        attack: Number,
        defense: Number,
        "sp.atk": Number,
        "sp.def": Number,
        speed: Number,
        total: Number
    };
}