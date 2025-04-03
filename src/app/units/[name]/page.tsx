import Unit from '@/components/Unit/Unit';
import getSheets from '@/services/getSheets';

export default async function Units({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const sheets = await getSheets();
  const members = sheets.members;
  const rows = await members.getRows();
  const fixedName = name.split('%20').join(' ');
  const memberUnits = rows
    .filter(row => row.get('unit') === fixedName)
    .map(unit => ({
      nickname: unit.get('nickname'),
      relic: unit.get('relic'),
    }));
  return <Unit name={fixedName} members={memberUnits} />;
}
