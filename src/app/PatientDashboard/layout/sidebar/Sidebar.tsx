// import { useMediaQuery, Box, Drawer, ThemeProvider, createTheme } from "@mui/material";
// import SidebarItems from "./SidebarItems";
// import { Upgrade } from "./Updrade";
// import { Sidebar, Logo } from "react-mui-sidebar";

// interface ItemType {
//   isMobileSidebarOpen: boolean;
//   onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
//   isSidebarOpen: boolean;
// }

// const MSidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }: ItemType) => {
//   const theme = createTheme(); // Create MUI theme
//   const lgUp = useMediaQuery(theme.breakpoints.up("lg")); // Use the theme safely

//   const sidebarWidth = "270px";

//   const scrollbarStyles = {
//     "&::-webkit-scrollbar": {
//       width: "7px",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#eff2f7",
//       borderRadius: "15px",
//     },
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       {lgUp ? (
//         <Box
//           sx={{
//             width: sidebarWidth,
//             flexShrink: 0,
//           }}
//         >
//           <Drawer
//             anchor="left"
//             open={isSidebarOpen}
//             variant="permanent"
//             PaperProps={{
//               sx: {
//                 boxSizing: "border-box",
//                 ...scrollbarStyles,
//               },
//             }}
//           >
//             <Box sx={{ height: "100%" }}>
//               <Sidebar
//                 width={"270px"}
//                 collapsewidth="80px"
//                 open={isSidebarOpen}
//                 themeColor="#5d87ff"
//                 themeSecondaryColor="#49beff"
//                 showProfile={false}
//               >
//                 <
//                 <Box>
//                   <SidebarItems toggleMobileSidebar={function (): void {
//                     throw new Error("Function not implemented.");
//                   } } />
//                   <Upgrade />
//                 </Box>
//               </Sidebar>
//             </Box>
//           </Drawer>
//         </Box>
//       ) : (
//         <Drawer
//           anchor="left"
//           open={isMobileSidebarOpen}
//           onClose={onSidebarClose}
//           variant="temporary"
//           PaperProps={{
//             sx: {
//               boxShadow: (theme) => theme.shadows[8],
//               ...scrollbarStyles,
//             },
//           }}
//         >
//           <Box px={2}>
//             <Sidebar
//               width={"270px"}
//               collapsewidth="80px"
//               isCollapse={false}
//               mode="light"
//               direction="ltr"
//               themeColor="#5d87ff"
//               themeSecondaryColor="#49beff"
//               showProfile={false}
//             >
//               <div className="h-200px w-200px">Swasthika👩‍⚕️</div>
//               <SidebarItems toggleMobileSidebar={function (): void {
//                   throw new Error("Function not implemented.");
//                 } } />
//               <Upgrade />
//             </Sidebar>
//           </Box>
//         </Drawer>
//       )}
//     </ThemeProvider>
//   );
// };

// export default MSidebar;
import { useMediaQuery, Box, Drawer, createTheme } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Updrade";
import { Sidebar } from "react-mui-sidebar";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }: ItemType) => {
  const theme = createTheme(); // Create MUI theme
  const lgUp = useMediaQuery(theme.breakpoints.up("lg")); // Use the theme safely

  const sidebarWidth = "270px";

  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eff2f7",
      borderRadius: "15px",
    },
  };

  return (
    <>
      {lgUp ? (
        <Box
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
          }}
        >
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            variant="permanent"
            PaperProps={{
              sx: {
                boxSizing: "border-box",
                ...scrollbarStyles,
              },
            }}
          >
            <Box sx={{ height: "100%" }}>
              <Sidebar
                width={"270px"}
                collapsewidth="80px"
                open={isSidebarOpen}
                themeColor="#5d87ff"
                themeSecondaryColor="#49beff"
                showProfile={false}
               
              >
                <Box>
                <h1 className="text-2xl font-extrabold text-blue-600 text-center mt-4 mb-4">Swasthika 👩‍⚕️</h1>
                  <SidebarItems toggleMobileSidebar={() => {}} />
                  <Upgrade />
                </Box>
              </Sidebar>
            </Box>
          </Drawer>
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open={isMobileSidebarOpen}
          onClose={onSidebarClose}
          variant="temporary"
          PaperProps={{
            sx: {
              boxShadow: (theme) => theme.shadows[8],
              ...scrollbarStyles,
            },
          }}
        >
          <Box px={2}>
            <Sidebar
              width={"270px"}
              collapsewidth="80px"
              isCollapse={false}
              mode="light"
              direction="ltr"
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              
              <SidebarItems toggleMobileSidebar={() => {}} />
              <Upgrade />
            </Sidebar>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default MSidebar;
