// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import { useTheme } from '@mui/material/styles';
// import { Grid, Stack, Typography, Avatar } from '@mui/material';
// import { IconArrowUpLeft } from '@tabler/icons-react';

// import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

// const YearlyBreakup = () => {
//   // chart color
//   const theme = useTheme();
//   const primary = theme.palette.primary.main;
//   const primarylight = '#ecf2ff';
//   const successlight = theme.palette.success.light;

//   // chart
//   const optionscolumnchart: any = {
//     chart: {
//       type: 'donut',
//       fontFamily: "'Plus Jakarta Sans', sans-serif;",
//       foreColor: '#adb0bb',
//       toolbar: {
//         show: false,
//       },
//       height: 155,
//     },
//     colors: [primary, primarylight, '#F9F9FD'],
//     plotOptions: {
//       pie: {
//         startAngle: 0,
//         endAngle: 360,
//         donut: {
//           size: '75%',
//           background: 'transparent',
//         },
//       },
//     },
//     tooltip: {
//       theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
//       fillSeriesColor: false,
//     },
//     stroke: {
//       show: false,
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     legend: {
//       show: false,
//     },
//     responsive: [
//       {
//         breakpoint: 991,
//         options: {
//           chart: {
//             width: 120,
//           },
//         },
//       },
//     ],
//   };
//   const seriescolumnchart: any = [38, 40, 25];

//   return (
//     <DashboardCard title="Yearly Breakup">
//       <Grid container spacing={3}>
//         {/* column */}
//         <Grid item xs={7} sm={7}>
//           <Typography variant="h3" fontWeight="700">
//             $36,358
//           </Typography>
//           <Stack direction="row" spacing={1} mt={1} alignItems="center">
//             <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
//               <IconArrowUpLeft width={20} color="#39B69A" />
//             </Avatar>
//             <Typography variant="subtitle2" fontWeight="600">
//               +9%
//             </Typography>
//             <Typography variant="subtitle2" color="textSecondary">
//               last year
//             </Typography>
//           </Stack>
//           <Stack spacing={3} mt={5} direction="row">
//             <Stack direction="row" spacing={1} alignItems="center">
//               <Avatar
//                 sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
//               ></Avatar>
//               <Typography variant="subtitle2" color="textSecondary">
//                 2022
//               </Typography>
//             </Stack>
//             <Stack direction="row" spacing={1} alignItems="center">
//               <Avatar
//                 sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
//               ></Avatar>
//               <Typography variant="subtitle2" color="textSecondary">
//                 2023
//               </Typography>
//             </Stack>
//           </Stack>
//         </Grid>
//         {/* column */}
//         <Grid item xs={5} sm={5}>
//           <Chart
//             options={optionscolumnchart}
//             series={seriescolumnchart}
//             type="donut"
//             height={150} width={"100%"}
//           />
//         </Grid>
//       </Grid>
//     </DashboardCard>
//   );
// };

// export default YearlyBreakup;
import { useState } from "react";
import { Box, Typography, Slider, Paper } from "@mui/material";
import DashboardCard from "@/app/PatientDashboard/components/shared/DashboardCard";

const BMICalculator = () => {
  const [weight, setWeight] = useState<number>(68);
  const [height, setHeight] = useState<number>(160);

  const bmi: number = weight / (height / 100) ** 2;
  let category = "Normal";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi > 24.9) category = "Overweight";

  return (
    <DashboardCard
      title="Body Mass Index"
      sx={{ backgroundColor: "#f4f6f8", padding: 3 }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        p={2}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 1,
            textAlign: "center",
            backgroundColor: "#e3f2fd",
            width: 140,
          }}
        >
          <Typography variant="h6">Weight</Typography>
          <Typography variant="h5" fontWeight={700} color="#1e88e5">
            {weight} kg
          </Typography>
          <Slider
            value={weight}
            onChange={(e, val) => setWeight(Array.isArray(val) ? val[0] : val)}
            step={1}
            min={40}
            max={120}
            sx={{ width: 120, color: "#1e88e5" }}
          />
        </Paper>
        <Paper
          elevation={3}
          sx={{
            padding: 1,
            textAlign: "center",
            backgroundColor: "#fce4ec",
            width: 140,
          }}
        >
          <Typography variant="h6">Height</Typography>
          <Typography variant="h5" fontWeight={700} color="#d81b60">
            {height} cm
          </Typography>
          <Slider
            value={height}
            onChange={(e, val) => setHeight(Array.isArray(val) ? val[0] : val)}
            step={1}
            min={140}
            max={200}
            sx={{ width: 120, color: "#d81b60" }}
          />
        </Paper>
      </Box>
      <Box mt={3} textAlign="center">
        <Typography variant="h5" fontWeight={700} color="#4caf50">
          BMI: {bmi}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Category: {category}
        </Typography>
        <Box
          mt={2}
          width="80%"
          mx="auto"
          height={8}
          bgcolor="#e0e0e0"
          borderRadius={4}
        >
          <Box
            width={bmi < 18.5 ? "25%" : bmi > 24.9 ? "75%" : "50%"}
            height="100%"
            bgcolor="#4caf50"
            borderRadius={4}
          />
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default BMICalculator;
