"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const MyChart = (props) => {
  const chartRef = useRef(null);
  console.log(props);
  echarts.registerMap("Victoria", props.geoJSON);

  useEffect(() => {
    // Fetch GeoJSON data

    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      // Example chart options
      const geoChartOptions = {
        timeline: {
          axisType: "category",
          data: [
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
          ],
        },
        title: {
          text: "Train Passenger Frequency Map",
          subtext: "Visualisation of passenger demand throughout victoria",

          left: "right",
        },
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
        },

        toolbox: {
          show: true,
          left: "left",
          top: "top",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "Victoria Train Demand",
            type: "map",
            roam: true,
            map: "Victoria",
            emphasis: {
              label: {
                show: true,
              },
            },
            data: props.passengerData[0],
          },
        ],
        options: [
          {
            title: { text: "03:00" },
            series: { data: props.passengerData[0] },
          },
          {
            title: { text: "04:00" },
            series: { data: props.passengerData[1] },
          },
          {
            title: { text: "05:00" },
            series: { data: props.passengerData[2] },
          },
          {
            title: { text: "06:00" },
            series: { data: props.passengerData[3] },
          },
          {
            title: { text: "07:00" },
            series: { data: props.passengerData[4] },
          },
          {
            title: { text: "08:00" },
            series: { data: props.passengerData[5] },
          },
          {
            title: { text: "09:00" },
            series: { data: props.passengerData[6] },
          },
          {
            title: { text: "10:00" },
            series: { data: props.passengerData[7] },
          },
          {
            title: { text: "11:00" },
            series: { data: props.passengerData[8] },
          },
          {
            title: { text: "12:00" },
            series: { data: props.passengerData[9] },
          },
          {
            title: { text: "13:00" },
            series: { data: props.passengerData[10] },
          },
          {
            title: { text: "14:00" },
            series: { data: props.passengerData[11] },
          },
        ],
      };

      chartInstance.setOption(geoChartOptions);

      // Clean up the chart instance when the component unmounts
      return () => {
        chartInstance.dispose();
      };
    }
  }, [props.passengerData]);

  return (
    <div>
      <div ref={chartRef} style={{ width: "600px", height: "400px" }}></div>
    </div>
  );
};

export default MyChart;
