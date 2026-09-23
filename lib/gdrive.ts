import { JWT } from "google-auth-library";

export interface DriveFile {
  id: string;
  name: string;
  webViewLink: string;
  createdTime: string;
}

export async function getDailyCurrentAffairs(): Promise<DriveFile[]> {
  try {
    const FOLDER_ID = process.env.GDRIVE_FOLDER_ID;
    const CLIENT_EMAIL = process.env.GDRIVE_CLIENT_EMAIL;
    const PRIVATE_KEY = process.env.GDRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!FOLDER_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
      console.warn("Google Drive credentials are not fully configured in environment variables.");
      return [];
    }

    // Initialize the JWT auth client
    const client = new JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    // Get an access token
    const { token } = await client.getAccessToken();

    if (!token) {
      throw new Error("Failed to retrieve access token");
    }

    // Use native fetch to avoid Next.js ArrayBuffer cloning issues with the googleapis package
    const query = `'${FOLDER_ID}' in parents and mimeType='application/pdf' and trashed=false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,webViewLink,createdTime)&orderBy=createdTime%20desc`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      next: { revalidate: 3600 } // Cache for 1 hour natively
    });

    if (!response.ok) {
      throw new Error(`Google API responded with status ${response.status}`);
    }

    const data = await response.json();
    const files = data.files;
    
    if (!files || !Array.isArray(files)) return [];

    return files.map((file: any) => ({
      id: file.id || "",
      name: file.name || "Untitled PDF",
      webViewLink: file.webViewLink || "",
      createdTime: file.createdTime || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching files from Google Drive:", error);
    return [];
  }
}


export async function getEbooks(): Promise<DriveFile[]> {
  try {
    const FOLDER_ID = process.env.GDRIVE_EBOOKS_FOLDER_ID;
    const CLIENT_EMAIL = process.env.GDRIVE_CLIENT_EMAIL;
    const PRIVATE_KEY = process.env.GDRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!FOLDER_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
      console.warn("Google Drive credentials or Ebooks Folder ID not configured.");
      return [];
    }

    const client = new JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const { token } = await client.getAccessToken();
    if (!token) throw new Error("Failed to retrieve access token");

    const query = `'${FOLDER_ID}' in parents and mimeType='application/pdf' and trashed=false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,webViewLink,createdTime)&orderBy=createdTime%20desc`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error(`Google API responded with status ${response.status}`);

    const data = await response.json();
    const files = data.files;
    
    if (!files || !Array.isArray(files)) return [];

    return files.map((file) => ({
      id: file.id || "",
      name: file.name || "Untitled Ebook",
      webViewLink: file.webViewLink || "",
      createdTime: file.createdTime || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching Ebooks from Google Drive:", error);
    return [];
  }
}
