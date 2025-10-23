const CircularProgress = ({ progress, size = 100, strokeWidth = 10,totalCompleteColor='#3b82f6',unCompleteColor="#e5e7eb" }) => {
    
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    const textFontSize = size / 5; // Adjust text size based on the size of the circle
  
    return (
      <svg width={size} height={size} style={{backgroundColor:'transparent'}}>
        <circle
          stroke={unCompleteColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={totalCompleteColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={textFontSize}
          fontWeight="bold"
          fill="#000"
        >
          {Math.round(progress)}%
        </text>
      </svg>
    );
  };
  

  export default CircularProgress;