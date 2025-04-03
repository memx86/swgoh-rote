'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import s from './Planet.module.scss';

type Props = {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allUnits: {
    planet: string;
    name: string;
    relic: number;
    rowNumber: number;
    amount: number;
  }[];
  number?: number;
};

const Planet = ({ name, allUnits, number }: Props) => {
  const searchParams = useSearchParams();
  const planetName = name ? name : searchParams.get(`planet${number}`);
  if (number === 3 && !planetName) {
    return <></>;
  }
  console.log(planetName);
  const units = allUnits.filter(row => row.planet === planetName);
  const relic = units.at(0)?.relic;
  return (
    <div className={s.page}>
      <p>
        Units for {planetName} relic {relic}
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
