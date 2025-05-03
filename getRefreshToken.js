import { google } from 'googleapis';
import readline from 'readline';

// 填入你的憑證
const CLIENT_ID = '284651525389-hq39oo1b1foskmnr1a7em4f9vti7595p.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

// 要求的權限
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// 產生授權網址
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
});

console.log('請打開這個網址進行授權：', authUrl);

// 等待使用者輸入 code
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('請輸入從網址取得的 code：', async (code) => {
    rl.close();
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('\n✅ 取得的 token：');
    console.log(tokens);
});
