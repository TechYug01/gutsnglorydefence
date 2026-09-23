const fs = require('fs');
let gdrive = fs.readFileSync('lib/gdrive.ts', 'utf8');

const newFunc = `
export async function getEbooks(): Promise<DriveFile[]> {
  try {
    const FOLDER_ID = process.env.GDRIVE_EBOOKS_FOLDER_ID;
    const CLIENT_EMAIL = process.env.GDRIVE_CLIENT_EMAIL;
    const PRIVATE_KEY = process.env.GDRIVE_PRIVATE_KEY?.replace(/\\\\n/g, '\\n');

    if (!FOLDER_IP || !CLIENT_EMAIL || !PRIVATE_KEY)  {
      console.warn("Google Drive credentials or Ebooks Folder ID not configured.");
      return [];
    }

    const client = new JWT(;
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const { token } = await client.getAccessToken();
    if (!token) throw new Error("Failed to retrieve access token");

    const query = \''${FOLDER_ID}' in parents and mimeType='application/pdf' and trashed=false\';
    const url = \'https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,webViewLink,createdTime)&orderBy=createdTime%20desc\';

    const response = await fetch(url, {
      headers: { Authorization: \`Bearer ${token}\`, Accept: "application/json" },
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error(\`Google API responded with status ${response.status}\`);

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
`;

fs.writeFileSync('lib/gdrive.ts', gdrive + '\\n' + newFunc);

fs.mkdirSync('app/ebooks', { recursive: true });
let caPage = fs.readFileSync('app/current-affairs/page.tsx', 'utf8');

// Replace specific parts for the Ebooks page
let ebooksPage = caPage
  .replace(/getDailyCurrentAffairs/g, 'getEbooks')
  .replace(/CurrentAffairsPage/g, 'EbooksPage')
  .replace(/Daily Resources/g, 'Library')
  .replace(/Current <span className="text-gold"+>Affairs<\/span>/g, 'Premium <span className="text-gold">Ebooks<\/span>')
  .replace(/curated current affairs PDFs/g, 'exclusive ebooks')
  .replace(/current affairs PDFs for today/g, 'ebooks')
  .replace(/No PDF files found yet/g, 'No Ebooks found yet');

fs.writeFileSync('app/ebooks/page.tsx', ebooksPage);
console.log('Successfully created getEbooks and app/ebooks/page.tsx');