import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";

const CouponSection = ({ validCoupons }) => {
  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          {/* Heading: Coupon Section */}
          <Typography variant="h5" gutterBottom>
            Available Coupons
          </Typography>

          {/* Display the list of available coupons */}
          <List>
            {validCoupons?.map((coupon) => (
              <ListItem
                key={coupon.code}
                divider
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <ListItemText primary={coupon.code} />
                <Typography variant="body2">{coupon.discount}% off</Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CouponSection;
