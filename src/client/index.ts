import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar, Cookie } from 'tough-cookie';

const cookies = [
    '__T_SECURE=1; Domain=.accounts.kakao.com; Path=/login',
    '__T_=1; Domain=.accounts.kakao.com; Path=/login',
];
const cookieJar = new CookieJar();
cookies.forEach(cookie => {
    cookieJar.setCookie(cookie, 'https://accounts.kakao.com/', (err, addedCookie) => {
        if (err) {
            //console.error('쿠키 추가 실패:', err);
        } else {
            //console.log('쿠키 추가 완료:', addedCookie);
        }
    });
});

export default function client(url:string){
    return wrapper(axios.create({
        baseURL: url,
        jar: cookieJar,
        withCredentials: true,
    }));
}