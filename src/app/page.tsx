import Card from "@/Components/Card/Card";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.filterSortContainer}>
        <p>Filter</p>
          <p className={styles.FilterSortBTN}>
            Filter & Sort
          </p>
      </div>
      <div className={styles.cardsContainer}>
        <Card />
      </div>
    </div>
  );
}
