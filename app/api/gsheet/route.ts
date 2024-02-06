
import { NextResponse, NextRequest } from "next/server";
import { google } from "googleapis";

type SheetForm = {
    title: string
    content: string
}

interface Data {
    message?: string;
    data?: any;
}

const credential = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY as string, "base64").toString()
)

async function prepareSheets() {
    const auth = await new google.auth.GoogleAuth({
        credentials: {
            client_email: credential.client_email,
            private_key: credential.private_key
        },
        scopes: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.readonly',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/spreadsheets.readonly',
        ]
    });
    const sheets = await google.sheets({
        auth,
        version: 'v4',
    });
    return sheets;
}

export async function POST(request: NextRequest, res: Response) {
    const body = await request.json() as SheetForm;
    try {
        const sheets = await prepareSheets();
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

export async function GET(request: NextRequest) {
    try {
        const sheets = await prepareSheets();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'A2:B100'
        });
        return NextResponse.json({data: response.data})
    } catch(e) {
        console.error(e);
        return NextResponse.json({message: "error " + e})
    }
}