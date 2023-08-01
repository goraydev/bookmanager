import { useDispatch, useSelector } from "react-redux"
import { createNewBook } from "../store/book/bookSlice";

export const useBookStore = () => {


    const { activeBook, books, cre } = useSelector(state => state.book);
    const dispatch = useDispatch();

    const onCreateNewBook = (form) => {

        dispatch(createNewBook(form));

    }

    return {


        //methods
        onCreateNewBook

    }
}
