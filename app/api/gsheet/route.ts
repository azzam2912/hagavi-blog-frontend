
import { NextResponse, NextRequest } from "next/server";
import { google } from "googleapis";

type SheetForm = {
    "title": string
    "content": string
}

interface Data {
    message?: string;
    data?: any;
}

export async function POST(request: NextRequest, res: Response) {
    // if(req.method !== 'POST') {
    //     return res.status(485).send({message: 'Only POST requests are allowed'});
    // }
    const body = await request.json();
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets',
            ]
        });
        const sheets = google.sheets({
            auth,
            version: 'v4',
        });
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'A1:B1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [body.title, body.content],
                ]
            }
        });
        return NextResponse.json({data: response.data})
    } catch(e) {
        console.error(e);
        return NextResponse.json({message: "error " + e})
    }
    
}