
import React from "react";
import { Grid, Typography, Card, CardContent, Avatar } from "@mui/material";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { IconHeart, IconTemperature, IconDroplet, IconMoon } from "@tabler/icons-react";



const healthData = [
  {
    title: "Heart Rate",
    icon: <IconHeart size={24} color="#ff4757" />, 
    value: "110 bpm",
    trend: "+40% vs last month",
    trendColor: "green",
    graphType: "line",
    graphColor: "#ff4757",
    bgColor: "#ffe6e6",
    data: [
      { x: 0, y: 20 },
      { x: 1, y: 60 },
      { x: 2, y: 90 },
      { x: 3, y: 50 },
      { x: 4, y: 70 },
      { x: 5, y: 30 }
    ]
  },
  {
    title: "Temperature",
    icon: <IconTemperature size={24} color="#1e90ff" />, 
    value: "38.6 °C",
    trend: "-20% vs last month",
    trendColor: "red",
    graphType: "bar",
    graphColor: "#1e90ff",
    bgColor: "#e6f2ff",
    data: [
      { x: 1, y: 15 },
      { x: 10, y: 20 },
      { x: 20, y: 25 },
      { x: 30, y: 22 },
      { x: 40, y: 27 },
      { x: 50, y: 24 },
      { x: 60, y: 30 }
    ]
  }
,
{
  title: "Blood Pressure",
  icon: <IconDroplet size={24} color="#673ab7" />, 
  value: "120 mm/Hg",
  trend: "-40% vs last month",
  trendColor: "red",
  graphType: "bar",
  graphColor: "#673ab7",
  bgColor: "#ede7f6",
  data: [
    { x: 1, y: 60 },
    { x: 2, y: 70 },
    { x: 3, y: 75 },
    { x: 4, y: 80 },
    { x: 5, y: 90 },
    { x: 6, y: 95 },
    { x: 7, y: 100 }
  ]
},
{
  title: "Sleep",
  icon: <IconMoon size={24} color="#ff9800" />, 
  value: "7h 30m",
  trend: "-10% vs last month",
  trendColor: "red",
  graphType: "line",
  graphColor: "#ff9800",
  bgColor: "#fff3e0",
  data: [
    { x: 0, y: 20 },
    { x: 1, y: 21 },
    { x: 2, y: 20.5 },
    { x: 3, y: 21.2 },
    { x: 4, y: 21 },
    { x: 5, y: 22 }
  ]
}
];



const HealthDashboard = () => {
  
  return (
    <>
      <Grid container spacing={3}>
        {healthData.map((card, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, backgroundColor: card.bgColor }}>
              <CardContent>
                <Typography variant="h6" display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: "transparent", mr: 1 }}>{card.icon}</Avatar>
                  {card.title}
                </Typography>
                <ResponsiveContainer width="100%" height={80}>
                  {card.graphType === "line" ? (
                    <LineChart data={card.data}>
                      <XAxis dataKey="x" hide />
                      <YAxis hide />
                      <Tooltip />
                      <Line type="monotone" dataKey="y" stroke={card.graphColor} strokeWidth={2} />
                    </LineChart>
                  ) : (
                    <BarChart data={card.data}>
                      <XAxis dataKey="x" hide />
                      <YAxis hide />
                      <Tooltip />
                      <Bar dataKey="y" fill={card.graphColor} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
                <Typography variant="h5" mt={1}>{card.value}</Typography>
                <Typography variant="body2" color={card.trendColor}>{card.trend}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      
    </>
  );
};

export default HealthDashboard;
