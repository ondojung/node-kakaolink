import { shareClient } from '../client'

export class ShareClient{
    app_key:string;
    domain:string;
    constructor(app_key:string,domain:string){
        this.app_key = app_key
        this.domain = domain
    }
    async picker(room:string,template:any,type:string){
        const pickerRes = await shareClient.post('/picker/link',{
            app_key:this.app_key,
            ka:`sdk/2.7.2 os/javascript sdk_type/javascript lang/en-US device/Linux_x86_64 origin/${encodeURI(this.domain)}`,
            validation_action:type,
            validation_params:JSON.stringify({
              link_ver: '4.0',
              template_id: template.templateId,
              template_args: template.templateArgs,
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
            let channelData = body.chats.find((e:any) => e.title === room);
            const receiver = Buffer.from(JSON.stringify(channelData), 'utf-8').toString('base64');
            
            return {
                app_key: this.app_key,
                short_key: shortKey,
                _csrf: csrfToken,
                checksum: checksum,
                receiver: receiver
            }
        }
    }
    async send(room:string,template:any,type:string){
        const data = await this.picker(room,template,type)
        const sendRes = await shareClient.post('/picker/send',data,{
                headers:{
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
                }
        })
        console.log(sendRes.data)
    }
}