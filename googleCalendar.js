import { google } from 'googleapis';

// 建立一個 OAuth2 客戶端
export function getOAuth2Client() {
    const CLIENT_ID = '284651525389-hq39oo1b1foskmnr1a7em4f9vti7595p.apps.googleusercontent.com';
    const CLIENT_SECRET = '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ET';
    const REDIRECT_URI = 'http://localhost';

    return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
}

// 加一個日曆事件
export async function addEvent(auth, { title, time }) {
    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
        summary: title,
        start: {
            dateTime: time,
            timeZone: 'Asia/Kuala_Lumpur',  // 根據你的位置調整時區
        },
        end: {
            dateTime: time,  // 這裡暫時設為同一時間，你之後可以加長一點時間
            timeZone: 'Asia/Kuala_Lumpur',
        },
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        console.log('✅ Event created: %s', response.data.htmlLink);
    } catch (err) {
        console.error('❌ Error creating event:', err);
    }
}
