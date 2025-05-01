import { useState } from "react";
import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";
import styles from "./index.module.css";
import wretcher from "@/test";

function Home() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    wretcher
      .get("/test")
      .json()
      .then((res) => {
        console.log("res", res);
      });
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className={styles.logo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <button className="btn" onClick={handleClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles.readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Home;
