import { useDispatch, useSelector } from "react-redux"
import { clearAllBook, createNewBook, deleteBook, setActiveBook, updateBook } from "../store/book/bookSlice";
import { openOrCloseModal } from "../store/ui/uiSlice";

export const useBookStore = () => {


    const { activeBook, books } = useSelector(state => state.book);
    const dispatch = useDispatch();

    const onSetBook = (form) => {


        try {

            if (form._id) {

                //actualizar libro
                
                dispatch(updateBook(form));
                dispatch(openOrCloseModal());
                return;
            }

            //crear libro

            form._id = new Date().getTime();
            dispatch(createNewBook(form));
            dispatch(openOrCloseModal());


        } catch (error) {

            console.error(error)
        }

    }

    const onSetActiveBook = (book) => {
        dispatch(setActiveBook(book));
        dispatch(openOrCloseModal());
    }

    const onDeleteBook = (payload) => {
        try {


            dispatch(deleteBook(payload));

        } catch (error) {
            console.error(error)
        }
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
        onClearAllBook,
        onDeleteBook
    }
}
