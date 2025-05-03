import { getOAuth2Client, deleteEvent } from '../googleCalendar';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { eventId } = req.body;

        if (!eventId) {
            return res.status(400).json({ message: 'Missing eventId' });
        }

        const oAuth2Client = getOAuth2Client();
        oAuth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });

        try {
            await deleteEvent(oAuth2Client, eventId);
            return res.status(200).json({ message: `🗑️ Event deleted: ${eventId}` });
        } catch (error) {
            console.error('Error deleting event:', error);
            return res.status(500).json({ message: 'Error deleting event' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
