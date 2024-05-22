import Cookies from 'js-cookie';

export const isLogged = () => {
    let token = Cookies.get('token');
    return (token) ? true : false;
}

export const doLogin = (token: string, rememberPassword = false) => {
    if (rememberPassword) {
        Cookies.set('token', token, { expires: 365 });
    }
    else {
        Cookies.set('token', token);
    }
}