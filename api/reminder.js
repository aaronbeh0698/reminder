import { getOAuth2Client, addEvent } from './googleCalendar';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, time } = req.body;

        // 初始化 Google OAuth
        const oAuth2Client = getOAuth2Client();

        // ⚠️ 這裡你要填入自己的 refresh_token
        oAuth2Client.setCredentials({
            refresh_token: 'process.env.GOOGLE_REFRESH_TOKEN',
        });

        // 呼叫 addEvent 建立日曆事件
        await addEvent(oAuth2Client, { title, time });

        res.status(200).json({
            message: `提醒已收到！標題: ${title}, 時間: ${time}（已加到 Google 日曆）`,
        });
    } else {
        res.status(405).json({ message: '僅支援 POST 方法' });
    }
}
