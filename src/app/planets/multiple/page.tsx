import { Suspense } from 'react';
import getSheets from '@/services/getSheets';
import Loader from '@/components/Loader/Loader';
import Planets from '@/components/Planets/Planets';
import s from './page.module.scss';

export default async function MultiplePlanets() {
  const sheets = await getSheets();
  const units = sheets.units;
  const rows = await units.getRows();
  const allUnits = rows.map(row => ({
    planet: row.get('planet'),
    name: row.get('name'),
    relic: row.get('relic') ? row.get('relic') : 0,
    amount: row.get('amount'),
  }));

  const members = sheets.members;
  const membersRows = await members.getRows();
  const allMembersUnits = membersRows.map(row => ({
    nickname: row.get('nickname'),
    unit: row.get('unit'),
    relic: row.get('relic') ? row.get('relic') : 0,
  }));
  return (
    <div className={s.container}>
      <Suspense fallback={<Loader />}>
        <Planets units={allUnits} members={allMembersUnits} />
      </Suspense>
    </div>
  );
}
