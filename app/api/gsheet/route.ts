
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

const GOOGLE_SERVICE_KEY = "ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAiaGFnYXZpLWJsb2ciLAogICJwcml2YXRlX2tleV9pZCI6ICJkMWUzOWQwMjY2OTE2ZTZmYWE4NzA0OGM3NDFkZDE4OGM4OGNkZDUzIiwKICAicHJpdmF0ZV9rZXkiOiAiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdlFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLY3dnZ1NqQWdFQUFvSUJBUUNHd0RRaWtpZ2NueFJUXG41MEgrMjRHcE9kTmxMVS9HVktIakYxS3psMkZYZW9LSGQ3TFNiVHV6S1B2Vm11NFQ1UFRDK1ZOcjBwWEhXcmN0XG5odFc1dERWbDFITG9kYzZlR2huUjh5SW5qdTZFemx5N2MvcS9vNVpobktZUWNrNlV1cUZWYjJJajFacUZhc3NYXG5zdlU0QVo5bHdGYXM1c0o5Z1dJdUFZTzhYNVh3L0VSQ25EcXJFTHBhZSt5UVFqaWhRWWZOdVRZWVVnYnZzRVZ4XG5SYmxKWXV0dXJVSDdRczVWQ0w5RnlJcjM4cHpiaFhHNlJhNnVXNzIyRjU1Vzkwbmt5dGUxUk9BQ1VHTTBnVDd4XG5ZcFFuVENEc0x4VWVEdDlFak5PZk96dmpqMnUrQkpWZURBdzlWd2thRW84LzR1cWZxNnZHekVzWUhHVEJHUVFkXG43UTlxU0dRNUFnTUJBQUVDZ2dFQU1hZW1Ebzg1Uk1MQ0pPRDFDc3Nzam9XR2hxUVozNFhVV2ZDQVF6bW5YeXIvXG42cGVMUjh1RTBsSnA2cDY2Mkkzb08ralFlczBROEhOWFNPbUUzSGV4cmFLSjdXdHNCZ3FzTlJlWklHYWxNajh4XG5JTXB1UGl3MEFDaFBjWVFOdlBUQSt0Q2VvNEhVL1JFTFllSktScWNpYThaaXFqZ210MFQwUHV2RDlhaHJnbStLXG5mWWZEbTArZWlWWU4wVXcrN0FlRFdCWnZveUN1ZlRtNnUyMWNGVjI3UUtKbkxkN1VZK1lvcUdmV2J3bWloTGNHXG5PTURBMVdtSkxpN1ZpaWY5NUxsZ0xSbXhocm5nb2FQZU1sL3d3SktRSmpMNVZIK2pFQ1VEWE1QY3BrSDdXS1pvXG5RdjNCT01FTHhvOEQwQkd4Ui84aktDTy9hZm1VVWVsaUxuL0NHT3FFbVFLQmdRQzV4d3BjNmVTcEZ3NHZ1Q2FUXG56QXlwR2xiOXNTZHNMNjZhWng1dTg0Q0h6L3JKWG8rUXZ4QTFtTENMVkJWd2IxeXF0ZWtRVVFwUWVPSzdZaDZyXG5oeWY2dXRJck1MY0pwd0JYTE04VTJtdzJOOFZUTnFTdVhBa01IdE1KWU5oY1dZREJmRkVNNm5CazRVNTIzUTJyXG5hejM4R2I1aHhkKzQ4L04yaGs0NTExTzR5d0tCZ1FDNXI0SlZ6YkJYVFFGVFd4Q1lqZjBESzUycm5PZzZrQmNmXG5zaEFrN2ZXM3ZhemEycFhWRHRvbXJ2bXhseTlsSVltSEx3ZGFiM0RjZTVtNGV3MW9mS081RHg3SmErZXNLQUtIXG5hRlIwaThqb0FSQTdPSDlxNys4cXJuRTJ2OTl1UW5nU254TXJXa0U2SGFSS1FwZCs2cVVvRlVvS3JFOE1rVHg5XG56SVJqK1ExcWl3S0JnUUNFdllaWEN6dzU0V0pla0Zyb0lkVXVBc2NEYjlBMlNmK2REVzgrWWJpRjBnSmtYYStCXG5BalBueDlqbFJNZ28xVGxHTk1KNXlSM3dqOStaZWl0bDdpV1B6bXNiTnl5aHRmVFZWUXdGMzJlUWVkc0JjVHJMXG41ckVFT3dZWlhseFo2QTNLc2pRTFlYdTdhUTB5ZXhJb1dIRXFyNDVMdUNINXVqMU1nL3hpOGNzOWJ3S0JnR0x6XG5NRlZoSXhPaXFZNHQvUTRPdkVHd1FIbHZTQ0hOSDBWNHNqbTd4VEdCRmxnYUc3WktEOTZGWi9KSFNxNXR6TWdKXG5PN1hwcFE4Wm5yVThmY3lzZnVMak45akdjOUsrRDNyeEVmQjVmVHFGTm8wWWNtNGVKaWxzaEZCVXQxQWVnN1lJXG5wMEoyK2tOcUFGN0NWZEVBWWJxV2ZicHFVRVcyTDdJcUJuTHdDVUk1QW9HQVdlL005MkNMN2ZtalNDdTN6MFgvXG5NMjMyaUlBWG1uWDNUcTBlWlJYNWNmQUljTFArM2ZlRElTOFZjZEFMekROM0lnL1QxOFdNY05EVVJKczZ6aEhJXG5sQnQ4OXJOUS9sSnlPK3hLWGZzam1FZVJvbDJkN0xReEtEUFVjRGZ5STJXUXRrMGRPbHhLdS9ocDUzRExmT3QxXG5LWVZIeThyZ2l0djFUeVlMVGxUWUNPYz1cbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsCiAgImNsaWVudF9lbWFpbCI6ICJoYWdhdmktc2hlZXRzLW5leHRqc0BoYWdhdmktYmxvZy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgImNsaWVudF9pZCI6ICIxMDYyOTQ0MjA3MzA2OTc2NTIzMTQiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L2hhZ2F2aS1zaGVldHMtbmV4dGpzJTQwaGFnYXZpLWJsb2cuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLAogICJ1bml2ZXJzZV9kb21haW4iOiAiZ29vZ2xlYXBpcy5jb20iCn0=";
const GOOGLE_SHEET_ID = "1_2g80rpJMl693ycJPVKGgWyTyqtCl2FK2Bmyxt5XReA"

const credential = JSON.parse(
    Buffer.from(GOOGLE_SERVICE_KEY as string, "base64").toString()
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
            spreadsheetId: GOOGLE_SHEET_ID,
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
            spreadsheetId: GOOGLE_SHEET_ID,
            range: 'A2:B100'
        });
        return NextResponse.json({data: response.data})
    } catch(e) {
        console.error(e);
        return NextResponse.json({message: "error " + e})
    }
}