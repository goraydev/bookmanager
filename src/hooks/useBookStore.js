import { useDispatch, useSelector } from "react-redux"
import {
    clearAllBook,
    createNewBook,
    createNewInventory,
    deleteBook,
    deleteInventory,
    getBooks,
    getInventoryByIdBook,
    getTypeBooks,
    setActiveBook,
    setActiveInventory,
    updateBook,
    updateInventory
} from "../store/book/bookSlice";
import { openOrCloseModal } from "../store/ui/uiSlice";
import appAPI from "../API/appAPI";

export const useBookStore = () => {


    const { activeBook, books, listTypeBook, listInventory, activeInventory } = useSelector(state => state.book);
    const dispatch = useDispatch();


    const onGetBooks = async () => {

        try {

            const { data } = await appAPI.get("/ListaLibro");
            dispatch(getBooks(data.resultado));

        } catch (error) {
            console.error(error);
        }
    }


    const onGetTypeBooks = async () => {
        try {

            const { data } = await appAPI.get("/ListaTipoLibro");
            dispatch(getTypeBooks(data.resultado));
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

            if (form.libroid) {

                //actualizar libro
                const { nombreLib, tipoId, edicion, año, editorial, autor } = form;
                await appAPI.put(`UpdateLibro/${form.libroid}`, { nombreLib, tipoId, edicion, año, editorial, autor });
                dispatch(updateBook({ ...form, nombrelib: nombreLib }));
                dispatch(openOrCloseModal());
                return;
            }

            //crear libro

            const { data } = await appAPI.post("/CreateLibro", form);

            dispatch(createNewBook(data.resultado));
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
                //actualizar libro
                await appAPI.put(`ListaInventario/${form.id}`, form);
                dispatch(updateInventory({ ...form }));
                dispatch(openOrCloseModal());
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

    const onSetActiveInventory = (inventory) => {
        dispatch(setActiveInventory(inventory));
        dispatch(openOrCloseModal());
    }

    const onDeleteInventory = async (payload) => {
        try {


            await appAPI.delete(`/ListaInventario/${payload.id}`);
            dispatch(deleteInventory(payload.id));

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
        onSetInventory,
        onSetActiveInventory,
        onDeleteInventory,
    }
}
