import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    day: "7 May",
    mining: 3,
    inspecting: 4,
  },
  {
    day: "8 May",
    mining: 4,
    inspecting: 8,
  },
  {
    day: "9 May",
    mining: 7,
    inspecting: 8,
  },
  {
    day: "10 May",
    mining: 10,
    inspecting: 12,
  },
  {
    day: "11 May",
    mining: 3,
    inspecting: 9,
  },
  {
    day: "12 May",
    mining: 7,
    inspecting: 4,
  },

  {
    day: "13 May",
    mining: 8,
    inspecting: 14,
  },
];

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          interval={0} // Show a tick for every data point
          scale="band" // Crucial for categorical data
          tick={{ angle: -45, textAnchor: "end", fontSize: "10px" }}
        />
        <YAxis />

        <Legend
          verticalAlign="bottom"
          wrapperStyle={{
            paddingTop: 10, // Adjust this value to control the distance from the chart
          }}
        />
        <Bar dataKey="mining" fill="#F5BC73" />
        <Bar dataKey="inspecting" fill="#94B5FC" />
      </BarChart>
    </ResponsiveContainer>
  );
}
