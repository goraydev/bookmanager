import { useDispatch, useSelector } from "react-redux"
import { clearAllBook, createNewBook, deleteBook, getBooks, setActiveBook, updateBook } from "../store/book/bookSlice";
import { openOrCloseModal } from "../store/ui/uiSlice";
import appAPI from "../API/appAPI";

export const useBookStore = () => {


    const { activeBook, books } = useSelector(state => state.book);
    const dispatch = useDispatch();


    const onGetBooks = async () => {

        try {

            const { data } = await appAPI.get("/libros");
            dispatch(getBooks(data));

        } catch (error) {
            console.error(error);
        }
    }

    const onSetBook = async (form) => {


        try {

            if (form.id) {

                //actualizar libro
                await appAPI.put(`libros/${form.id}`, form);
                dispatch(updateBook({ ...form }));
                dispatch(openOrCloseModal());
                return;
            }

            //crear libro

            const { data } = await appAPI.post("libros", form);

            dispatch(createNewBook(data));
            dispatch(openOrCloseModal());


        } catch (error) {

            console.error(error)
        }

    }

    const onSetActiveBook = (book) => {
        dispatch(setActiveBook(book));
        dispatch(openOrCloseModal());
    }

    const onDeleteBook = async (payload) => {
        try {


            await appAPI.delete(`/libros/${payload.id}`);
            dispatch(deleteBook(payload.id));

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
        onDeleteBook,
        onGetBooks
    }
}
