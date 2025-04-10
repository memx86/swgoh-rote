import s from './Container.module.scss';

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={s.container}>{children}</div>;
}
