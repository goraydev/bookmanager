import { useDispatch, useSelector } from "react-redux"
import { openOrCloseModal } from "../store/ui/uiSlice";

export const useUiStore = () => {


    const { modal } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const calledModal = () => {

        dispatch(openOrCloseModal());

    }



    return {
        //values
        modal,


        //methoods
        calledModal

    }
}
