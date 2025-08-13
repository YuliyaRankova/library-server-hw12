import {BookDto, BookGenres, BookStatus, PickRecord} from "../model/Book.ts";
import {v4 as uuidv4} from 'uuid';
import {HttpError} from "../errorHandler/HttpError.js";

export const convertBookDtoToBook = (dto: BookDto) =>{
    return {
        id: uuidv4(),
        title: dto.title,
        author: dto.author,
        genre: getGenre(dto.genre),
        status: BookStatus.ON_STOCK,
        pickList: []
    }
};

export function getGenre (genre: string){
    const bookGenre = Object.values(BookGenres).find(value => value === genre);
    if(!bookGenre) throw new HttpError(400, "Wrong genre");
    else
        return bookGenre
};