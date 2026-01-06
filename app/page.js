import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <header className={styles.hero}>
        <h1 className={styles.title}>
          We Build <br />
          Digital Experiences
        </h1>
        <p className={styles.subtitle}>
          BrandCode transforms ideas into high-impact digital solutions. We
          blend strategy, design, and technology to create products that matter.
        </p>
        <div className={styles.ctaGroup}>
          <a href="#" className={styles.buttonPrimary}>
            Start a Project
          </a>
          <a href="#" className={styles.buttonSecondary}>
            View Portfolio
          </a>
        </div>
      </header>

      <section className={styles.grid}>
        <div className={styles.card}>
          <h2>Strategy &rarr;</h2>
          <p>
            We define the roadmap for your digital success with deep market
            research and strategic planning.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Design &rarr;</h2>
          <p>
            Crafting intuitive and stunning interfaces that engage users and
            elevate your brand identity.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Development &rarr;</h2>
          <p>
            Building robust, scalable, and high-performance applications using
            cutting-edge technologies.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Marketing &rarr;</h2>
          <p>
            Data-driven campaigns that drive growth, increase visibility, and
            maximize ROI.
          </p>
        </div>
      </section>
    </div>
  );
}
