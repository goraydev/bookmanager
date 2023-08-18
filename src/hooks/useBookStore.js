import { useDispatch, useSelector } from "react-redux"
import {
    clearAllBook,
    createNewBook,
    createNewInventory,
    deleteBook,
    getBooks,
    getInventoryByIdBook,
    getTypeBooks,
    setActiveBook,
    updateBook
} from "../store/book/bookSlice";
import { openOrCloseModal } from "../store/ui/uiSlice";
import appAPI from "../API/appAPI";

export const useBookStore = () => {


    const { activeBook, books, listTypeBook, listInventory, activeInventory } = useSelector(state => state.book);
    const dispatch = useDispatch();


    const onGetBooks = async () => {

        try {

            const { data } = await appAPI.get("/ListaLibro");
            dispatch(getBooks(data));

        } catch (error) {
            console.error(error);
        }
    }


    const onGetTypeBooks = async () => {
        try {

            const { data } = await appAPI.get("/ListaTipoLibro");
            dispatch(getTypeBooks(data));
        } catch (error) {
            console.error(error)
        }
    }

    const onGetBookById = async (id) => {
        try {

            const { data } = await appAPI.get(`/ListaLibro/${id}`);

            dispatch(setActiveBook({ ...data }));

        } catch (error) {
            console.error(error);
        }

    }

    const onSetBook = async (form) => {


        try {

            if (form.id) {

                //actualizar libro
                await appAPI.put(`ListaLibro/${form.id}`, form);
                dispatch(updateBook({ ...form }));
                dispatch(openOrCloseModal());
                return;
            }

            //crear libro

            const { data } = await appAPI.post("ListaLibro", form);

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


            await appAPI.delete(`/ListaLibro/${payload.id}`);
            dispatch(deleteBook(payload.id));

        } catch (error) {
            console.error(error)
        }
    }


    const onClearAllBook = () => {
        dispatch(clearAllBook());
    }

    //inventory
    const onGetInventoryById = async (id) => {

        try {

            const { data } = await appAPI.get(`/ListaInventario`);
            const result = data.filter(inv => inv.libroid === Number(id));
            dispatch(getInventoryByIdBook(result));


        } catch (error) {
            console.error(error);
        }

    }

    const onSetInventory = async (form) => {

        try {

            if (form.id) {
                //update inventory
                return;
            }

            //create inventory
            const { data } = await appAPI.post("ListaInventario", form);
            dispatch(createNewInventory(data));
            dispatch(openOrCloseModal());

        } catch (error) {
            console.error(error)
        }
    }

    return {

        //states
        books,
        activeBook,
        listTypeBook,
        listInventory,
        activeInventory,

        //methods
        onSetBook,
        onSetActiveBook,
        onClearAllBook,
        onDeleteBook,
        onGetBooks,
        onGetTypeBooks,
        onGetBookById,
        onGetInventoryById,
        onSetInventory
    }
}
