import React, { useState } from "react";
import {
  Grid,
  // Typography,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardContent,
} from "@mui/material";
import DashboardCard from "../shared/DashboardCard";

const defaultLabReports = [
  { testName: "Electrocardiography", referredBy: "Dr. Rafiqul Islam", date: "28 Jan, 2024", comments: "Good! Take rest", result: "Normal", resultType: "success" },
  { testName: "Liver biopsy", referredBy: "Dr. Fahim Ahmed", date: "12 Jan, 2024", comments: "Waiting for diagram", result: "Hepatitis", resultType: "primary" },
];

const defaultPrescriptions = [
  { testName: "Pain Reliever", referredBy: "Dr. S. Kumar", date: "5 Feb, 2024", comments: "Take after meal", result: "Ibuprofen 400mg", resultType: "info" },
  { testName: "Antibiotic", referredBy: "Dr. A. Sharma", date: "3 Feb, 2024", comments: "Twice a day", result: "Amoxicillin 500mg", resultType: "warning" },
];

const defaultDiagnoses = [
  { testName: "Hypertension", referredBy: "Dr. P. Verma", date: "15 Jan, 2024", comments: "Monitor daily", result: "Stage 1", resultType: "error" },
  { testName: "Diabetes", referredBy: "Dr. M. Khan", date: "10 Jan, 2024", comments: "Control sugar intake", result: "Type 2", resultType: "primary" },
];

const defaultMedications = [
  { testName: "Blood Pressure Control", referredBy: "Dr. V. Singh", date: "2 Feb, 2024", comments: "Before bed", result: "Atenolol 50mg", resultType: "secondary" },
  { testName: "Cholesterol Control", referredBy: "Dr. A. Mehta", date: "1 Feb, 2024", comments: "With breakfast", result: "Atorvastatin 10mg", resultType: "success" },
];

const HealthDashboard = () => {
  const [category, setCategory] = useState("Lab Reports");
  const [sort, setSort] = useState("Recent");

  const getCategoryData = () => {
    switch (category) {
      case "Lab Reports":
        return defaultLabReports;
      case "Prescription":
        return defaultPrescriptions;
      case "Diagnosis":
        return defaultDiagnoses;
      case "Medication":
        return defaultMedications;
      default:
        return [];
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DashboardCard
          title="Health Records"
          action={
            <Select value={sort} size="small" onChange={(e) => setSort(e.target.value)}>
              <MenuItem value="Recent">Recent</MenuItem>
              <MenuItem value="Oldest">Oldest</MenuItem>
            </Select>
          }
        >
          <>
            <ToggleButtonGroup
              value={category}
              exclusive
              onChange={(e, newCategory) => newCategory && setCategory(newCategory)}
              aria-label="health categories"
            >
              <ToggleButton value="Lab Reports">Lab Reports</ToggleButton>
              <ToggleButton value="Prescription">Prescription</ToggleButton>
              <ToggleButton value="Medication">Medication</ToggleButton>
              <ToggleButton value="Diagnosis">Diagnosis</ToggleButton>
            </ToggleButtonGroup>

            <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 3, backgroundColor: "#e3f2fd" }}>
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Test Name</TableCell>
                      <TableCell>Referred by</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Comments</TableCell>
                      <TableCell>Result</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getCategoryData().map((report, index) => (
                      <TableRow key={index}>
                        <TableCell>{report.testName}</TableCell>
                        <TableCell>{report.referredBy}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.comments}</TableCell>
                        <TableCell>
                          <Chip
                            label={report.result}
                            color={report.resultType as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default HealthDashboard;
