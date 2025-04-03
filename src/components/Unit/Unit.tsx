'use client';

import { useSearchParams } from 'next/navigation';
import s from './Unit.module.scss';

type Props = {
  name: string;
  members: {
    nickname: string;
    relic: number;
  }[];
};

const Unit = ({ name, members }: Props) => {
  const searchParams = useSearchParams();
  const relic = Number(searchParams.get('relic') ?? 0);
  const filteredMembers = members.filter(member => member.relic >= relic);

  return (
    <div className={s.page}>
      <p>
        Members who has {name} relic {relic}
      </p>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.cell}>Nickname</th>
            <th className={s.cell}>Relic</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map(row => (
            <tr key={row.nickname}>
              <td className={s.cell}>{row.nickname}</td>
              <td className={s.cell}>{row.relic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Unit;
