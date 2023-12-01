import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import GradeIcon from "@mui/icons-material/Grade";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { getListReview } from "../../features/reviewSlice";
import Listorder from "../order/componets/Listorder";

const StyledTableCell = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
  color: "white",
});

function ReviewPage() {
  const { reviewList } = useSelector((state) => state?.review);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getListReview(enqueueSnackbar));
  }, []);

  return (
    <Container sx={{ paddingBottom: "400px" }}>
      <Box
        sx={{
          display: "center",
          alignItems: "center",
          justifyContent: "",
          minWidth: "100px",
          height: "40px",
          padding: "12px 16px",
          borderRadius: "10px",
          color: "tomato",
          backgroundColor: "#001c44",
          my: 2,
        }}
      >
        <GradeIcon
          sx={{ fontSize: "40px", marginRight: "5px", color: "yellow" }}
        />
        <Typography variant="h5" color="white">
          Review
        </Typography>
      </Box>
      <Card>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#001c44" }}>
              <TableCell sx={{ fontWeight: 550, color: "white" }}>
                Product
              </TableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Price Sale</StyledTableCell>
              <StyledTableCell>Discount</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewList?.map((row) => (
              <Listorder key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}

export default ReviewPage;
