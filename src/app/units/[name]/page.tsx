import Unit from '@/components/Unit/Unit';
import Loader from '@/components/Loader/Loader';
import getSheets from '@/services/getSheets';
import { Suspense } from 'react';

export default async function Units({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const sheets = await getSheets();
  const members = sheets.members;
  const rows = await members.getRows();
  const fixedName = name.split('%20').join(' ').split('%2C').join(',');
  const memberUnits = rows
    .filter(row => row.get('unit') === fixedName)
    .map(unit => ({
      nickname: unit.get('nickname'),
      relic: unit.get('relic'),
    }));
  return (
    <Suspense fallback={<Loader />}>
      <Unit name={fixedName} members={memberUnits} />;
    </Suspense>
  );
}
