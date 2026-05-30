"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Repository } from "@/lib/types";

const COLORS = [
  "#16a34a",
  "#3178c6",
  "#f1e05a",
  "#dea584",
  "#563d7c",
  "#3572A5",
  "#00ADD8",
  "#b07219",
];

interface StatsChartsProps {
  repos: Repository[];
}

export default function StatsCharts({ repos }: StatsChartsProps) {
  // Top 5 starred repos
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map((r) => ({
      name: r.name.length > 12 ? r.name.slice(0, 12) + "..." : r.name,
      stars: r.stargazers_count,
      forks: r.forks_count,
    }));

  // Language distribution
  const langMap: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      langMap[r.language] = (langMap[r.language] ?? 0) + 1;
    }
  });
  const langData = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  if (repos.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-head font-medium text-base">Charts</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top repos — Bar chart */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-head font-medium text-sm mb-4">
            Top Repositories (Stars)
          </h3>
          {topRepos.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={topRepos}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                    fontSize: 12,
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />
                <Bar dataKey="stars" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-p text-sm text-center py-10">
              Ma&#39;lumot yo&#39;q
            </p>
          )}
        </div>

        {/* Language distribution — Pie chart */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-head font-medium text-sm mb-4">
            Language Distribution
          </h3>
          {langData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={langData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {langData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                    fontSize: 12,
                  }}
                />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: "#94a3b8", fontSize: 11 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-p text-sm text-center py-10">
              Ma&#39;lumot yo&#39;q
            </p>
          )}
        </div>

        {/* Forks chart */}
        <div className="bg-card border border-border rounded-xl p-4 lg:col-span-2">
          <h3 className="text-head font-medium text-sm mb-4">
            Top Repositories (Forks)
          </h3>
          {topRepos.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={topRepos}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                    fontSize: 12,
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />
                <Bar dataKey="forks" fill="#3178c6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-p text-sm text-center py-10">
              Ma&#39;lumot yo&#39;q
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
