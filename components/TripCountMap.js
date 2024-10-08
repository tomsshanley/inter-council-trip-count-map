"use client";

import React, { useEffect, useRef, useState } from "react";
import MyChart from "./MyChart";
import Papa from "papaparse";
import data from "../data/data";

const simplifyData = (data) => {
  data.forEach((trip) => {
    delete trip.Origin;
    delete trip.Destination;
    delete trip.SA1_MAINCODE_2016;
    delete trip.Origin_SA2_NAME_2016;
    delete trip.Dest_Origin_SA2_NAME_2016;
    delete trip.SA1_MAINCODE_2016_Dest;
  });

  return data;
};

function transformOutboundData(data) {
  const lga = "Melbourne City";
  // Filter for origins

  let outbound = data.filter((trip) => trip.Origin_SA3_NAME_2016 == lga);

  // Count trips per hour
  let outboundFrequency = countTripsPerHour(outbound);

  return outboundFrequency;
}

function countTripsPerHour(data) {
  const tripsPerHour = [];

  // Initialize tripsPerHour with empty arrays for each hour
  for (let i = 0; i < 24; i++) {
    const hourString = `${String(i).padStart(2, "0")}:00`;
    tripsPerHour.push({ [hourString]: [] });
  }

  try {
    // Process each trip
    data.forEach((trip) => {
      let hour = Math.floor(trip.Departure / 60);
      if (hour >= 24) {
        hour = 0; // If hour is 24 or greater, set it to 0
      }
      const hourString = `${String(hour).padStart(2, "0")}:00`;
      const destination = trip.Dest_Origin_SA3_NAME_2016 || "Melbourne City";

      // Find the corresponding hour in tripsPerHour
      const hourEntry = tripsPerHour.find((entry) => entry[hourString]);
      if (hourEntry == undefined) {
        console.error("hourEntry undefined");
        console.log(trip);
        console.log(hourString);
      }
      // Find the destination entry within that hour
      const destinationEntry = hourEntry[hourString].find(
        (entry) => entry.name === destination
      );

      if (destinationEntry) {
        destinationEntry.value++;
      } else {
        hourEntry[hourString].push({ name: destination, value: 1 });
      }
    });

    return tripsPerHour;
  } catch (error) {
    console.error("Error occured when processing trip");
    console.log(error);
  }
}

const TripCountMap = (geoJSON) => {
  const [chartData, setChartData] = useState([
    { name: "Melbourne", value: -200 },
    { name: "Murrindindi", value: -200 },
    { name: "Baw Baw", value: -200 },
    { name: "Port Phillip", value: 24000 },
    { name: "Pyrenees", value: -200 },
    { name: "Bass Coast", value: -200 },
    { name: "Queenscliffe", value: -200 },
    { name: "Wyndham", value: -200 },
    { name: "Mansfield", value: -200 },
    { name: "Swan Hill (RC)", value: -200 },
    { name: "Moreland", value: 12000 },
    { name: "Glen Eira", value: 13000 },
    { name: "Surf Coast", value: -200 },
    { name: "Glenelg", value: -200 },
    { name: "Moonee Valley", value: 9000 },
    { name: "Moyne", value: -200 },
    { name: "Central Goldfields", value: -200 },
    { name: "Casey", value: -200 },
    { name: "Yarra Ranges", value: -2000 },
    { name: "Mitchell", value: -200 },
    { name: "Mildura (RC)", value: -200 },
    { name: "Hobsons Bay", value: 500 },
    { name: "Greater Bendigo", value: -200 },
    { name: "Southern Grampians", value: -200 },
    { name: "Horsham (RC)", value: -200 },
    { name: "Buloke", value: -200 },
    { name: "Brimbank", value: -200 },
    { name: "Nillumbik", value: -200 },
    { name: "Benalla (RC)", value: -200 },
    { name: "Golden Plains", value: -200 },
    { name: "Moorabool", value: -200 },
    { name: "Colac-Otway", value: -200 },
    { name: "Stonnington", value: 18000 },
    { name: "Indigo", value: -200 },
    { name: "West Wimmera", value: -200 },
    { name: "Ballarat", value: -200 },
    { name: "Greater Geelong", value: -200 },
    { name: "Alpine", value: -200 },
    { name: "Boroondara", value: 18000 },
    { name: "East Gippsland", value: -200 },
    { name: "Mornington Peninsula", value: -200 },
    { name: "Darebin", value: 16000 },
    { name: "Campaspe", value: -200 },
    { name: "Mount Alexander", value: -200 },
    { name: "Corangamite", value: -200 },
    { name: "Northern Grampians", value: -200 },
    { name: "Maribyrnong", value: 5000 },
    { name: "Frankston", value: -200 },
    { name: "Whitehorse", value: -30000 },
    { name: "Melton", value: -200 },
    { name: "Gannawarra", value: -200 },
    { name: "Strathbogie", value: -200 },
    { name: "Knox", value: -2000 },
    { name: "Loddon", value: -200 },
    { name: "Yarriambiack", value: -200 },
    { name: "Whittlesea", value: -200 },
    { name: "Wangaratta (RC)", value: -200 },
    { name: "Yarra", value: 24000 },
    { name: "Banyule", value: 12000 },
    { name: "Bayside", value: 13000 },
    { name: "Monash", value: 5000 },
    { name: "Hume", value: -200 },
    { name: "Manningham", value: -4000 },
    { name: "Kingston (C) (Vic.)", value: -300 },
    { name: "Greater Dandenong", value: -200 },
    { name: "Cardinia", value: -200 },
    { name: "Maroondah", value: -3000 },
    { name: "Macedon Ranges", value: -200 },
    { name: "Hepburn", value: -200 },
  ]);
  const passengerData = data;
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
          const simplifiedData = simplifyData(results.data);
          const outboundData = transformOutboundData(simplifiedData);
          //   console.log(outboundData);
          // displayData(outboundData);
        },
      });
    }
  };

  const changeData = () => {
    setChartData([
      { name: "Melbourne", value: 25000 },
      { name: "Murrindindi", value: -200 },
      { name: "Baw Baw", value: -200 },
      { name: "Port Phillip", value: 24000 },
      { name: "Pyrenees", value: -200 },
      { name: "Bass Coast", value: -200 },
      { name: "Queenscliffe", value: -200 },
      { name: "Wyndham", value: -200 },
      { name: "Mansfield", value: -200 },
      { name: "Swan Hill (RC)", value: -200 },
      { name: "Moreland", value: 12000 },
      { name: "Glen Eira", value: 13000 },
      { name: "Surf Coast", value: -200 },
      { name: "Glenelg", value: -200 },
      { name: "Moonee Valley", value: 9000 },
      { name: "Moyne", value: -200 },
      { name: "Central Goldfields", value: -200 },
      { name: "Casey", value: -200 },
      { name: "Yarra Ranges", value: -2000 },
      { name: "Mitchell", value: -200 },
      { name: "Mildura (RC)", value: -200 },
      { name: "Hobsons Bay", value: 500 },
      { name: "Greater Bendigo", value: -200 },
      { name: "Southern Grampians", value: -200 },
      { name: "Horsham (RC)", value: -200 },
      { name: "Buloke", value: -200 },
      { name: "Brimbank", value: -200 },
      { name: "Nillumbik", value: -200 },
      { name: "Benalla (RC)", value: -200 },
      { name: "Golden Plains", value: -200 },
      { name: "Moorabool", value: -200 },
      { name: "Colac-Otway", value: -200 },
      { name: "Stonnington", value: 18000 },
      { name: "Indigo", value: -200 },
      { name: "West Wimmera", value: -200 },
      { name: "Ballarat", value: -200 },
      { name: "Greater Geelong", value: -200 },
      { name: "Alpine", value: -200 },
      { name: "Boroondara", value: 18000 },
      { name: "East Gippsland", value: -200 },
      { name: "Mornington Peninsula", value: -200 },
      { name: "Darebin", value: 16000 },
      { name: "Campaspe", value: -200 },
      { name: "Mount Alexander", value: -200 },
      { name: "Corangamite", value: -200 },
      { name: "Northern Grampians", value: -200 },
      { name: "Maribyrnong", value: 5000 },
      { name: "Frankston", value: -200 },
      { name: "Whitehorse", value: -30000 },
      { name: "Melton", value: -200 },
      { name: "Gannawarra", value: -200 },
      { name: "Strathbogie", value: -200 },
      { name: "Knox", value: -2000 },
      { name: "Loddon", value: -200 },
      { name: "Yarriambiack", value: -200 },
      { name: "Whittlesea", value: -200 },
      { name: "Wangaratta (RC)", value: -200 },
      { name: "Yarra", value: 24000 },
      { name: "Banyule", value: 12000 },
      { name: "Bayside", value: 13000 },
      { name: "Monash", value: 5000 },
      { name: "Hume", value: -200 },
      { name: "Manningham", value: -4000 },
      { name: "Kingston (C) (Vic.)", value: -300 },
      { name: "Greater Dandenong", value: -200 },
      { name: "Cardinia", value: -200 },
      { name: "Maroondah", value: -3000 },
      { name: "Macedon Ranges", value: -200 },
      { name: "Hepburn", value: -200 },
    ]);
  };

  return (
    <div>
      <button onClick={changeData}>setOption</button>
      <input type="file" id="fileInput" onChange={handleFileSelect} />
      <MyChart geoJSON={geoJSON} passengerData={passengerData} />
    </div>
  );
};

export default TripCountMap;
