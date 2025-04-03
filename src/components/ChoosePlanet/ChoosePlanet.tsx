'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import s from './ChoosePlanet.module.scss';

type Props = {
  planets: {
    row: number;
    name: string;
  }[];
};

function ChoosePlanet({ planets }: Props) {
  const router = useRouter();
  const formValues: { [key: string]: boolean } = {};
  planets.forEach(planet => {
    formValues[planet.name] = false;
  });
  const [multiple, setMultiple] = useState(false);
  const [checkedPlanets, setCheckedPlanets] = useState(formValues);

  const allCheckedPlanets = Object.entries(checkedPlanets)?.filter(value =>
    value.at(1),
  );
  const checkedNumber = allCheckedPlanets.length;

  const onMultipleChange = () => {
    setMultiple(prevState => !prevState);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const checked = target.checked;
    const name = target.name;

    if (checkedNumber >= 3 && checked) {
      return;
    }
    const newCheckedPlanets = { ...checkedPlanets };
    newCheckedPlanets[name] = !newCheckedPlanets[name];
    setCheckedPlanets(newCheckedPlanets);
  };
  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkedNumber < 2) {
      return;
    }

    const planet1 = allCheckedPlanets.at(0)?.at(0) as string;
    const planet2 = allCheckedPlanets.at(1)?.at(0) as string;
    const planet3 = allCheckedPlanets.at(2)?.at(0) as string;
    const queryParams = new URLSearchParams({
      planet1,
      planet2,
    });
    if (planet3) {
      queryParams.append('planet3', planet3);
    }

    router.push(`/planets/multiple?${queryParams}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Select multiple planets (max 3)
        <input
          type="checkbox"
          name="multiple"
          checked={multiple}
          onChange={onMultipleChange}
        />
      </label>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.cell}>Dark side</th>
            <th className={s.cell}>Neutral</th>
            <th className={s.cell}>Light side</th>
            <th className={s.cell}> Bonus</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, index) => {
            const row = planet.row;
            const previousRow = planets.at(index - 1)?.row;
            if (row !== previousRow) {
              const newRowStartIndex = index;
              return (
                <tr key={row}>
                  {planets.map((planet, index) => {
                    const currentRow = planet.row;
                    const nextRowIndex = currentRow > row ? index : null;
                    const name = planet.name;
                    if (index >= newRowStartIndex && nextRowIndex == null) {
                      return (
                        <td key={name} className={s.cell}>
                          {!multiple ? (
                            <Link href={`/planets/${name}`} className={s.link}>
                              {name}
                            </Link>
                          ) : (
                            <label className={s.label}>
                              {name}
                              <input
                                type="checkbox"
                                name={name}
                                checked={checkedPlanets[name]}
                                onChange={onChange}
                              />
                            </label>
                          )}
                        </td>
                      );
                    } else {
                      return null;
                    }
                  })}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      {multiple && <button type="submit">Find</button>}
    </form>
  );
}

export default ChoosePlanet;
