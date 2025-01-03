const CryptoJs = require('../CryptoJs')
import * as cheerio from 'cheerio';
import { TiaraInfo } from '../tiara'
import { loginClient, tiaraClient, shareClient} from '../client'
import logger from '../util/logger'

export class KakaoClient{
    id:string;
    passwd:string;
    intervalID:any;
    timerID:any;
    
    constructor(id:string,passwd:string) {
        this.id = id
        this.passwd = passwd
        this.login(id,passwd)
    }
    
    private async login(id:string,passwd:string){
        const NextData:any = await this.NextData()
        const key = NextData.p
        const encrypted = CryptoJs.AES.encrypt(this.passwd,key).toString()
        const authRes = await loginClient.post('/api/v2/login/authenticate.json',{
          _csrf: NextData._csrf,
          loginId: this.id,
          password: encrypted,
          staySignedIn: true,
          saveSignedIn: true,
          loginKey: this.id,
          activeSso: true,
          loginUrl: "/login?continue=https%3A%2F%2Fwww.daum.net",
          k: true
        },{
            headers:{
                'Connection':'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Referer': 'https://accounts.kakao.com/login/?continue=https%3A%2F%2Fwww.daum.net',
            }
        })
        
        const sendTmsRes = await loginClient.post('/api/v2/two_step_verification/send_tms_for_login.json',{
          _csrf: NextData._csrf
        },{
            headers:{
                'Connection':'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Referer': 'https://accounts.kakao.com/login/?continue=https%3A%2F%2Fwww.daum.net'
            }
        })
        const token = sendTmsRes.data.token
        logger.i('Waiting for secondary authentication...')
        this.intervalID = setInterval(async()=>await this.checkVerify(NextData._csrf,token),1000)
        this.timerID = setTimeout(() => {
            clearInterval(this.intervalID);
            logger.w('인증 요청이 만료되었습니다.');
        }, 5 * 60 * 1000);
    }
    
    async NextData(){
        const loginRes = await loginClient.get('/login/?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount#login',{
        headers:{
            'Connection':'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            
            }
        })
        const tiaraRes = await tiaraClient.get(`https://stat.tiara.kakao.com/track?d=${encodeURI(JSON.stringify(TiaraInfo))}`,{
            headers:{
            'Connection':'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            
            }
        })
        const html = loginRes.data
        
        const $ = cheerio.load(html)
        const __NEXT_DATA__ = $(`script#__NEXT_DATA__`).html()
    
        if(__NEXT_DATA__){
            return JSON.parse(__NEXT_DATA__).props.pageProps.pageContext.commonContext
        }else{
            throw new Error('Login NextData Omission!')
        }
    }
    
    private async checkVerify(_csrf:string,token:string){
    const verifyTmsRes = await loginClient.post('/api/v2/two_step_verification/verify_tms_for_login.json',{
          _csrf: _csrf,
          token: token,
          isRememberBrowser: "true"
        },{
            headers:{
                'Connection':'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Content-Type': 'application/json',
                'Referer': 'https://accounts.kakao.com/login/?continue=https%3A%2F%2Fwww.daum.net',
            }
        })
        if(verifyTmsRes.data.status == 0){
            clearInterval(this.intervalID)
            clearInterval(this.timerID)
            logger.s('Login completed!')
        }
    }
}