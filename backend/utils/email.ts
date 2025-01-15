import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ( from: string, subject:string, to:string, content:{
    heading:string,
    body: string
})=>{
    try {
        const { heading, body } = content;

        // Email template 
        const template = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <div style="background-color: #4CAF50; color: #ffffff; text-align: center; padding: 20px;">
                        <h1 style="margin: 0; font-size: 24px;">${heading}</h1>
                    </div>
                    <div style="padding: 20px; color: #333333; line-height: 1.6;">
                        <p>${body}</p>
                        <a href="#" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: #ffffff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center;">
                            View in ERP
                        </a>
                    </div>
                    <div style="text-align: center; padding: 10px; font-size: 12px; color: #777777; background-color: #f4f4f9;">
                        <p>&copy; ${new Date().getFullYear()}BizEdge ERP System. All Rights Reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    
        const { error } = await resend.emails.send({
            from: from,
            subject: subject,
            to: to,
            html: template
        })
    
        if(error){
            throw error;
        }

        console.log(`Email sent successfully`)
    } catch (error:any) {
        console.log(`Error sending emails : ${error.message}`);
        throw error;
    }
}

export default sendMail;