"use client";

import { Heart, Droplet, Activity, TrendingUp, TrendingDown } from "lucide-react";

const PatientWelcomeSection = () => {
  const healthMetrics = [
    {
      title: "Blood Pressure",
      value: "110/70",
      icon: <Heart className="w-8 h-8" />,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      trend: "up",
      trendValue: "10% Higher Then Last Month",
      trendColor: "text-green-600"
    },
    {
      title: "Blood Pressure",
      value: "650",
      icon: <Heart className="w-8 h-8" />,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      trend: "down",
      trendValue: "0.7% Less Then Last Month",
      trendColor: "text-orange-600"
    },
    {
      title: "Glucose Level",
      value: "88-75",
      icon: <Droplet className="w-8 h-8" />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-500",
      trend: "up",
      trendValue: "12% Higher Then Last Month",
      trendColor: "text-green-600"
    },
    {
      title: "Blood Count",
      value: "9,456/mL",
      icon: <Activity className="w-8 h-8" />,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
      trend: "down",
      trendValue: "22% Less Then Last Month",
      trendColor: "text-orange-600"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-8">
          {/* Doctor Illustrations - Reduced width */}
          <div className="flex-shrink-0">
            <img src="/assets/welcome.png" alt="Doctors" className="w-48 h-auto" />
          </div>

          {/* Welcome Text */}
          <div className="flex-1">
            <p className="text-gray-600 text-sm mb-1">Welcome back</p>
            <h2 className="text-3xl font-bold text-blue-500 mb-3">Cara Stevens!</h2>
            <p className="text-gray-700 leading-relaxed">
              We would like to take this opportunity to welcome you to our practice and to thank you for choosing our physicians to participate in your healthcare. We look forward to providing you with personalized, comprehensive health care focusing on wellness and prevention.
            </p>
          </div>

          {/* Settings Icon */}
       
        </div>
      </div>

      {/* Health Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
            {/* Icon and Value in same row */}
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 ${metric.iconBg} rounded-xl flex items-center justify-center ${metric.iconColor}`}>
                {metric.icon}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{metric.value}</p>
              </div>
            </div>

            {/* Metric Title */}
            <h3 className="text-gray-800 font-semibold mb-2 text-sm">{metric.title}</h3>

            {/* Trend Indicator */}
            <div className="flex items-center gap-1">
              {metric.trend === "up" ? (
                <TrendingUp className={`w-3.5 h-3.5 ${metric.trendColor}`} />
              ) : (
                <TrendingDown className={`w-3.5 h-3.5 ${metric.trendColor}`} />
              )}
              <span className={`text-xs ${metric.trendColor}`}>
                {metric.trendValue}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientWelcomeSection;