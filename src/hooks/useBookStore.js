import { useDispatch, useSelector } from "react-redux"
import { clearAllBook, createNewBook, setActiveBook } from "../store/book/bookSlice";
import { openOrCloseModal } from "../store/ui/uiSlice";

export const useBookStore = () => {


    const { activeBook, books, cre } = useSelector(state => state.book);
    const dispatch = useDispatch();

    const onSetBook = (form) => {


        try {

            if (form.id) {

                //actualizar libro
            }

            //crear libro

            dispatch(createNewBook(form));
            dispatch(openOrCloseModal());


        } catch (error) {

        }

    }

    const onSetActiveBook = (book) => {
        dispatch(setActiveBook(book));
        dispatch(openOrCloseModal());
    }


    const onClearAllBook = () => {
        dispatch(clearAllBook());
    }

    return {

        //states
        books,
        activeBook,

        //methods
        onSetBook,
        onSetActiveBook,
        onClearAllBook
    }
}
