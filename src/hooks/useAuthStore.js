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


            const { data } = await appAPI.post("/Login", form);
            localStorage.setItem("token", data.token);
            const { usu, usuarioid, tipousuarioid } = data.usuario;
            dispatch(login({ usu: usu, uid: usuarioid, tipousuarioid }));


        } catch (error) {

            dispatch(logout());
            onSendMessage("Usuario no existe");
            console.error(error)
        }
    }

    const onCreateUser = async (form) => {

        try {

            
            await appAPI.post("/Register", form);


        } catch (error) {
            console.error(error)
        }
    }

    const checkSession = async () => {

        const token = localStorage.getItem("token");
        if (!token) return dispatch(logout());

        try {

            const { data } = await appAPI.get("/authStatus");
            localStorage.getItem("token");
            dispatch(login({ usu: data.userName, uid: data.userId, tipousuarioid: Number(data.userType) }));


        } catch (error) {
            localStorage.removeItem("token");
            dispatch(logout());
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
        onLogout,
        onCreateUser,
        checkSession,
    }
}
