import { getOAuth2Client, addEvent } from '../googleCalendar';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, time } = req.body;

        // 初始化 Google OAuth
        const oAuth2Client = getOAuth2Client();

        // ✅ 用環境變數，不加引號
        oAuth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });

        try {
            // 呼叫 addEvent 建立日曆事件
            await addEvent(oAuth2Client, { title, time });

            res.status(200).json({
                message: `提醒已收到！標題: ${title}, 時間: ${time}（已加到 Google 日曆）`,
            });
        } catch (error) {
            console.error('發生錯誤:', error);
            res.status(500).json({ message: '建立日曆事件時發生錯誤' });
        }
    } else {
        res.status(405).json({ message: '僅支援 POST 方法' });
    }
}
