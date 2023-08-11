import { useDispatch, useSelector } from "react-redux"
import appAPI from "../API/appAPI";
import { createNewAuthor, getAuthors, getTypeAuthors, updateAuthor } from "../store/author/authorSlice";
import { openOrCloseModal } from "../store/ui/uiSlice";

export const useAuthorBook = () => {

    const { listAuthors, typeAuthors, activeAuthorBook } = useSelector(state => state.authors);
    const dispatch = useDispatch();


    const onGetListAuthors = async () => {

        try {

            const { data } = await appAPI.get("/ListaAutores");
            dispatch(getAuthors(data));

        } catch (error) {
            console.error(error);
        }

    }

    const onGetTypeAuthors = async () => {
        try {

            const { data } = await appAPI.get("/ListaTipoAutores");
            dispatch(getTypeAuthors(data));

        } catch (error) {
            console.error(error)
        }
    }


    const onSetAuhor = async (formAuthor) => {
        try {

            if (formAuthor.id) {
                //actualizar author
                await appAPI.put(`ListaAutores/${formAuthor.id}`, formAuthor);
                dispatch(updateAuthor({ ...formAuthor }));
                dispatch(openOrCloseModal());
                return;
            }


            //crear nuevo author
            const { data } = await appAPI.post('ListaAutores', formAuthor);

            dispatch(createNewAuthor(data));
            dispatch(openOrCloseModal());




        } catch (error) {
            console.error(error)
        }
    }

    const onSetActiveAuthor = (authorBook) => {
        dispatch(setActiveBook(authorBook));
        dispatch(openOrCloseModal());
    }

    const onDeleteAuthor = async (payload) => {
        try {


            await appAPI.delete(`/ListaAutores/${payload.id}`);
            dispatch(deleteBook(payload.id));

        } catch (error) {
            console.error(error)
        }
    }



    return {

        //values
        listAuthors,
        typeAuthors,
        activeAuthorBook,

        //methos
        onSetActiveAuthor,
        onSetAuhor,
        onDeleteAuthor,
        onGetListAuthors,
        onGetTypeAuthors,
    }
}
