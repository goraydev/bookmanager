import { useDispatch, useSelector } from "react-redux"
import {
    clearAllBook,
    clearAllInventory,
    createNewBook,
    createNewInventory,
    deleteBook,
    deleteInventory,
    getBooks,
    getInventory,

    getTypeBooks,
    setActiveBook,
    setActiveInventory,
    updateBook,
    updateInventory
} from "../store/book/bookSlice";
import { openOrCloseModal } from "../store/ui/uiSlice";
import appAPI from "../API/appAPI";

export const useBookStore = () => {


    const { activeBook, books, listTypeBook, listInventory, activeInventory, listInventoryByBook } = useSelector(state => state.book);
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

            const { data } = await appAPI.get(`/ListaLibro`);
            const result = data.find(book => book.libroid == id);
            dispatch(setActiveBook({ ...result }));

        } catch (error) {
            console.error(error);
        }

    }



    const onSetBook = async (form) => {


        try {

            if (form.libroid) {

                //actualizar libro
                const { nombreLib, tipoId, edicion, año, editorial, autor } = form;
                const { data } = await appAPI.put(`UpdateLibro/${form.libroid}`, { nombreLib, tipoId, edicion, año, editorial, autor });
                dispatch(updateBook(data));
                dispatch(openOrCloseModal());
                return;
            }

            //crear libro

            const { data } = await appAPI.post("/CreateLibro", form);

            dispatch(createNewBook(data));
            dispatch(openOrCloseModal());


        } catch (error) {

            console.error(error)
        }

    }

    const onSetActiveBook = (book) => {
        dispatch(setActiveBook({
            nombreLib: book.nombrelib,
            ...book
        }));
        dispatch(openOrCloseModal());
    }

    const onDeleteBook = async (payload) => {
        try {


            //await appAPI.delete(`/ListaLibro/${payload.libroid}`);
            dispatch(deleteBook(payload.libroid));

        } catch (error) {
            console.error(error)
        }
    }


    const onClearAllBook = () => {
        dispatch(clearAllBook());
    }

    //inventory
    const onGetInventory = async () => {

        try {

            const { data } = await appAPI.get(`/ListaInventario`);
            dispatch(getInventory(data));

        } catch (error) {
            console.error(error);
        }

    }

    const onSetInventory = async (form) => {

        try {


            if (form.inventarioid) {
                //update inventory
                const { libroId, codigo, estadoId, autenticidadid, inventarioid } = form;
                const { data } = await appAPI.put(`updateInventario/${inventarioid}`, { libroId, codigo, estadoId, autenticidadid });
                dispatch(updateInventory(data));
                dispatch(openOrCloseModal());
                return;
            }

            //create inventory
            const { data } = await appAPI.post("CreateInventario", form);
            dispatch(createNewInventory(data));
            dispatch(openOrCloseModal());

        } catch (error) {
            console.error(error)
        }
    }

    const onSetActiveInventory = (inventory) => {
        dispatch(setActiveInventory({
            ...inventory,
            estadoId: inventory.estadoid
        }));
        dispatch(openOrCloseModal());
    }

    const onDeleteInventory = async (payload) => {
        try {


            // await appAPI.delete(`/ListaInventario/${payload.id}`);
            dispatch(deleteInventory(payload.inventarioid));

        } catch (error) {
            console.error(error)
        }
    }

    const onClearInventory = () => {
        dispatch(clearAllInventory());
    }

    return {

        //states
        books,
        activeBook,
        listTypeBook,
        listInventory,
        activeInventory,
        listInventoryByBook,

        //methods
        onSetBook,
        onSetActiveBook,
        onGetBookById,
        onClearAllBook,
        onDeleteBook,
        onGetBooks,
        onGetTypeBooks,
        onGetInventory,
        onSetInventory,
        onSetActiveInventory,
        onDeleteInventory,
        onClearInventory
    }
}
