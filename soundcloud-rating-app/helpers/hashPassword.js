const crypto = require('crypto');

const hashPassword = (password, secret)=>{
    const hash = crypto.createHmac('sha256', secret)
                       .update(password)
                       .digest('hex');
    return hash
}
let secret = String(Math.random() * 100)

console.log(hashPassword('aldi',secret))
module.exports = hashPassword