import { NextRequest, NextResponse } from "next/server";
import { JWT } from "google-auth-library";

// ── POST /api/campaign-leads ──────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, course } = body;

    if (!name || !email || !mobile || !course) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const SPREADSHEET_ID = process.env.GDRIVE_SPREADSHEET_ID;
    const CLIENT_EMAIL = process.env.GDRIVE_CLIENT_EMAIL;
    const PRIVATE_KEY = process.env.GDRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
      console.warn("Google Drive credentials or Spreadsheet ID not configured.");
      // In development, if not configured, we just return success to not block UI testing
      return NextResponse.json({ success: true, message: "Simulated success (No credentials)" });
    }

    const client = new JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const { token } = await client.getAccessToken();
    if (!token) throw new Error("Failed to retrieve access token");

    // Append to Google Sheet
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:E:append?valueInputOption=USER_ENTERED`;
    
    // We log the date locally
    const timestamp = new Date().toISOString();
    
    const response = await fetch(url, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        values: [
          [timestamp, name, email, mobile, course]
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error("Google Sheets API Error:", errData);
      throw new Error(`Google API responded with status ${response.status} - ${errData}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[POST /api/campaign-leads]", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
  }
}
