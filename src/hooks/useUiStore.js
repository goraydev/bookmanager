import { useDispatch, useSelector } from "react-redux"
import { clearMessage, openOrCloseModal, sendMessage } from "../store/ui/uiSlice";
import { clearAllBook } from "../store/book/bookSlice";

export const useUiStore = () => {


    const { modal, msg } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const calledModal = () => {

        dispatch(openOrCloseModal());
        dispatch(clearAllBook());

    }

    const onSendMessage = (msg) => {

        dispatch(sendMessage(msg));


        //Limpiamos el mensaje
        setTimeout(() => {

            dispatch(clearMessage());
        }, 2000);

    }



    return {
        //values
        modal,
        msg,


        //methoods
        calledModal,
        onSendMessage,

    }
}
