import axios from "axios";
import {MongoClient, ObjectId} from "mongodb";

const url = process.env.DATABASE_URL;
const client = new MongoClient(url);

export default defineEventHandler(async(event) => {
    try {
        let {email,text,turnstile} = await readBody(event);

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
        });

        await client.close();

        return {success:true};
    } catch (error) {
        return {success:false,message:error.message};
    }
});
