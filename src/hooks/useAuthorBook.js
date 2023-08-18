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
            dispatch(getAuthors(data.resultado));

        } catch (error) {
            console.error(error);
        }

    }

    const onGetTypeAuthors = async () => {
        try {

            const { data } = await appAPI.get("/ListaTipoAutores");
            dispatch(getTypeAuthors(data.resultado));

        } catch (error) {
            console.error(error)
        }
    }


    const onSetAuhor = async (formAuthor) => {
        try {

            if (formAuthor.autorId) {
                //actualizar author
                await appAPI.put(`/updateAutor/${formAuthor.autorId}`, formAuthor);
                dispatch(updateAuthor({ ...formAuthor }));
                dispatch(openOrCloseModal());
                return;
            }


            //crear nuevo author
            const { data } = await appAPI.post('/CreateAutor', formAuthor);
            const { autorid, nombreautor, tipoautorid } = data.resultado;

            dispatch(createNewAuthor({ autorid, nombreAutor: nombreautor, tipoAutorId: tipoautorid }));
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
