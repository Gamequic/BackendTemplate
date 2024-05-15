require('dotenv').config();

const config = {
    isProd: JSON.parse(process.env.NODE_PROC) || false,
    debugging: JSON.parse(process.env.DEBUGGING) || false,
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL,
    saltRounds: process.env.SALTROUNDS, 
    authSecret: process.env.AUTHSECRET,
    emailService: process.env.EMAILSERVICE,
    email: process.env.EMAIL,
    emailpassword: process.env.EMAILPASSWORD,
    ipAddress: process.env.IPADDRESS,
};

module.exports = { config };
