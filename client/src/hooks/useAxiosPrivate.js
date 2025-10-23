import authAxios from '../customAxios/authAxios';
import {useEffect} from 'react';
import useRefreshToken from './useRefreshToken';
import { useSelector } from "react-redux";

const useAxiosPrivate = () => {

    const refresh = useRefreshToken();

    const { user } = useSelector((state) => state.auth);
    // console.log('user from axios',user);
    useEffect(()=>{

        const requestIntercept = authAxios.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
                }
                return config;
            },(error)=>Promise.reject(error)
        );

        const responseIntercept = authAxios.interceptors.response.use(
            response => response,
            async(error) => {

                const prevRequest = error?.config;

                if(error?.response?.status === 403 && !prevRequest?.sent){
                    
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    
                    return authAxios(prevRequest);
                }

                return Promise.reject(error)
            }
        )

        return () => {
            authAxios.interceptors.request.eject(requestIntercept);
            authAxios.interceptors.response.eject(responseIntercept);
        }

    },[user,refresh])

    return authAxios;
}

export default useAxiosPrivate;