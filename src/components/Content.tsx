"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const SkillTestDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rank, setRank] = useState<string>("1");
  const [percentile, setPercentile] = useState<string>("30");
  const [score, setScore] = useState<string>("10");
  const [errors, setErrors] = useState({ rank: "", percentile: "", score: "" });

  const validateField = (field: string, value: string) => {
    let error = "";
    const num = Number(value);

    if (value.trim() === "" || isNaN(num)) {
      if (field === "rank") error = "required | should be number";
      if (field === "percentile")
        error = "required | percentile should be 1-100";
      if (field === "score") error = "required | score should be 0-15";
    } else {
      if (field === "percentile" && (num < 1 || num > 100)) {
        error = "required | percentile should be 1-100";
      }
      if (field === "score" && (num < 0 || num > 15)) {
        error = "required | score should be 0-15";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSave = () => {
    validateField("rank", rank);
    validateField("percentile", percentile);
    validateField("score", score);

    if (!errors.rank && !errors.percentile && !errors.score) {
      setIsOpen(false);
    }
  };

  const scoreNum = Number(score);
  const donutData = [
    { name: "Score", value: scoreNum },
    { name: "Remaining", value: 15 - scoreNum },
  ];

  const graphData = [
    { percentile: 0, numberOfStudent: 1 },
    { percentile: 10, numberOfStudent: 2 },
    { percentile: 20, numberOfStudent: 5 },
    { percentile: 30, numberOfStudent: 8 },
    { percentile: 40, numberOfStudent: 15 },
    { percentile: 50, numberOfStudent: 30 },
    { percentile: 60, numberOfStudent: 20 },
    { percentile: 70, numberOfStudent: 10 },
    { percentile: 80, numberOfStudent: 5 },
    { percentile: 90, numberOfStudent: 4 },
    { percentile: 100, numberOfStudent: 3 },
  ];

  const yourPercentile = Number(percentile) || 0;

  return (
    <div className="p-7 font-sans">
      Skill Test
      <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-gray-300 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/html.png" alt="HTML" className="w-12 h-12" />
              <div>
                <h2 className="font-bold">Hyper Text Markup Language</h2>
                <p className="text-sm text-black">
                  Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
                </p>
              </div>
            </div>
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 shadow"
              onClick={() => setIsOpen(true)}
            >
              Update
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-300 px-6 py-6">
            <h3 className="font-bold mb-4">Quick Statistics</h3>
            <div className="flex justify-center items-center gap-x-10 text-sm text-gray-600">
              <div className="flex items-center space-x-3 pr-6 border-r border-gray-300">
                <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
                  <img
                    src="/trophy.png"
                    alt="Rank"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <div className="text-lg font-bold text-black">{rank}</div>
                  <div>YOUR RANK</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 px-6 border-r border-gray-300">
                <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
                  <img
                    src="/notepad.png"
                    alt="Percentile"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <div className="text-lg font-bold text-black">
                  {percentile}%
                  </div>
                  <div>PERCENTILE</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pl-6">
                <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
                  <img
                    src="/tick.png"
                    alt="Score"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <div className="text-lg font-bold text-black">
                    {score} / 15
                  </div>
                  <div>CORRECT ANSWERS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-300 px-6 py-4">
            <h3 className="font-bold mb-2">Comparison Graph</h3><br/>
            <p className="text-sm text-gray-600 mb-4">
              <strong className="text-black">
                You scored {percentile}% percentile
              </strong>{" "}
              which is lower than the average percentile 72% of all the
              engineers who took this assessment
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="percentile" domain={[0, 100]} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                  formatter={(value: any, name: string) =>
                    name === "numberOfStudent" ? [value, "Students"] : value
                  }
                />
                <Line
                  type="monotone"
                  dataKey="numberOfStudent"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ stroke: "#8884d8", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 6 }}
                />
                <ReferenceLine
                  x={yourPercentile}
                  stroke="gray"
                  strokeDasharray="3 3"
                  label={{
                    value: "your percentile",
                    position: "insideBottom",
                    offset: -10,
                    fill: "gray",
                    fontSize: 12,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-300 px-6 py-4">
            <h3 className="font-bold mb-4">Syllabus Wise Analysis</h3>
            <div className="space-y-3 text-sm">
              {[
                {
                  label: "HTML Tools, Forms, History",
                  value: 80,
                  color: "blue",
                },
                {
                  label: "Tags & References in HTML",
                  value: 60,
                  color: "orange",
                },
                {
                  label: "Tables & References in HTML",
                  value: 24,
                  color: "red",
                },
                { label: "Tables & CSS Basics", value: 96, color: "green" },
              ].map((item) => {
                const textColor = {
                  blue: "text-blue-600",
                  orange: "text-orange-600",
                  red: "text-red-600",
                  green: "text-green-600",
                }[item.color];
                const bgColor = {
                  blue: "bg-blue-100",
                  orange: "bg-orange-100",
                  red: "bg-red-100",
                  green: "bg-green-100",
                }[item.color];
                const fillColor = {
                  blue: "bg-blue-600",
                  orange: "bg-orange-500",
                  red: "bg-red-500",
                  green: "bg-green-600",
                }[item.color];

                return (
                  <div key={item.label}>
                    <div className="flex justify-between">
                      <span>{item.label}</span>
                      <span className={`font-semibold ${textColor}`}>
                        {item.value}%
                      </span>
                    </div><br/>
                    <div className={`w-full h-2 rounded-full ${bgColor}`}>
                      <div
                        className={`h-2 rounded-full ${fillColor}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <br />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-300 px-6 py-4 text-sm text-black">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Question Analysis</h3>
              <span className="text-blue-700 font-semibold">{score}/15</span>
            </div>
            <p className="mb-4">
              <strong className="text-gray-700">
                You scored {score} question correct out of 15.
              </strong>{" "}
              However it still needs some improvements
            </p>
            <div className="relative w-32 h-32 mx-auto">
              <PieChart width={128} height={128}>
                <Pie
                  data={donutData}
                  innerRadius={40}
                  outerRadius={64}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="#4169E1" />
                  <Cell fill="#e5e7eb" />
                </Pie>
              </PieChart>
              <img
                src="arrow.png"
                alt="Center Icon"
                className="absolute top-1/2 left-1/2 w-10 h-10 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div
          className="fixed inset-0 bg-black/20 transition-opacity"
          aria-hidden="true"
        />
        <div className="flex items-center justify-center min-h-screen px-4 relative z-50">
          <Dialog.Panel className="bg-white rounded-xl max-w-md w-full p-6 space-y-6 shadow-xl">
            <Dialog.Title className="text-xl font-bold text-black">
              Update scores
            </Dialog.Title>
            {[
              {
                label: "Update your Rank",
                field: "rank",
                value: rank,
                setValue: setRank,
                error: errors.rank,
              },
              {
                label: "Update your Percentile",
                field: "percentile",
                value: percentile,
                setValue: setPercentile,
                error: errors.percentile,
              },
              {
                label: "Update your Current Score (out of 15)",
                field: "score",
                value: score,
                setValue: setScore,
                error: errors.score,
              },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap w-[240px]">
                    {item.label}
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => {
                      item.setValue(e.target.value);
                      validateField(item.field, e.target.value);
                    }}
                    className="border border-blue-500 rounded px-3 py-1 w-20 focus:outline-none"
                  />
                </div>
                {item.error && (
                  <p className="text-xs text-red-600 mt-1 ml-[56px]">
                    {item.error}
                  </p>
                )}
              </div>
            ))}
            <div className="flex justify-end space-x-2 pt-4">
              <button
                className="border border-blue-800 text-blue-800 rounded px-4 py-1 hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                cancel
              </button>
              <button
                className="bg-blue-900 text-white px-4 py-1 rounded hover:bg-blue-800"
                onClick={handleSave}
              >
                save →
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default SkillTestDashboard;
