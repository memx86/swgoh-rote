import Planet from '@/components/Planet/Planet';
import getSheets from '@/services/getSheets';

export default async function Planets({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const sheets = await getSheets();
  const units = sheets.units;
  const rows = await units.getRows();
  const allUnits = rows.map(row => ({
    planet: row.get('planet'),
    name: row.get('name'),
    relic: row.get('relic'),
    amount: row.get('amount'),
    rowNumber: row.rowNumber,
  }));
  return <Planet name={name} allUnits={allUnits} />;
}
