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
export const loginClient = wrapper(axios.create({
  baseURL: 'https://accounts.kakao.com',
  jar: cookieJar,
  withCredentials: true,
}));

export const tiaraClient = wrapper(axios.create({
  baseURL: 'https://stat.tiara.kakao.com',
  jar: cookieJar,
  withCredentials: true,
}));

export const shareClient = wrapper(axios.create({
  baseURL: 'https://sharer.kakao.com',
  jar: cookieJar,
  withCredentials: true,
}));