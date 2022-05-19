import { FC } from "react";
import styles from "./styles/Loader.module.css";

export const Loader: FC = () => {
  return (
    <>
      <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};
