import { useDispatch, useSelector } from "react-redux"
import { createNewBook } from "../store/book/bookSlice";
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

    return {


        //methods
        onSetBook

    }
}
