import { useDispatch, useSelector } from "react-redux"
import appAPI from "../API/appAPI";
import { checking, login, logout } from "../store/auth/authSlice";
import { useUiStore } from "./useUiStore";

export const useAuthStore = () => {


    const { status, message, user } = useSelector(state => state.auth);
    const { onSendMessage } = useUiStore();
    const dispatch = useDispatch();

    const onLogin = async (form) => {

        dispatch(checking());

        try {


            const { data } = await appAPI.get("login");
            const { usu, pwsd } = data.usuario;
            if (form.usu === usu && form.pwsd === pwsd) {

                localStorage.setItem("token", data.token);
                dispatch(login({ usu: data.usuario.usu, uid: data.usuario.usuarioId }));
                return;
            }

            dispatch(logout());
            onSendMessage("Usuario no existe");


        } catch (error) {
            console.error(error)
        }
    }

    const onLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
    }

    return {

        user,
        status,
        message,

        //methods
        onLogin,
        onLogout

    }
}
