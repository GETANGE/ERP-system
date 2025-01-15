import crypto from "crypto";
export const genarateResetToken = ()=>{

        const resetToken:number = crypto.randomInt(10000,99999);

        const passwordResetToken = crypto.createHash('sha256').update(resetToken.toString()).digest('hex');

        const passwordExpiresAt = Date.now()+ 10 * 60 * 1000

        return { resetToken, passwordExpiresAt, passwordResetToken }
}