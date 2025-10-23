import customAxios from '../customAxios/authAxios';

import { useDispatch } from 'react-redux';
import { addUserDetails,removeUserDetails } from '../redux/slices/userDetails';

const useRefreshToken = () => {

    const dispatch = useDispatch();
    
    const refresh = async() => {
            
        try {
            
            const response = await customAxios.get('/refresh_token',{
                withCredentials:true,
            });

            dispatch(addUserDetails(response.data));

            return response.data.accessToken;

        } catch (error) {
            if(error.response.status === 401){
                dispatch(removeUserDetails());
            }

        }

    }

    return refresh;

}

export default useRefreshToken;