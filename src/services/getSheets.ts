import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const EMAIL = process.env.SERVICE_EMAIL;
const { KEY } = JSON.parse(process.env.SERVICE_PRIVATE_KEY ?? '');
const SHEET_ID = process.env.SHEET_ID ?? '';

const jwt = new JWT({
  email: EMAIL,
  key: KEY,
  scopes: SCOPES,
});
const doc = new GoogleSpreadsheet(SHEET_ID, jwt);

export default async function getSheets() {
  await doc.loadInfo();
  const sheets = doc.sheetsByTitle;
  return sheets;
}
