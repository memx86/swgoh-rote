import { Suspense } from 'react';
import Planet from '@/components/Planet/Planet';
import Loader from '@/components/Loader/Loader';
import getSheets from '@/services/getSheets';
import s from './page.module.scss';

export default async function MultiplePlanets() {
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
  return (
    <div className={s.container}>
      <Suspense fallback={<Loader />}>
        <Planet allUnits={allUnits} number={1} />
        <Planet allUnits={allUnits} number={2} />
        <Planet allUnits={allUnits} number={3} />
      </Suspense>
    </div>
  );
}
