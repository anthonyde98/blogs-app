import Axios from 'axios';
import { api } from './apiRoute';

export const user = Axios.create({
    baseURL: `${api}auth/`
})