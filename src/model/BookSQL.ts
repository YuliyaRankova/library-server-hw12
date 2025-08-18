
export type BookDto ={
    title: string,
    author: string,
    genre: string,
    quantity?: number
};

export type Book ={
    id:string,
    title: string,
    author: string,
    genre: BookGenres,
    status: BookStatus
};

export type ReaderDto ={
    name: string
};

export type Reader ={
    id:string,
    readerName: string,
    pick_date: string,
    return_date: string | null // when book firstly taken this field is null
}

export enum BookGenres {
    "SCI_FI" = "sci_fi",
    "ADVENTURE" = "adventure",
    "FANTASY" = "fantasy",
    "ROMANTIC" = "romantic",
    "CLASSIC" = "classic",
    "DYSTOPIA" = "dystopia",
    "DETECTIVE" = "detective"
};

export enum BookStatus {
    "ON_STOCK"= "on stock",
    "ON_HAND" = "on hand",
    "REMOVED" = "removed"
};
