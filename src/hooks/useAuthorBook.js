import { useDispatch, useSelector } from "react-redux"
import appAPI from "../API/appAPI";
import { getAuthors } from "../store/author/authorSlice";

export const useAuthorBook = () => {

    const { listAuthors, typeAuthors } = useSelector(state => state.authors);
    const dispatch = useDispatch();


    const onGetListAuthors = async () => {

        try {

            const { data } = await appAPI.get("/ListaAutores");
            dispatch(getAuthors(data));

        } catch (error) {
            console.error(error);
        }

    }


    return {

        //values
        listAuthors,
        typeAuthors,

        //methos
        onGetListAuthors
    }
}
