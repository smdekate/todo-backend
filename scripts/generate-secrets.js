import crypto from 'crypto';

const generateSecret = (length = 32) => {
    return crypto.randomBytes(length).toString('hex');
};

console.log('\nGenerated Secrets for JWT Tokens:');
console.log('\nACCESS_TOKEN_SECRET=' + generateSecret(32));
console.log('REFRESH_TOKEN_SECRET=' + generateSecret(32));
console.log('\nAdd these to your .env file\n');
