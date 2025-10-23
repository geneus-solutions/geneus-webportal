import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TrialExpiredPopup from "../components/TrialExpiredPopup";

import { useSelector } from "react-redux";

import {
  Box,
  Button,
  InputBase,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useGetFoodItemsQuery,useAddFoodMutation } from "../features/Food/foodApiSlice";

const AddFoodToLunch = ({mealName,handleClose}) => {
  
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
 
  const { data:foodData } = useGetFoodItemsQuery();
  const [addFood/*,{isLoading}*/] = useAddFoodMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(mealName||"Lunch");
  const [openTrialPopup, setOpenTrialPopup] = useState(false);

  const handleTrialPopupClose = () => {
    setOpenTrialPopup(false);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter the food data
    const filtered = foodData?.filter((food) =>
      food.name.toLowerCase().includes(value)
    );

    setFilteredFoods(filtered);
  };
  const handleSelectFood = (food) => {
    // Add the selected food to the selectedFoods array
    setSelectedFoods([...selectedFoods, food]);
    setSearchTerm(""); // Clear search input after selection
    setFilteredFoods([]); // Clear the filtered list after selection
  };

  const deleteSelectedFood = (index) => {
    // Remove the selected food from the selectedFoods array
    const newSelectedFoods = selectedFoods.filter((food, i) => i !== index);
    setSelectedFoods(newSelectedFoods);

  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleMealChange = (event) => {
    setSelectedMeal(event.target.value);
  };

  const handleAddFood = async(e) => {
    try {
        
        e.preventDefault();

        const food = selectedFoods.map((food) => {
            return food._id
        });

        console.log("Selected Foods:", food);

        await addFood({user:user?.id,[selectedMeal.toLowerCase()]:food}).unwrap();

        toast.success("food added successfully!");
        handleClose&&handleClose();
        navigate("/diet-plan");

    } catch (err) { 
      console.log("Error : ",err);
      if (err?.status === 402 && err?.data?.message === "Plan expired") {
        setOpenTrialPopup(true);
      } else {
        toast.error(err?.data?.message);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        Height: "100%",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {openTrialPopup && <TrialExpiredPopup onClose={handleTrialPopupClose} />}
      {/* Search Section */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", textAlign: "left" }}>
        <Typography variant="h5" sx={{ marginBottom: "5px", color: "#1a73e8" }}>
          Add Food to {selectedMeal}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          textAlign: "left",
          marginTop: "10px",
        }}
      >
        <Typography>Search our food database by name</Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            color: "blue",
            fontSize: "11px",
          }}
        >
          Quick add calories
        </Typography>
      </Box>
      {/* Search bar and dropdown in one container */}
      <Box sx={{ position: "relative", width: 600, margin: "10px 0" }}>
        {" "}
        {/* Removed margin: '0 auto' */}
        <Paper
          component="form"
          sx={{ display: "flex", padding: "2px 4px", marginBottom: "5px" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search our food database by name"
            inputProps={{ "aria-label": "search food" }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </Button>
        </Paper>
        {/* Dropdown for search results */}
        {filteredFoods?.length > 0 && (
          <Paper
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
              border: "1px solid lightgray",
            }}
          >
            <List>
              {filteredFoods.map((food, index) => (
                <ListItem
                  button
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectFood(food)}
                >
                  <ListItemText
                    primary={food.name}
                    secondary={`${food.calories} kcal`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>

      {/* Dropdown Section */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Typography>Or, add your favorites for :</Typography>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            value={selectedMeal}
            onChange={handleMealChange}
            disableUnderline
            sx={{ color: "#0056b3" }}
          >
            <MenuItem value="Breakfast">Breakfast</MenuItem>
            <MenuItem value="Lunch">Lunch</MenuItem>
            <MenuItem value="Dinner">Dinner</MenuItem>
            <MenuItem value="Snacks">Snacks</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Your Choice" />
          <Tab label="FREQUENT" />
          <Tab label="MY FOODS" />
          <Tab label="MEALS" />
          {/* <Tab label="RECIPES" /> */}
        </Tabs>
      </Box>

      {/* Info Section */}
      {/* Selected Foods Bucket */}
      {selectedFoods.length > 0 ? (
        <Box sx={{ textAlign: "left", marginTop: "20px" }}>
          <Typography variant="h6">
            Selected Foods for {selectedMeal}
          </Typography>
          <List>
            {selectedFoods.map((food, index) => (
              <ListItem
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box style={{ display: "flex", gap: "15px" }}>
                  {/* <Checkbox /> */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Box>
                      <Typography variant="body1">{food.name}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Typography variant="body2" sx={{ marginLeft: "auto" }}>
                        Calories: {food.calories} kcal
                      </Typography>
                      <Typography variant="body2">
                        Carbs: {food.carbs}g
                      </Typography>
                      <Typography variant="body2">Fat: {food.fat}g</Typography>
                      <Typography variant="body2">
                        Protein: {food.protein}g
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteSelectedFood(index)}
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Box
          sx={{
            padding: "20px",
            minHeight: "150px",
            height: "auto",
            textAlign: "left",
          }}
        >
          <Typography variant="body2">
            You have not added any Lunch foods yet.
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginTop: "10px", fontStyle: "italic" }}
          >
            TIP: As you enter foods to your food diary, the foods you eat most
            often will appear in this list so that you can quickly add them to
            your meals.
          </Typography>
        </Box>
      )}

      <Divider />

      {/* Buttons Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Button variant="contained" color="success" onClick={handleAddFood}>
          Add Food
        </Button>
        <Button style={{width:'200px'}} onClick={()=>navigate('/diet-plan')} variant="contained" color="success">
          Check Your Diat
        </Button>
      </Box>
    </Box>
  );
};

export default AddFoodToLunch;
