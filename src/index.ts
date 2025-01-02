const CryptoJs = require('./CryptoJs')
import logger from './util/logger'
import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar, Cookie } from 'tough-cookie';
import * as cheerio from 'cheerio';
import { TiaraInfo } from './tiara'


const url = 'https://accounts.kakao.com/login/?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount#login'
const passwd = 'tjgkdus0207*'

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
const loginClient = wrapper(axios.create({
  baseURL: 'https://accounts.kakao.com',
  jar: cookieJar,
  withCredentials: true,
}));
const tiaraClient = wrapper(axios.create({
  baseURL: 'https://stat.tiara.kakao.com',
  jar: cookieJar,
  withCredentials: true,
}));
const shareClient = wrapper(axios.create({
  baseURL: 'https://sharer.kakao.com',
  jar: cookieJar,
  withCredentials: true,
}));
let intervalID:any;
let timerID:any;

async function setCookies(){
    const loginRes = await loginClient.get(url,{
        headers:{
            'Accept':'*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language':'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection':'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            
        }
    })
    const tiaraRes = await tiaraClient.get(`https://stat.tiara.kakao.com/track?d=${encodeURI(JSON.stringify(TiaraInfo))}`,{
        headers:{
            'Accept':'*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language':'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection':'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            
        }
    })
    const html = loginRes.data
    
    const $ = cheerio.load(html)
    const __NEXT_DATA__ = $(`script#__NEXT_DATA__`).html()

    if(__NEXT_DATA__){
        return JSON.parse(__NEXT_DATA__).props.pageProps.pageContext.commonContext
    }
}
async function checkVerify(_csrf:string,token:string){
    const verifyTmsRes = await loginClient.post('/api/v2/two_step_verification/verify_tms_for_login.json',{
          _csrf: _csrf,
          token: token,
          isRememberBrowser: "true"
    },{
        headers:{
            'Accept':'*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language':'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection':'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Content-Type': 'application/json',
            'Referer': 'https://accounts.kakao.com/login/?continue=https%3A%2F%2Fwww.daum.net',
            'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
            'sec-ch-ua-full-version-list': '"Not-A.Brand";v="99.0.0.0", "Chromium";v="124.0.6327.4"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '"SM-T583"',
            'sec-ch-ua-platform': "Android",
            'sec-ch-ua-platform-version': '"8.0.0"'
        }
    })
    if(verifyTmsRes.data.status == 0){
        clearInterval(intervalID)
        clearInterval(timerID)
        logger.s('Login completed!')
        sendLink()
    }
}
//status=-451 미인증
//status = 0 인증완료

(async () => {
    const NextData = await setCookies()
    const key = NextData.p
    const encrypted = CryptoJs.AES.encrypt(passwd,key).toString()
    const authRes = await loginClient.post('/api/v2/login/authenticate.json',{
          _csrf: NextData._csrf,
          loginId: "seohayeon.kr@gmail.com",
          password: encrypted,
          staySignedIn: true,
          saveSignedIn: true,
          loginKey: "seohayeon.kr@gmail.com",
          activeSso: true,
          loginUrl: "/login?continue=https%3A%2F%2Fwww.daum.net",
          k: true
    },{
        headers:{
            'Accept':'*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language':'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection':'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Content-Type': 'application/json',
            'Referer': 'https://accounts.kakao.com/login/?continue=https%3A%2F%2Fwww.daum.net',
            'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
            'sec-ch-ua-full-version-list': '"Not-A.Brand";v="99.0.0.0", "Chromium";v="124.0.6327.4"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '"SM-T583"',
            'sec-ch-ua-platform': "Android",
            'sec-ch-ua-platform-version': '"8.0.0"'
            
            
        }
    })
    const sendTmsRes = await loginClient.post('/api/v2/two_step_verification/send_tms_for_login.json',{
          _csrf: NextData._csrf
    },{
        headers:{
            'Accept':'*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language':'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection':'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Content-Type': 'application/json',
            'Referer': 'https://accounts.kakao.com/login/?continue=https%3A%2F%2Fwww.daum.net',
            'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
            'sec-ch-ua-full-version-list': '"Not-A.Brand";v="99.0.0.0", "Chromium";v="124.0.6327.4"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '"SM-T583"',
            'sec-ch-ua-platform': "Android",
            'sec-ch-ua-platform-version': '"8.0.0"'
            
            
        }
    })
    const token = sendTmsRes.data.token
    logger.i('Waiting for secondary authentication...')
    intervalID = setInterval(async()=>await checkVerify(NextData._csrf,token),1000)
    timerID = setTimeout(() => {
        clearInterval(intervalID);
        logger.w('인증 요청이 만료되었습니다.');
    }, 5 * 60 * 1000);
})()

async function sendLink(){
    try{
        const pickerRes = await shareClient.post('/picker/link',{
            app_key:'0b7ff75f1215e1ce21c482df9c48b848',
            ka:`sdk/2.7.2 os/javascript sdk_type/javascript lang/en-US device/Linux_x86_64 origin/${encodeURI('https://ondojung.mycafe24.com')}`,
            validation_action:'custom',
            validation_params:JSON.stringify({
              link_ver: '4.0',
              template_id: 115564,
              template_args: {},
            })
        },{
            headers:{
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            }
        })
        
        if(pickerRes.data){
            const serverDataMatch = pickerRes.data.match(/serverData = "(.*)"/);
            const serverData = JSON.parse(Buffer.from(serverDataMatch[1], 'base64').toString('utf-8'))
            const body = serverData.data
            const shortKey = body.shortKey
            const csrfToken = body.csrfToken
            const checksum =  body.checksum
            let channelData = body.chats.find((e:any) => e.title === '데이지');
            const receiver = Buffer.from(JSON.stringify(channelData), 'utf-8').toString('base64');
            
            const sendRes = await shareClient.post('/picker/send',{
                app_key: '0b7ff75f1215e1ce21c482df9c48b848',
                short_key: shortKey,
                _csrf: csrfToken,
                checksum: checksum,
                receiver: receiver
            },{
                headers:{
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
                }
            })
            console.log(sendRes.data)
        }
    }catch(e:any){
        console.log(e)
    }
}