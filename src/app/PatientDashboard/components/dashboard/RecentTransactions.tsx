
// import {
//     Typography,
//     Box,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow,
//     Chip,
//     Card,
   
//     Avatar,
//     Stack,
//     IconButton,
//     TextField,
//     MenuItem
//   } from "@mui/material";
//   import { IconDotsVertical } from "@tabler/icons-react";
//   import { styled } from "@mui/system";
  
//   // Styled Card with Soft Colors
//   const SoftCard = styled(Card)({
//     background: "#F9FAFB", // Very Light Background
//     borderRadius: "15px",
//     boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
//     padding: "20px",
//     overflow: "hidden",
//   });
  
//   // Appointment Data (Replace with Backend)
//   const appointments = [
//     { id: 1, type: "Cardiogram", doctor: "Dr. Calvin Smith", date: "13 March", icon: "💙", bg: "#E3F2FD" },
//     { id: 2, type: "Checkup", doctor: "Dr. Cristino Paul", date: "5 May", icon: "🩺", bg: "#E8F5E9" },
//     { id: 3, type: "Covid Test", doctor: "Dr. Alia Reynolds", date: "19 June", icon: "🦠", bg: "#FFF3E0" },
//     { id: 4, type: "Dentist", doctor: "Dr. Toni Kevin", date: "20 June", icon: "🦷", bg: "#F3E5F5" },
//     { id: 5, type: "Eye Test", doctor: "Dr. Raj Malhotra", date: "31 Aug", icon: "👁️", bg: "#FFEBEE" },
//   ];
  
//   // Medical History Data (Replace with Backend)
//   const medicalHistory = [
//     { id: 1, doctor: "Dr. Jenny Smith", diagnosis: "Dermatology", date: "12.05.2022", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
//     { id: 2, doctor: "Andrea Lalema", diagnosis: "Cardiology", date: "10.05.2022", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
//     { id: 3, doctor: "Dr. William Stephin", diagnosis: "Neurology", date: "12.05.2022", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
//   ];
  
//   const AppointmentList = () => {
//     return (
//       <SoftCard>
//         <Stack direction="row" justifyContent="space-between">
//           <Typography variant="h6" fontWeight={600}>
//             Doctor's Appointment
//           </Typography>
//           <IconButton>
//             <IconDotsVertical size={20} />
//           </IconButton>
//         </Stack>
  
//         {/* Date Selector */}
//         <TextField
//           select
//           fullWidth
//           size="small"
//           margin="normal"
//           label="Select Date"
//           defaultValue=""
//           sx={{
//             bgcolor: "#fff",
//             borderRadius: "8px",
//             "& fieldset": { border: "none" },
//           }}
//         >
//           {appointments.map((appt) => (
//             <MenuItem key={appt.id} value={appt.date}>
//               {appt.date}
//             </MenuItem>
//           ))}
//         </TextField>
  
//         {/* Appointment Cards */}
//         {appointments.map((appt) => (
//           <Box
//             key={appt.id}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               p: 2,
//               my: 1,
//               borderRadius: 3,
//               backgroundColor: appt.bg,
//               color: "#333",
//               boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Typography fontSize={24} mr={2}>
//               {appt.icon}
//             </Typography>
//             <Box>
//               <Typography fontWeight={600}>{appt.type}</Typography>
//               <Typography variant="body2">{appt.doctor}</Typography>
//             </Box>
//             <Typography sx={{ ml: "auto", fontWeight: 600 }}>{appt.date}</Typography>
//           </Box>
//         ))}
//       </SoftCard>
//     );
//   };
  
//   const MedicalHistoryCard = () => {
//     return (
//       <SoftCard>
//         <Stack direction="row" justifyContent="space-between">
//           <Typography variant="h6" fontWeight={600}>
//             Medical History
//           </Typography>
//           <Typography variant="body2" sx={{ cursor: "pointer", color: "#1976D2" }}>
//             Show all
//           </Typography>
//         </Stack>
  
//         <Box sx={{ overflow: "auto" }}>
//           <Table sx={{ mt: 2 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600 }}>Doctor</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>Diagnosis</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
//                 <TableCell align="right" sx={{ fontWeight: 600 }}>
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {medicalHistory.map((record) => (
//                 <TableRow key={record.id}>
//                   <TableCell>
//                     <Stack direction="row" alignItems="center" spacing={1}>
//                       <Avatar src={record.avatar} />
//                       <Typography fontWeight={500}>{record.doctor}</Typography>
//                     </Stack>
//                   </TableCell>
//                   <TableCell>{record.diagnosis}</TableCell>
//                   <TableCell>{record.date}</TableCell>
//                   <TableCell align="right">
//                     <Chip label="Reschedule" color="primary" size="small" sx={{ bgcolor: "#E3F2FD", color: "#1976D2" }} />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       </SoftCard>
//     );
//   };
  
//   const HealthDashboard = () => {
//     return (
//       <Box sx={{ p: 3, display: "grid", gap: 2 }}>
//         <AppointmentList />
//         <MedicalHistoryCard />
//       </Box>
//     );
//   };
  
//   export default HealthDashboard;
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Card,
  Avatar,
  Stack,
  IconButton,
  TextField,
  MenuItem
} from "@mui/material";
import { IconDotsVertical } from "@tabler/icons-react";
import { styled } from "@mui/system";

// Styled Card with Soft Colors
const SoftCard = styled(Card)({
  background: "#F9FAFB",
  borderRadius: "15px",
  boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
  padding: "20px",
  overflow: "hidden",
});

// Appointment Data (Replace with Backend)
const appointments = [
  { id: 1, type: "Cardiogram", doctor: "Dr. Calvin Smith", date: "13 March", icon: "💙", bg: "#E3F2FD" },
  { id: 2, type: "Checkup", doctor: "Dr. Cristino Paul", date: "5 May", icon: "🩺", bg: "#E8F5E9" },
  { id: 3, type: "Covid Test", doctor: "Dr. Alia Reynolds", date: "19 June", icon: "🦠", bg: "#FFF3E0" },
  { id: 4, type: "Dentist", doctor: "Dr. Toni Kevin", date: "20 June", icon: "🦷", bg: "#F3E5F5" },
  { id: 5, type: "Eye Test", doctor: "Dr. Raj Malhotra", date: "31 Aug", icon: "👁️", bg: "#FFEBEE" },
];

// Medical History Data (Replace with Backend)
const medicalHistory = [
  { id: 1, doctor: "Dr. Jenny Smith", diagnosis: "Dermatology", date: "12.05.2022", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, doctor: "Andrea Lalema", diagnosis: "Cardiology", date: "10.05.2022", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, doctor: "Dr. William Stephin", diagnosis: "Neurology", date: "12.05.2022", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
];

const AppointmentList = () => {
  return (
    <SoftCard>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" fontWeight={600}>
          Doctor&apos;s Appointment
        </Typography>
        <IconButton>
          <IconDotsVertical size={20} />
        </IconButton>
      </Stack>

      {/* Date Selector */}
      <TextField
        select
        fullWidth
        size="small"
        margin="normal"
        label="Select Date"
        defaultValue=""
        sx={{
          bgcolor: "#fff",
          borderRadius: "8px",
          "& fieldset": { border: "none" },
        }}
      >
        {appointments.map((appt) => (
          <MenuItem key={appt.id} value={appt.date}>
            {appt.date}
          </MenuItem>
        ))}
      </TextField>

      {/* Appointment Cards */}
      {appointments.map((appt) => (
        <Box
          key={appt.id}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            my: 1,
            borderRadius: 3,
            backgroundColor: appt.bg,
            color: "#333",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <Typography fontSize={24} mr={2}>
            {appt.icon}
          </Typography>
          <Box>
            <Typography fontWeight={600}>{appt.type}</Typography>
            <Typography variant="body2">{appt.doctor}</Typography>
          </Box>
          <Typography sx={{ ml: "auto", fontWeight: 600 }}>{appt.date}</Typography>
        </Box>
      ))}
    </SoftCard>
  );
};

const MedicalHistoryCard = () => {
  return (
    <SoftCard>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" fontWeight={600}>
          Medical History
        </Typography>
        <Typography variant="body2" sx={{ cursor: "pointer", color: "#1976D2" }}>
          Show all
        </Typography>
      </Stack>

      <Box sx={{ overflow: "auto" }}>
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Doctor</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Diagnosis</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicalHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar src={record.avatar} />
                    <Typography fontWeight={500}>{record.doctor}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell align="right">
                  <Chip label="Reschedule" color="primary" size="small" sx={{ bgcolor: "#E3F2FD", color: "#1976D2" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </SoftCard>
  );
};

const HealthDashboard = () => {
  return (
    <Box sx={{ p: 3, display: "grid", gap: 2 }}>
      <AppointmentList />
      <MedicalHistoryCard />
    </Box>
  );
};

export default HealthDashboard;
