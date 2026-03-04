import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface RadiusChartProps {
  predicted: number;
}

const RadiusChart = ({ predicted }: RadiusChartProps) => {
  const rawData = [
    { name: "Earth", radius: 1, type: "reference" },
    { name: "Super Earth", radius: 2, type: "reference" },
    { name: "Predicted", radius: parseFloat(predicted.toFixed(2)), type: "predicted" },
    { name: "Neptune", radius: 3.9, type: "reference" },
    { name: "Jupiter", radius: 11, type: "reference" }
  ];

  const data = rawData.sort((a, b) => a.radius - b.radius);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--foreground))", fontSize: 10, fontFamily: "var(--font-display)" }}
            angle={-45}
            textAnchor="end"
          />
          <YAxis hide domain={[0, 'dataMax + 1']} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--foreground)" }}
            formatter={(val: number) => [`${val} Earth Radii`, "Radius"]}
          />
          <Bar dataKey="radius" radius={[4, 4, 0, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.type === "predicted" ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
                opacity={entry.type === "predicted" ? 1 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadiusChart;
