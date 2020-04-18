import React from 'react'
import { PieChart, Pie, Cell } from 'recharts';

export default (props) => {
    const data = [
        {
            name: "dislike", value: parseInt(props.dislikeCount)
        },{
            name: "like", value: parseInt(props.likeCount)
        }
    ]
    const colors = ["#f5f5f5", "#212121"]
    const size = props.size
    return (
        <PieChart width={size} height={size}>
            <Pie data={data} dataKey="value" fill="#8884d8" startAngle={90} endAngle={360+90} isAnimationActive={false}>
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                    ))
                }
            </Pie>
        </PieChart>
    );
}