// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { usePredictionStore } from '../store/usePredictionStore';

// export const PatientPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { patientDetails, setPatientDetails } = usePredictionStore();
//   const [formData, setFormData] = React.useState(patientDetails);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setPatientDetails(formData);
//     navigate('/symptoms');
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-8">Patient Information</h1>
      
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Age</label>
//             <input
//               type="number"
//               required
//               min="0"
//               max="150"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               value={formData.age}
//               onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Gender</label>
//             <select
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               value={formData.gender}
//               onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//             >
//               <option value="">Select gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>

//         <div className="mt-6">
//           <h2 className="text-lg font-semibold mb-4">Medical Conditions</h2>
//           <div className="space-y-4">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="highBP"
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 checked={formData.hasHighBP}
//                 onChange={(e) => setFormData({ ...formData, hasHighBP: e.target.checked })}
//               />
//               <label htmlFor="highBP" className="ml-2 block text-sm text-gray-700">
//                 High Blood Pressure
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="diabetes"
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 checked={formData.hasDiabetes}
//                 onChange={(e) => setFormData({ ...formData, hasDiabetes: e.target.checked })}
//               />
//               <label htmlFor="diabetes" className="ml-2 block text-sm text-gray-700">
//                 Diabetes
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="cholesterol"
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 checked={formData.hasHighCholesterol}
//                 onChange={(e) => setFormData({ ...formData, hasHighCholesterol: e.target.checked })}
//               />
//               <label htmlFor="cholesterol" className="ml-2 block text-sm text-gray-700">
//                 High Cholesterol
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6">
//           <label className="block text-sm font-medium text-gray-700">Allergies (comma-separated)</label>
//           <input
//             type="text"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             value={formData.hasAllergies.join(', ')}
//             onChange={(e) => setFormData({ ...formData, hasAllergies: e.target.value.split(',').map(s => s.trim()) })}
//             placeholder="e.g., peanuts, dairy, shellfish"
//           />
//         </div>

//         <div className="mt-6">
//           <label className="block text-sm font-medium text-gray-700">Other Medical Conditions</label>
//           <textarea
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             rows={3}
//             value={formData.otherConditions}
//             onChange={(e) => setFormData({ ...formData, otherConditions: e.target.value })}
//             placeholder="Please list any other medical conditions..."
//           />
//         </div>

//         <div className="mt-8 flex justify-end">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Next: Select Symptoms
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePredictionStore } from '../store/usePredictionStore';
import { TextField, FormControl, MenuItem, Select, InputLabel, Checkbox, FormControlLabel, Button, Card, CardContent, Typography } from '@mui/material';
import { Person, Cake, NavigateNext } from '@mui/icons-material';

export const PatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { patientDetails, setPatientDetails } = usePredictionStore();
  const [formData, setFormData] = React.useState(patientDetails);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPatientDetails(formData);
    navigate('/symptoms');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-6">
      <Card className="max-w-3xl w-full shadow-xl rounded-xl p-8 bg-white">
        <CardContent>
          <Typography variant="h4" className="text-center text-blue-700 font-bold mb-6 flex items-center justify-center">
            📚 Patient Information
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormControl fullWidth>
              <InputLabel>Name</InputLabel>
              <TextField
                required
                InputProps={{ startAdornment: <Person className="mr-2 text-gray-500" /> }}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Age</InputLabel>
              <TextField
                type="number"
                required
                InputProps={{ startAdornment: <Cake className="mr-2 text-gray-500" /> }}
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="h6" className="text-gray-800 font-semibold mt-6">Medical Conditions</Typography>
            <div className="grid grid-cols-2 gap-4">
              <FormControlLabel control={<Checkbox checked={formData.hasHighBP} onChange={(e) => setFormData({ ...formData, hasHighBP: e.target.checked })} />} label="High Blood Pressure" />
              <FormControlLabel control={<Checkbox checked={formData.hasDiabetes} onChange={(e) => setFormData({ ...formData, hasDiabetes: e.target.checked })} />} label="Diabetes" />
              <FormControlLabel control={<Checkbox checked={formData.hasHighCholesterol} onChange={(e) => setFormData({ ...formData, hasHighCholesterol: e.target.checked })} />} label="High Cholesterol" />
            </div>

            <FormControl fullWidth>
              <InputLabel>Allergies (comma-separated)</InputLabel>
              <TextField
                value={formData.hasAllergies.join(', ')}
                onChange={(e) => setFormData({ ...formData, hasAllergies: e.target.value.split(',').map(s => s.trim()) })}
                placeholder="e.g., peanuts, dairy, shellfish"
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Other Medical Conditions</InputLabel>
              <TextField
                multiline
                rows={3}
                value={formData.otherConditions}
                onChange={(e) => setFormData({ ...formData, otherConditions: e.target.value })}
                placeholder="Please list any other medical conditions..."
              />
            </FormControl>

            <div className="flex justify-end mt-6">
              <Button type="submit" variant="contained" color="primary" className="px-6 py-2" endIcon={<NavigateNext />}>
                Next: Select Symptoms
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
