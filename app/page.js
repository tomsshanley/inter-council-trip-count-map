import Image from "next/image";
import styles from "./page.module.css";

import TripCountMap from "../components/TripCountMap";

const url =
  "https://geo.abs.gov.au/arcgis/rest/services/ASGS2017/LGA/MapServer/0/query?where=LGA_CODE_2017%20LIKE%20'2%'&outFields=LGA_CODE_2017,LGA_NAME_2017,objectid&geometryPrecision=3&f=geojson";

// List of necessary LGAs, used to filter the fetched geoJSON data
const namesList = [
  "Hepburn",
  "Moorabool",
  "Greater Geelong",
  "Wyndham",
  "Melton",
  "Golden Plains",
  "Macedon Ranges",
  "Hume",
  "Brimbank",
  "Hobsons Bay",
  "Maribyrnong",
  "Moonee Valley",
  "Moreland",
  "Melbourne",
  "Port Phillip",
  "Glen Eira",
  "Bayside",
  "Stonnington",
  "Yarra",
  "Darebin",
  "Boroondara",
  "Banyule",
  "Whittlesea",
  "Mitchell",
  "Nillumbik",
  "Murrindindi",
  "Yarra Ranges",
  "Baw Baw",
  "Cardinia",
  "Nillumbik",
  "Manningham",
  "Maroondah",
  "Knox",
  "Whitehorse",
  "Monash",
  "Kingston (C) (Vic.)",
  "Greater Dandenong",
  "Casey",
  "Frankston",
];

// Transform data function
const transformGeojsonData = (geojson) => {
  return {
    ...geojson,
    features: geojson.features.map((feature, index) => ({
      ...feature,
      id: (index + 1).toString().padStart(2, "0"), // Adds ID starting from '01'
      properties: {
        name: feature.properties.lga_name_2017.replace(/\s\([A-Z]\)$/, ""), // Uses regex to remove space and any single uppercase letter in parentheses at the end of the string
      },
    })),
  };
};

export default async function Home() {
  let res = await fetch(url, { cache: "no-store" });
  let data = await res.json();
  const transformedGeojsonData = transformGeojsonData(data);
  const filteredGeoJSON = transformedGeojsonData.features.filter((element) =>
    namesList.includes(element.properties.name)
  );
  const geoJSON = {
    type: "FeatureCollection",
    features: filteredGeoJSON,
  };

  console.log(filteredGeoJSON);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          {/* <code className={styles.code}>app/page.js</code> */}
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
      <TripCountMap geoJSON={geoJSON} />
    </main>
  );
}
