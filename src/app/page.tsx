import getSheets from '@/services/getSheets';
import s from './page.module.scss';
import ChoosePlanet from '../components/ChoosePlanet/ChoosePlanet';

export default async function Home() {
  const sheets = await getSheets();
  const planets = sheets.planets;
  const rows = await planets.getRows();
  const planetsData = rows.map(row => ({
    row: row.get('row'),
    name: row.get('name'),
  }));

  return (
    <div className={s.page}>
      <ChoosePlanet planets={planetsData} />
    </div>
  );
}
