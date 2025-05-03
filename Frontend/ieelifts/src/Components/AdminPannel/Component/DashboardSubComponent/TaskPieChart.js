import React from "react";
import "./TaskPieChart.css";

const TaskPieChart = ({ totalTasks, completedTasks }) => {
  const percentage = (completedTasks / totalTasks) * 100;
  const radius = 20; // Adjusted radius to fit within 50x50 box
  const viewBox = `0 0 50 50`; // Adjusted viewBox to fit within 50x50 box
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className="circular-progress-bar">
      <div className="progress-ring">
        <svg
          width="50"
          height="50"
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
        
        >
          <circle className="background" cx="25" cy="25" r={radius} />

          <circle
            className="progress"
            cx="25"
            cy="25"
            r={radius}
            strokeLinecap="round"
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
     
            }}
          />
        </svg>
        <div className="progress-text">
          <span>{completedTasks}</span>/<span>{totalTasks}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskPieChart;
