import React, { PureComponent, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const MissionLineChart = ({ projects, tasks }) => {
  useEffect(() => {
    console.log('tasks in the chart', tasks);
  }, [tasks])
  // const data = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  const data = tasks?.map((task) => {
    return {
      name: task.title,
      uv: task.id,
      // pv: project.id,
      pv: (tasks.length / task.id) * 100,
    }
  })
  // const data = projects.list.map((project) => {
  //   return {
  //     name: project.title,
  //     uv: project.endTime,
  //     // pv: project.id,
  //     pv: (projects.list.length / project.id) * 100,
  //   }
  // })
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid horizontal="true" vertical="" />
        <XAxis dataKey="name" />
        <YAxis
          tickFormatter={(tick) => {
            return `${tick}%`;
          }}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}