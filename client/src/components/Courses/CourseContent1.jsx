import React, { useState } from "react";
import { Box, Grid, Typography, Card, CardActionArea, Divider } from "@mui/material";

const CourseContent1 = ({content}) => {

  const [selected, setSelected] = useState(null);

  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      {/* Course Contents List */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 1,
            p: 2,
            height: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Course Contents
          </Typography>
          <Divider />
          {content?.map((item, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                mt: 2,
                border:
                  selected === index
                    ? "2px solid #1976d2"
                    : "1px solid rgba(0,0,0,0.12)",
                borderRadius: 2,
                backgroundColor: selected === index ? "#e3f2fd" : "white",
                transition: "0.3s",
                width: "100%",
              }}
            >
              <CardActionArea
                onClick={() => setSelected(item)}
                sx={{ p: 1 }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {item.contentTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.time}
                </Typography>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Grid>

      {/* Video Content */}
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            bgcolor: "#f9f9f9",
            borderRadius: 2,
            boxShadow: 1,
            p: 4,
            textAlign: "center",
            height: "50%",
          }}
        >
          {selected !== null ? (
            <>
              <Typography variant="h5" gutterBottom>
                {selected?.contentTitle}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {selected?.url? <iframe
                    src={`${selected?.url}?rel=0`}
                    width="100%" // Full width of the container
                    height="400px" // Adjusted height
                    style={{ border: "none", borderRadius: "8px" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>:<p>Buy now to access all the content</p>}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" color="textSecondary">
              Select a video to start learning!
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CourseContent1;


// Syllabus.js
// import React, { useState } from "react";
// import { Box, Card, CardActionArea, Divider, Grid, MenuItem, Select, Typography } from "@mui/material";

// const CourseContent = ({ content }) => {
//   const [selectedIndex, setSelectedIndex] = useState("");

//   const handleChange = (event) => {
//     setSelectedIndex(event.target.value);
//   };

//   return (
//     <Grid container spacing={2} style={{ padding: "20px" }}>
//       {/* Course Contents List */}
//       <Grid item xs={12} md={4}>
//         <Box
//           sx={{
//             bgcolor: "white",
//             borderRadius: 2,
//             boxShadow: 1,
//             p: 2,
//             height: "100%",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Course Contents
//           </Typography>
//           <Divider />
//           <Select
//             value={selectedIndex}
//             onChange={handleChange}
//             displayEmpty
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             <MenuItem value="" disabled>
//               Select a lesson
//             </MenuItem>
//             {content?.map((item, index) => (
//               <MenuItem key={index} value={index}>
//                 {item.contentTitle} - {item.time}
//               </MenuItem>
//             ))}
//           </Select>
//         </Box>
//       </Grid>

//       {/* Video Content */}
//       <Grid item xs={12} md={8}>
//         <Box
//           sx={{
//             bgcolor: "#f9f9f9",
//             borderRadius: 2,
//             boxShadow: 1,
//             p: 4,
//             textAlign: "center",
//             height: "100%",
//           }}
//         >
//           {selectedIndex !== "" ? (
//             <>
//               <Typography variant="h5" gutterBottom>
//                 {content[selectedIndex]?.contentTitle}
//               </Typography>
//               {content[selectedIndex]?.url ? (
//                 <iframe
//                   src={content[selectedIndex]?.url}
//                   width="100%" // Full width of the container
//                   height="400px" // Adjusted height
//                   style={{ border: "none", borderRadius: "8px" }}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               ) : (
//                 <Typography variant="body1" color="textSecondary">
//                   Buy now to access all the content
//                 </Typography>
//               )}
//             </>
//           ) : (
//             <Typography variant="h6" color="textSecondary">
//               Select a video to start learning!
//             </Typography>
//           )}
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default CourseContent;



