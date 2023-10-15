import React from 'react';
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SkillLevelCharts = ({ data }) => {
    // skill level chart
    const levelColors = {
        Basic: '#FF8080',
        Intermediate: '#D80032',
        Advanced: '#3D0C11',
    };

    const levelCounts = data.reduce((acc, skill) => {
        acc[skill.level] = (acc[skill.level] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(levelCounts).map(level => ({
        level,
        count: levelCounts[level],
        fill: levelColors[level],
    }));

    const renderCustomTooltip = ({ payload }) => {
        if (payload && payload.length) {
            const { level, count, fill } = payload[0].payload;
            return (
                <div className='text-xs md:text-sm bg-white opacity-80 p-2 rounded-sm'>
                    <span style={{ color: fill }}>{level}:</span> {count} Skills
                </div>
            );
        }
        return null;
    };
    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Tooltip content={renderCustomTooltip} />
                    <Legend
                        wrapperStyle={{ fontSize: '12px' }}
                        payload={Object.keys(levelColors).map(level => ({
                            value: level,
                            id: level,
                            color: levelColors[level],
                        }))}
                    />
                    <Pie
                        dataKey="count"
                        data={chartData}
                        outerRadius={window.innerWidth >= 768 ? 100 : 50}
                        fill="#8884d8"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = 25 + innerRadius + (outerRadius - innerRadius);
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);

                            return (
                                <text
                                    x={x}
                                    y={y}
                                    fill="#D80032"
                                    textAnchor={x > cx ? 'start' : 'end'}
                                    dominantBaseline="central"
                                    fontSize="14px"
                                >
                                    {chartData[index].count}
                                </text>
                            );
                        }}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}

export default SkillLevelCharts