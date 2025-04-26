
// import React, { useState } from 'react';
// import { Select, MenuItem, ToggleButtonGroup, ToggleButton } from '@mui/material';
// // import { useTheme } from '@mui/material/styles';
// import DashboardCard from '@/app/PatientDashboard/components/shared/DashboardCard';
// import dynamic from "next/dynamic";
// import { ApexOptions } from "apexcharts";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// const HealthAnalytics = () => {
//     type HealthParameter = 'oxygen' | 'glucose' | 'hemoglobin';
//     const [parameter, setParameter] = useState<HealthParameter>('oxygen');

//     const handleParameterChange = (_event: React.MouseEvent<HTMLElement>, newParameter: HealthParameter | null) => {
//         if (newParameter !== null) {
//             setParameter(newParameter);
//         }
//     };

//     const colors: Record<HealthParameter, string> = {
//         oxygen: '#e91e63', 
//         glucose: '#4caf50', 
//         hemoglobin: '#673ab7'
//     };

//     const healthData: Record<HealthParameter, number[]> = {
//         oxygen: [98, 97, 96, 97, 99, 98, 97],
//         glucose: [110, 120, 115, 130, 125, 118, 122],
//         hemoglobin: [13.5, 14, 13.8, 14.2, 13.7, 14.5, 14]
//     };

//     const options: ApexOptions = {
//         chart: {
//             type: 'bar',
//             toolbar: { show: false },
//             height: 370,
//         },
//         colors: [colors[parameter]],
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 columnWidth: '50%',
//                 borderRadius: 6,
//                 borderRadiusApplication: 'end',
//                 borderRadiusWhenStacked: 'all',
//             },
//         },
//         stroke: {
//             show: true,
//             width: 2,
//             colors: [colors[parameter]],
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         legend: {
//             show: false,
//         },
//         grid: {
//             borderColor: 'rgba(0,0,0,0.1)',
//             strokeDashArray: 3,
//         },
//         xaxis: {
//             categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//             axisBorder: { show: false },
//         },
//         tooltip: {
//             theme: 'dark',
//         },
//     };

//     const series = [{
//         name: parameter.charAt(0).toUpperCase() + parameter.slice(1),
//         data: healthData[parameter],
//     }];

//     return (
//         <DashboardCard title="Health Analytics" 
//         >
//             <ToggleButtonGroup
//                 value={parameter}
//                 exclusive
//                 onChange={handleParameterChange}
//                 aria-label="health parameters"
//             >
//                 <ToggleButton value="oxygen">Oxygen Level</ToggleButton>
//                 <ToggleButton value="glucose">Glucose Level</ToggleButton>
//                 <ToggleButton value="hemoglobin">Hemoglobin</ToggleButton>
//             </ToggleButtonGroup>
//             <Chart options={options} series={series} type="bar" height={370} width={"100%"} />
//         </DashboardCard>
//     );
// };

// export default HealthAnalytics;
import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import DashboardCard from '@/app/PatientDashboard/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const HealthAnalytics = () => {
    type HealthParameter = 'oxygen' | 'glucose' | 'hemoglobin';
    const [parameter, setParameter] = useState<HealthParameter>('oxygen');

    const handleParameterChange = (_event: React.MouseEvent<HTMLElement>, newParameter: HealthParameter | null) => {
        if (newParameter !== null) {
            setParameter(newParameter);
        }
    };

    const colors: Record<HealthParameter, string> = {
        oxygen: '#e91e63', 
        glucose: '#4caf50', 
        hemoglobin: '#673ab7'
    };

    const healthData: Record<HealthParameter, number[]> = {
        oxygen: [98, 97, 96, 97, 99, 98, 97],
        glucose: [110, 120, 115, 130, 125, 118, 122],
        hemoglobin: [13.5, 14, 13.8, 14.2, 13.7, 14.5, 14]
    };

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            height: 320,
        },
        colors: [colors[parameter]],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 6,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 2,
            colors: [colors[parameter]],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
        },
        xaxis: {
            categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            axisBorder: { show: false },
        },
        tooltip: {
            theme: 'dark',
        },
    };

    const series = [{
        name: parameter.charAt(0).toUpperCase() + parameter.slice(1),
        data: healthData[parameter],
    }];

    return (
        <DashboardCard title="Health Analytics" style={{ padding: '5px' }}>
            <ToggleButtonGroup
                value={parameter}
                exclusive
                onChange={handleParameterChange}
                aria-label="health parameters"
            >
                <ToggleButton value="oxygen">Oxygen Level</ToggleButton>
                <ToggleButton value="glucose">Glucose Level</ToggleButton>
                <ToggleButton value="hemoglobin">Hemoglobin</ToggleButton>
            </ToggleButtonGroup>
            <Chart options={options} series={series} type="bar" height={358} width={"100%"} />
            
            <div style={{ 
                marginTop: '15px', 
                padding: '15px', 
                background: 'linear-gradient(135deg, #f3f3f3, #e0e0e0)', 
                borderRadius: '10px',
                boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Arial, sans-serif',
                color: '#333',
                lineHeight: '1.5'
            }}>
                <h3 style={{ color: '#00796b', fontSize: '18px', fontWeight: 'bold' }}>Why Health Analytics Matter</h3>
                <p><strong style={{ color: '#d32f2f' }}>Oxygen Levels:</strong> Maintaining optimal oxygen levels is crucial for cellular function. Low levels may indicate respiratory or circulatory issues.</p>
                <p><strong style={{ color: '#388e3c' }}>Glucose Levels:</strong> Blood glucose monitoring helps manage diabetes and prevent complications like nerve damage and heart disease.</p>
                <p><strong style={{ color: '#512da8' }}>Hemoglobin:</strong> Hemoglobin is vital for oxygen transport. Low levels may signal anemia, leading to fatigue and reduced organ function.</p>
                <p style={{ fontStyle: 'italic', fontSize: '13px' }}>Regular monitoring and analysis of these parameters help in early detection of potential health issues, allowing timely medical intervention.</p>
            </div>
        </DashboardCard>
    );
};

export default HealthAnalytics;
