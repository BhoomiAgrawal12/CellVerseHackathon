
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import { useTheme } from '@mui/material/styles';
// import { Stack, Typography, Avatar, Fab } from '@mui/material';
// import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
// import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

// const MonthlyEarnings = () => {
//   // chart color
//   const theme = useTheme();
//   const secondary = theme.palette.secondary.main;
//   const secondarylight = '#f5fcff';
//   const errorlight = '#fdede8';

//   // chart
//   const optionscolumnchart: any = {
//     chart: {
//       type: 'area',
//       fontFamily: "'Plus Jakarta Sans', sans-serif;",
//       foreColor: '#adb0bb',
//       toolbar: {
//         show: false,
//       },
//       height: 60,
//       sparkline: {
//         enabled: true,
//       },
//       group: 'sparklines',
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 2,
//     },
//     fill: {
//       colors: [secondarylight],
//       type: 'solid',
//       opacity: 0.05,
//     },
//     markers: {
//       size: 0,
//     },
//     tooltip: {
//       theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
//     },
//   };
//   const seriescolumnchart: any = [
//     {
//       name: '',
//       color: secondary,
//       data: [25, 66, 20, 40, 12, 58, 20],
//     },
//   ];

//   return (
//     <DashboardCard
//       title="Monthly Earnings"
//       action={
//         <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
//           <IconCurrencyDollar width={24} />
//         </Fab>
//       }
//       footer={
//         <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height={60} width={"100%"} />
//       }
//     >
//       <>
//         <Typography variant="h3" fontWeight="700" mt="-20px">
//           $6,820
//         </Typography>
//         <Stack direction="row" spacing={1} my={1} alignItems="center">
//           <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
//             <IconArrowDownRight width={20} color="#FA896B" />
//           </Avatar>
//           <Typography variant="subtitle2" fontWeight="600">
//             +9%
//           </Typography>
//           <Typography variant="subtitle2" color="textSecondary">
//             last year
//           </Typography>
//         </Stack>
//       </>
//     </DashboardCard>
//   );
// };

// export default MonthlyEarnings;
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Box, Card } from "@mui/material";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";

const ActivityReview = () => {
  const theme = useTheme();

  // Chart Configuration
  const options: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    labels: ["Activity Hours", "Resting Hours", "Sleeping Hours"],
    colors: ["#64b5f6", "#81c784", "#e57373"], // Soft blue, green, red
    legend: { show: false },
    dataLabels: { enabled: true },
    stroke: { width: 2 },
    tooltip: { theme: theme.palette.mode === "dark" ? "dark" : "light" },
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { width: 250 } },
      },
    ],
  };

  const series = [54, 20, 26];

  console.log("Chart Options:", JSON.stringify(options, null, 2));
  console.log("Series Data:", series);

  return (
    <Card sx={{ bgcolor: "#f8f9fa", borderRadius: 3, p: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" textAlign="center">
        Activity Status
      </Typography>
      <Box sx={{ width: "100%", minHeight: 200 }}>
        {/* Chart Component */}
        <Chart options={options} series={series} type="donut" height={200} />
      </Box>

      {/* Legend */}
      <Stack spacing={1} mt={2} sx={{ width: "100%" }}>
        {[
          { label: "Activity Hours", color: "#64b5f6", value: "54%", icon: <IconArrowUpRight color="#43A047" size={18} /> },
          { label: "Resting Hours", color: "#81c784", value: "20%", icon: <IconArrowUpRight color="#43A047" size={18} /> },
          { label: "Sleeping Hours", color: "#e57373", value: "26%", icon: <IconArrowDownRight color="#E53935" size={18} /> },
        ].map((item, index) => (
          <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: 12, height: 12, bgcolor: item.color, borderRadius: "50%" }} />
              <Typography>{item.label}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography fontWeight="bold">{item.value}</Typography>
              {item.icon}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};

export default ActivityReview;
