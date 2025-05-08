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
    mining: 33,
    inspecting: 24,
  },
  {
    day: "8 May",
    mining: 160,
    inspecting: 272,
  },
  {
    day: "9 May",
    mining: 74,
    inspecting: 82,
  },
  {
    day: "10 May",
    mining: 103,
    inspecting: 121,
  },
  {
    day: "11 May",
    mining: 31,
    inspecting: 92,
  },
  {
    day: "12 May",
    mining: 78,
    inspecting: 140,
  },

  {
    day: "13 May",
    mining: 81,
    inspecting: 242,
  },
];

export default function CreatorChart() {
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
