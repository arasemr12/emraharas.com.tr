import axios from "axios";
import {MongoClient, ObjectId} from "mongodb";

const url = process.env.DATABASE_URL;
const client = new MongoClient(url);

export default defineEventHandler(async(event) => {
    try {
        let {email,text,turnstile} = await readBody(event);
        if(!email || !text || !turnstile || email.length > 256 || text.length > 2048) return {success:false,message:"Too long or missing body!"};

        let d = await axios.post("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
            secret:process.env.TURNSTILE_SECRET_KEY,
            response:turnstile
        },{
            headers:{
                "Content-Type":"application/json"
            }
        });
        
        if(!d?.data?.success) return {success:false,message:"Invalid captcha!"};

        await client.connect();
        const db = client.db("emraharascomtr");
        const collection = db.collection('contacts');

        await collection.insertOne({
            _id: new ObjectId(),
            email,
            text,
            createdAt: new Date(),
        });

        await client.close();

        await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,{
            chat_id:process.env.TELEGRAM_CHANNEL_ID,
            text:"New contact form!",
            parse_mode:"HTML"
        });

        return {success:true};
    } catch (error) {
        return {success:false,message:error.message};
    }
});
