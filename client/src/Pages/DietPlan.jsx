import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FooterTable from "../components/FooterTable/FooterTable";
import AddFoodToLunch from "./AddFood";

import { useDeleteFoodMutation } from "../features/Food/foodApiSlice";
import { useGetUserFoodDiaryQuery } from "../features/Food/foodApiSlice";
import { useUpdateFoodDiaryMutation } from "../features/Food/foodApiSlice";
import { useGetYourCaloriesRequirementQuery } from "../features/Food/foodApiSlice";

const useStyles = makeStyles((theme) => ({
  sectionBox: {
    marginBottom: "5px",
  },
  sectionTitle: {
    width: "60px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#005FAF",
  },
  tableHeader: {
    backgroundColor: "#005FAF",
  },
  tableCell: {
    padding: "8px 16px",
    width: "60px",
    fontSize: "14px",
    marginRight: "10px",
    backgroundColor: "#f5f5f5",
  },
  totalRow: {
    width: "100%",
    backgroundColor: "white",
    fontWeight: "bold",
  },
  totalSection: {
    marginTop: "24px",
    backgroundColor: "#f9f9f9",
    padding: "16px",
    borderRadius: "8px",
  },
  totalText: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  divider: {
    margin: "16px 0",
  },
  goalSection: {
    marginTop: "16px",
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#3366CC",
    color: "white",
  },
  searchBox: {
    marginTop: "16px",
    marginBottom: "16px",
  },
  submitButton: {
    backgroundColor: "#FF4500",
    color: "white",
    marginTop: "20px",
  },
}));

const DietPlan = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState("");
  const { user } = useSelector((state) => state.auth);
  const InputDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const [date, setDate] = useState(InputDate);

  const { data: foodData } = useGetUserFoodDiaryQuery(
    { userId: user?.id, date },
    { skip: !user?.id }
  );

  const { data: calorieData } = useGetYourCaloriesRequirementQuery()

  useEffect(() => {
    if (foodData) {
      setMeals([
        {
          name: "Breakfast",
          items: foodData?.breakfast,
          total: foodData?.breakfast?.reduce(
            (acc, curr) => ({
              calories: acc.calories + curr.item.calories,
              carbs: acc.carbs + curr.item.carbs,
              fat: acc.fat + curr.item.fat,
              protein: acc.protein + curr.item.protein,
            }),
            { calories: 0, carbs: 0, fat: 0, protein: 0, sodium: 0, sugar: 0 }
          ),
        },
        {
          name: "Lunch",
          items: foodData?.lunch,
          total: foodData?.lunch?.reduce(
            (acc, curr) => ({
              calories: acc.calories + curr.item.calories,
              carbs: acc.carbs + curr.item.carbs,
              fat: acc.fat + curr.item.fat,
              protein: acc.protein + curr.item.protein,
            }),
            { calories: 0, carbs: 0, fat: 0, protein: 0, sodium: 0, sugar: 0 }
          ),
        },
        {
          name: "Dinner",
          items: foodData?.dinner,
          total: foodData?.dinner?.reduce(
            (acc, curr) => ({
              calories: acc.calories + curr.item.calories,
              carbs: acc.carbs + curr.item.carbs,
              fat: acc.fat + curr.item.fat,
              protein: acc.protein + curr.item.protein,
            }),
            { calories: 0, carbs: 0, fat: 0, protein: 0, sodium: 0, sugar: 0 }
          ),
        },
        {
          name: "Snacks",
          items: foodData?.snacks,
          total: foodData?.snacks?.reduce(
            (acc, curr) => ({
              calories: acc.calories + curr.item.calories,
              carbs: acc.carbs + curr.item.carbs,
              fat: acc.fat + curr.item.fat,
              protein: acc.protein + curr.item.protein,
            }),
            { calories: 0, carbs: 0, fat: 0, protein: 0, sodium: 0, sugar: 0 }
          ),
        },
      ]);
    }
  }, [foodData]);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const totalSummary = {
    calories: foodData?.totalCalories,
    carbs: foodData?.totalCarbs,
    fat: foodData?.totalFat,
    protein: foodData?.totalProtein,
    goal: { calories:calorieData?.caloriegoal , carbs: calorieData?.carbs, fat: calorieData?.fat, protein: calorieData?.protein },
  };

  const handleOpen = (meal_name) => {
    setMealName(meal_name);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div style={{ padding: "5px" }}>
        {meals?.length > 0 && (
          <FooterTable total={totalSummary} mealName={mealName} />
        )}
      <Box
        className={classes.sectionBox}
        style={{ marginBottom: "20px", float: "right" }}
      >
        <TextField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          variant="outlined"
          margin="normal"
          sx={{
            "& input": {
              backgroundColor: "#3366CC",
              border: "1px solid #3366CC",
              color: "white",
            },
          }}
        />
      </Box>
      <Typography variant="h4" gutterBottom style={{ color: "#3366CC" }}>
        {InputDate === date ? "Today's" : date} Diet Plan
      </Typography>
      {meals?.map((meal, index) => (
        <MealSection
          key={index}
          tableNumber={index}
          action={InputDate === date ? true : false}
          meal={meal}
          classes={classes}
          handleOpen={handleOpen}
        />
      ))}
      <FoodDialog open={open} handleClose={handleClose} classes={classes} />
    </div>
  );
};

const MealSection = ({ tableNumber, meal, classes, handleOpen, action }) => {
  const [updateFoodDiary] = useUpdateFoodDiaryMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [mealName, setMealName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [deleteFood] = useDeleteFoodMutation();

  const handleDialogOpen = (item, selectedMealName) => {
    setSelectedFood(item);
    setQuantity(item.quantity);
    setMealName(selectedMealName);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedFood(null);
  };

  const handleDeleteFood = async (id) => {
    try {
      const data = await deleteFood(id).unwrap();
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateQuantity = async () => {
    try {
      const data = await updateFoodDiary({
        id: selectedFood._id,
        meal: mealName,
        quantity,
      }).unwrap();

      setOpenDialog(false);
      toast.success(data?.message);
      handleDialogClose();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Box className={classes.sectionBox}>
      <TableContainer component={Paper} elevation={0}>
        <Table size="small">
          <TableHead>
            <TableRow className={classes.totalRow}>
              <TableCell
                style={{
                  width: "150px",
                  color: "#3366CC",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <Typography variant="h6" className={classes.sectionTitle}>
                  {meal?.name}
                </Typography>
              </TableCell>
              {tableNumber === 0 && (
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#3366CC",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Calories (kcal)
                </TableCell>
              )}
              {tableNumber === 0 && (
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#3366CC",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Carbs (g)
                </TableCell>
              )}
              {tableNumber === 0 && (
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#3366CC",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Fat (g)
                </TableCell>
              )}
              {tableNumber === 0 && (
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#3366CC",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Protein (g)
                </TableCell>
              )}
              {tableNumber === 0 && <TableCell align="center"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {meal?.items?.length > 0 ? (
              meal?.items?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    className={classes.tableCell}
                    title="serving"
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => handleDialogOpen(item, meal?.name)}
                  >
                    {item?.item?.name} | {item?.item?.servingSize} x{" "}
                    {item?.quantity}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {item?.item?.calories * item.quantity}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {item?.item?.carbs * item.quantity}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {item?.item?.fat * item.quantity}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {item?.item?.protein * item.quantity}
                  </TableCell>
                  {action && (
                    <TableCell align="center" className={classes.tableCell}>
                      <RemoveCircleIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleDeleteFood(item._id)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className={classes.tableCell}
                  colSpan={6}
                  align="center"
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  No Food Added
                </TableCell>
              </TableRow>
            )}
            <TableRow className={classes.totalRow}>
              {action && (
                <TableCell
                  style={{
                    color: "#3366CC",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpen(meal?.name)}
                >
                  Add Food
                </TableCell>
              )}
              {/* {!action && <TableCell style={{ color: '#3366CC', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleOpen(meal?.name)}>History</TableCell>} */}
              <TableCell
                align="center"
                className={classes.totalCell}
                style={{ color: "green", fontWeight: "bold" }}
              >
                {meal?.total?.calories>0&&meal?.total?.calories}
              </TableCell>
              <TableCell
                align="center"
                className={classes.totalCell}
                style={{ color: "green", fontWeight: "bold" }}
              >
                {meal?.total?.carbs>0&&meal?.total?.carbs}
              </TableCell>
              <TableCell
                align="center"
                className={classes.totalCell}
                style={{ color: "green", fontWeight: "bold" }}
              >
                {meal?.total?.fat>0&&meal?.total?.fat}
              </TableCell>
              <TableCell
                align="center"
                className={classes.totalCell}
                style={{ color: "green", fontWeight: "bold" }}
              >
                {meal?.total?.protein>0&&meal?.total?.protein}
              </TableCell>
              <TableCell
                align="center"
                className={classes.totalCell}
                style={{ color: "green", fontWeight: "bold" }}
              ></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for updating quantity */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          Update Quantity for {selectedFood?.item?.name}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Serving Size: {selectedFood?.item?.servingSize}
          </Typography>
          <Typography>Calories: {selectedFood?.item?.calories}</Typography>
          <Typography>Carbs: {selectedFood?.item?.carbs}</Typography>
          <Typography>Fat: {selectedFood?.item?.fat}</Typography>
          <Typography>Protein: {selectedFood?.item?.protein}</Typography>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value, selectedFood?.item?.name)
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={updateQuantity} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const FoodDialog = ({ open, handleClose, mealName }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{ style: { borderRadius: "7px" } }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          backgroundColor: "#005FAF",
          color: "white",
        }}
      >
        <Typography
          variant="h6"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          Your Personal Foods
        </Typography>
        <IconButton onClick={handleClose} style={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent style={{ padding: "24px" }}>
        <AddFoodToLunch handleClose={handleClose} mealName={mealName} />
      </DialogContent>
    </Dialog>
  );
};

export default DietPlan;
