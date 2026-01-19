import React from 'react'

const ProgressBar = ({value}) => {
    const getColor = () => {
    if (value > 60) return "bg-green-500";
    if (value >= 40) return "bg-yellow-400";
    return "bg-red-500";
  };
  return (
    <div className="w-full">
      {/* Progress Track */}
      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
        {/* Progress Fill */}
        <div
          className={`h-4 ${getColor()} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>

      {/* Label */}
      <p className="text-sm mt-1 font-medium">{value}%</p>
    </div>
  )
}

export default ProgressBar
