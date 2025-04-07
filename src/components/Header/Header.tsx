'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { sheets } from '@/app/action';
import s from './Header.module.scss';

export default function Header() {
  const router = useRouter();
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <button
          type="button"
          onClick={() => router.back()}
          className={s.button}
        >
          &#8592;
        </button>
        <Link href="/" className={`${s.link} ${s.home}`}>
          &#8962;
        </Link>
      </nav>
      {/* <button formAction={sheets} className={s.reload}>
        ↺
      </button> */}
    </header>
  );
}
