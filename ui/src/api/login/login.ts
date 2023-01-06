import request from '../../utils/request';
import { loginForm } from '@/types/login/type';

export const login = (params: loginForm) => {
    return request.get('/enter',params)
}