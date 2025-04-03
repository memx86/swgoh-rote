import Planet from '@/components/Planet/Planet';
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
      <Planet allUnits={allUnits} number={1} />
      <Planet allUnits={allUnits} number={2} />
      <Planet allUnits={allUnits} number={3} />
    </div>
  );
}
