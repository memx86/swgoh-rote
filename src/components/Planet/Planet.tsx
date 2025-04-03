import Link from 'next/link';
import s from './Planet.module.scss';

type Props = {
  name: string;
  allUnits: {
    planet: string;
    name: string;
    relic: number;
    rowNumber: number;
    amount: number;
  }[];
};

const Planet = ({ name, allUnits }: Props) => {
  const units = allUnits.filter(row => row.planet === name);
  const relic = units.at(0)?.relic;
  return (
    <div className={s.page}>
      <p>
        Units for {name} relic {relic}
      </p>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.cell}>Unit name</th>
            <th className={s.cell}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {units.map(row => (
            <tr key={row.rowNumber}>
              <td className={s.cell}>
                <Link
                  href={{
                    pathname: `/units/${row.name}`,
                    query: { relic },
                  }}
                  className={s.link}
                >
                  {row.name}
                </Link>
              </td>
              <td className={s.cell}>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Planet;
