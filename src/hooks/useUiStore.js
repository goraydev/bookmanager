import { useDispatch, useSelector } from "react-redux"
import { openOrCloseModalBook } from "../store/ui/uiSlice";

export const useUiStore = () => {


    const { modalBook } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const calledModalBook = () => {

        dispatch(openOrCloseModalBook());

    }



    return {
        //values
        modalBook,


        //methoods
        calledModalBook

    }
}
