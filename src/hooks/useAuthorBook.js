import { useDispatch, useSelector } from "react-redux"
import appAPI from "../API/appAPI";
import { createNewAuthor, deleteAuthor, getAuthors, getTypeAuthors, setActiveAuthorBook, updateAuthor } from "../store/author/authorSlice";
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

            if (formAuthor.autorID) {
                //actualizar author
                const { data } = await appAPI.put(`/updateAutor/${formAuthor.autorID}`, formAuthor);
                dispatch(updateAuthor(data));
                dispatch(openOrCloseModal());
                return;
            }


            //crear nuevo author
            const { data } = await appAPI.post('/CreateAutor', formAuthor);
            const { autorID, nombreautor, tipoautor, tipoautorid } = data;

            dispatch(createNewAuthor({ autorid: autorID, nombreautor, tipoAutorId: tipoautorid, tipoautor }));
            dispatch(openOrCloseModal());




        } catch (error) {
            console.error(error)
        }
    }

    const onSetActiveAuthor = (authorBook) => {
        dispatch(setActiveAuthorBook(authorBook));
        dispatch(openOrCloseModal());
    }

    const onDeleteAuthor = async (payload) => {
        try {


            //await appAPI.delete(`/ListaAutores/${payload.id}`);
            dispatch(deleteAuthor(payload.autorId));

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
