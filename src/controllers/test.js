const testModel = require("../models/test")
const crypto = require("crypto")
const encryption = async (req, res) => {
    try {
        let data = req.body
        let { text } = data

        // encryption
        const algorithm = 'aes-256-cbc';
        const key = crypto.randomBytes("Atg-nodejs-program");
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        data.text = encrypted

        //Decryption
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        const savedData = await testModel.create(data)

        res.status(200).send({ status: true, message: savedData, decrypted:decrypted })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.encryption = encryption