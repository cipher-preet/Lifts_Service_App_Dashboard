import React from 'react'

const ProgressBar = () => {

    const percentage = (411 / 500) * 100;
    const radius = 20; // Adjusted radius to fit within 50x50 box
    const viewBox = `0 0 50 50`; // Adjusted viewBox to fit within 50x50 box
    const dashArray = radius * Math.PI * 2;
    const strokeWidth = 3; 
    const dashOffset = dashArray - (dashArray * percentage) / 100;
    return (
        <div>
            <div className="revenue-circular-progress-bar">
                <div className="revenue-progress-ring" strokeWidth={strokeWidth}     >
                    <svg
                        width="200"
                        height="200"
                        viewBox={viewBox}
                        xmlns="http://www.w3.org/2000/svg"

                    >
                        <circle className="revenue-background" cx="25" cy="25" r={radius}   strokeWidth={strokeWidth} style={{strokeWidth: strokeWidth,}}  />
                        <circle
                            className="revenue-progress"
                            cx="25"
                            cy="25"
                            r={radius}
                            strokeLinecap="round"
                           strokeWidth={strokeWidth} 
                            style={{
                                strokeWidth: strokeWidth, 
                                strokeDasharray: dashArray,
                                strokeDashoffset: dashOffset,

                            }}
                        />
                    </svg>
                    <div className="revenue-progress-text">
                       <p style={{textAlign:'center'}}> <span>200</span> <br/> Average Discount</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar