import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

interface ProbabilityChartProps {
  confidence: number;
}

const ProbabilityChart = ({ confidence }: ProbabilityChartProps) => {
  const probConfirmed = parseFloat((confidence * 100).toFixed(2));
  const probFalsePositive = parseFloat(((1 - confidence) * 100).toFixed(2));

  const data = [
    { name: "Confirmed", value: probConfirmed },
    { name: "False Positive", value: probFalsePositive }
  ];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 100, right: 20, top: 20, bottom: 20 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--foreground))", fontSize: 12, fontFamily: "var(--font-display)" }} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--foreground)" }}
            formatter={(val: number) => [`${val}%`, "Probability"]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name === "Confirmed" ? "hsl(var(--primary))" : "hsl(var(--secondary))"} />
            ))}
          </Bar>
          <ReferenceLine x={50} stroke="var(--muted-foreground)" strokeDasharray="3 3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProbabilityChart;
