import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { mobile, otp } = await req.json();

    if (!mobile || !otp) {
      return NextResponse.json({ error: 'Mobile number and OTP are required' }, { status: 400 });
    }

    const apiKey = process.env.FAST2SMS_API_KEY;
    
    // If no API key is provided, just simulate the SMS being sent successfully in Dev mode
    if (!apiKey) {
      console.log(`[DEV MODE SMS] Sent OTP ${otp} to ${mobile}`);
      return NextResponse.json({ success: true, devMode: true });
    }

    // Clean the mobile number (Fast2SMS expects 10 digits without +91)
    let cleanMobile = mobile.replace(/\D/g, ''); // Removes all non-digit characters like +, -, spaces
    if (cleanMobile.startsWith('91') && cleanMobile.length > 10) {
      cleanMobile = cleanMobile.substring(2);
    } else if (cleanMobile.length > 10) {
      cleanMobile = cleanMobile.slice(-10); // fallback to last 10 digits
    }

    if (cleanMobile.length !== 10) {
      return NextResponse.json({ error: 'Invalid mobile number format. Please ensure it is 10 digits.' }, { status: 400 });
    }

    // Call Fast2SMS API (Using official OTP route to bypass spam filters)
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: "otp",
        variables_values: otp.toString(),
        numbers: cleanMobile,
      })
    });

    const data = await response.json();
    console.log("FAST2SMS RESPONSE STATUS:", response.status);
    console.log("FAST2SMS RESPONSE DATA:", JSON.stringify(data, null, 2));
    
    if (!response.ok || data.return === false || data.status_code === 996) {
      throw new Error(data.message || 'Fast2SMS API Error');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("SMS Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to send SMS' }, { status: 500 });
  }
}
