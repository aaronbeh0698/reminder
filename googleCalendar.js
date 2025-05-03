import { google } from 'googleapis';

// 建立一個 OAuth2 客戶端
export function getOAuth2Client() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI  // 這個可以直接寫 'http://localhost' 也可以用 env
    );
    return oAuth2Client;
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
