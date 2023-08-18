import { useDispatch, useSelector } from "react-redux"
import { clearMessage, closeModal, openOrCloseModal, sendMessage } from "../store/ui/uiSlice";
import { clearAllBook, clearAllInventory } from "../store/book/bookSlice";

export const useUiStore = () => {


    const { modal, msg } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const calledModal = () => {

        dispatch(openOrCloseModal());
        dispatch(clearAllBook());
        dispatch(clearAllInventory());

    }

    const onCloseModal = () => {
        dispatch(closeModal());
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
        onCloseModal

    }
}
