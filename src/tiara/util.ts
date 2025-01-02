const It = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
export class TiaraUtil{
        static generateRandomUUIDWithDateTime() {
            var t = ["w-"];
            return t.push(this.shortenID(12)),
            t.push("_"),
            t.push(this.currentTimeStamp()),
            t.join("")
        }
        static generateRandomUUIDWithDateNumber() {
            var t = ["w-"];
            return t.push(this.shortenID(12)),
            t.push("_"),
            t.push(this.currentTimeStamp().substring(0, 6)),
            t.push(this.randomNumericString(9)),
            t.join("")
        }
        static currentTimeStamp() {
            var t = new Date;
            return t.setHours(t.getHours() + 9),
            t.toISOString().replace(/T|Z|-|:|\./g, "").substring(2)
        }
        static randomNumericString(t:number) {
            for (var e:number[] = [], a = 0; a < t; a++) {
                var n = Math.floor(10 * Math.random());
                e.push(n)
            }
            return e.join("")
        }
        static shortenID(t:number) {
            for (var e:string[] = [], a = 0; a < t; a++) {
                var n = It[Math.floor(Math.random() * It.length)];
                e.push(n)
            }
            return e.join("")
        }
}
const tuid = TiaraUtil.generateRandomUUIDWithDateTime();
const uuid = TiaraUtil.generateRandomUUIDWithDateNumber();
export const TiaraInfo = {
    sdk:{
        type:'WEB',
        version:"1.1.34"
    },
    env:{
        screen:'800X1280',
        tz:'+9',
        cke:'Y',
        uadata:{
            fullVersionList:[{
                brand:'Not-A.Brand',
                version:'99.0.0.0'
            },{
                brand:'Chromium',
                version:'124.0.6327.4'
            }],
            mobile:false,
            model:'SM-T583',
            platform:'Android',
            platformVersion:'8.0.0'
        }},
        common:{
            svcdomain:'accounts.kakao.com',
            deployment:'production',
            url:'https://accounts.kakao.com/login/',
            section:'login',
            page:'page-login'
        },
        etc:{
            client_info:{
                tuid,
                tsid: tuid,
                uuid,
                suid: uuid,
                isuid: TiaraUtil.generateRandomUUIDWithDateNumber(),
                client_timestamp: Date.now()
            }},
            action:{
                type:'Pageview',
                name:'page-login',
                kind:''
            }}