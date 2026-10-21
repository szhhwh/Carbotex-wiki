import styles from "./cost-breakdown.module.css";

const ITEMS = [
  { name: "Dopamine (DA)", low: 161.53, high: 199.98, featured: true },
  { name: "EDC·HCl", low: 20.68, high: 20.68 },
  { name: "NHS", low: 5.7, high: 5.7 },
  {
    name: "Selected CBS reference inputs",
    low: 5.78,
    high: 5.78,
  },
];

function currency(value: number) {
  return value.toFixed(2);
}

export function CostBreakdown() {
  return (
    <section
      className={styles.wrapper}
      aria-label="Preliminary PMA-DA material cost"
    >
      <div className={styles.intro}>
        <div>
          <strong>200 mL broth · ~3.6 g PMA</strong>
          <span>Batch basis · Before dopamine functionalization</span>
        </div>
        <div
          className={styles.share}
          role="group"
          aria-label="Dopamine share of priced materials: 83 to 86 percent"
        >
          <span className={styles.shareScale} aria-hidden="true" />
          <div>
            <strong>83–86%</strong>
            <span>of included material costs</span>
          </div>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Cost component</th>
              <th scope="col">Estimated cost per batch</th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((item) => (
              <tr
                key={item.name}
                data-featured={item.featured ? "true" : undefined}
              >
                <th scope="row">{item.name}</th>
                <td data-label="Estimated cost">
                  RMB{" "}
                  {item.low === item.high
                    ? currency(item.low)
                    : `${currency(item.low)}–${currency(item.high)}`}
                </td>
              </tr>
            ))}
            <tr className={styles.total}>
              <th scope="row">Preliminary material subtotal</th>
              <td data-label="Estimated cost">Approximately RMB 194–232</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.band}>
        <span>Material, not full production cost</span>
        <span>Laboratory-scale estimate</span>
        <span>Recovered mass not yet included</span>
      </div>
    </section>
  );
}
