'use client';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { convergeUnits } from '@/services/convergeUnits';
import s from './Planets.module.scss';

type Props = {
  units: {
    planet: string;
    name: string;
    relic: number;
    amount: number;
  }[];
};

export default function Planets({ units }: Props) {
  const searchParams = useSearchParams();
  const planet1 = searchParams.get('planet1');
  const planet2 = searchParams.get('planet2');
  const planet3 = searchParams.get('planet3');

  const filteredUnits = useMemo(
    () =>
      units.filter(unit => {
        return (
          unit.planet === planet1 ||
          unit.planet === planet2 ||
          unit.planet === planet3
        );
      }),
    [planet1, planet2, planet3, units],
  );

  const convergedUnitsArr = convergeUnits(filteredUnits);

  return (
    <div className={s.page}>
      <p>
        Untis for planets
        {` ${planet1} ${planet2} `}
        {planet3}
      </p>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={`${s.cell} ${s.th}`}>Unit name</th>
            <th className={`${s.cell} ${s.th}`}>Amount</th>
            <th className={`${s.cell} ${s.th}`}>Relic</th>
          </tr>
        </thead>
        {convergedUnitsArr.map(
          ({ name, relic, amount, isSameRelic, differentRelic }) => (
            <tbody key={`${name}${relic}${amount}`}>
              <tr>
                <td className={s.cell}>
                  <Link
                    href={{
                      pathname: `/units/${name}`,
                      query: { relic },
                    }}
                    className={s.link}
                  >
                    {name}
                  </Link>
                </td>
                <td className={s.cell}>{amount}</td>
                <td className={s.cell}>{relic}</td>
              </tr>
              {!isSameRelic &&
                differentRelic.map(unit => (
                  <tr key={`${unit.name}${unit.relic}${unit.amount}`}>
                    <td className={s.cell}>
                      <Link
                        href={{
                          pathname: `/units/${name}`,
                          query: { relic: unit.relic },
                        }}
                        className={s.link}
                      >
                        {name}
                      </Link>
                    </td>
                    <td className={s.cell}>{unit.amount}</td>
                    <td className={s.cell}>{unit.relic}</td>
                  </tr>
                ))}
            </tbody>
          ),
        )}
      </table>
    </div>
  );
}
