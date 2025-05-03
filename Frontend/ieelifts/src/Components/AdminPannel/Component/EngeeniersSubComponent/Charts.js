import React, { useEffect, useState } from "react";
import { GetSparePartProfitSummaryGraphDataAction } from "../../../../ReduxSetup/Actions/AdminActions";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceDot,
} from "recharts";

const Charts = (engID) => {
  const [graphData, setGraphData] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await GetSparePartProfitSummaryGraphDataAction(engID.engID);
      if (data) {
        setGraphData(data.result);
      }
    };
    getData();
  }, [engID]);

  return (
    <ResponsiveContainer height={"95%"} width={"100%"} className="change-chart">
      <AreaChart data={graphData}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F8AC1DAD" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F8AC1DAD" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="dayName"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#000000", fillOpacity: "0.5", fontSize: "0.7rem" }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#000000", fillOpacity: "0.5", fontSize: "0.7rem" }}
        />
        <CartesianGrid stroke="#f5f5f5" strokeOpacity={0.5} />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            fontSize: "0.7rem  ",
            padding: "0.2rem 0.5rem",
          }}
        />
        <Area
          type="monotone"
          dataKey="totalAmount"
          stroke="#F8AC1DAD"
          fillOpacity={2}
          fill="url(#colorPv)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Charts;
