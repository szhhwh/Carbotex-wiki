import styles from "./header.module.css";

interface HeaderProps {
  title: string;
  lead: string;
}

export function Header({ title, lead }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.kicker}>OUC-HAIDE / WIKI</span>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </header>
  );
}
