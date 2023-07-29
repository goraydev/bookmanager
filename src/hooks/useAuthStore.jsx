import { useSelector } from "react-redux"

export const useAuthStore = () => {


    const { status, errorMessage } = useSelector(state => state.auth);


    return {

        status,
        errorMessage
    }
}
