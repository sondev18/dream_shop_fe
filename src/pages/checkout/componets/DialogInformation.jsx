import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { ortherConfim } from "../../../features/addCartSlice";
import { useSnackbar } from "notistack";
import {
  createUserBooking,
  inFoUserBooking,
} from "../../../features/userBooking";
import { SdInput } from "../../../componets/SdInput/SdInput";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});


const DialogInformation = React.memo(
  ({ open, handleClose, title, content }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [streetsName, setStreetsName] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const { listOrther } = useSelector((state) => state?.addcart);
    const { infoUserBooking } = useSelector((state) => state?.userBooking);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
      open === true || dispatch(inFoUserBooking());
    }, [open]);

    useEffect(() => {
      setName(infoUserBooking?.name);
      setPhone(infoUserBooking?.phone);
      setEmail(infoUserBooking?.email);
      setAddress(infoUserBooking?.address);
      setStreetsName(infoUserBooking?.streetsName);
      setDistrict(infoUserBooking?.district);
      setCity(infoUserBooking?.city);
    }, [infoUserBooking]);

    const form = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

    const onSubmit = async (e) => {
      let dataOrthersId = [];
      for (let i = 0; i < listOrther?.length; i++) {
        const element = listOrther[i];
        if (element.check === true) {
          dataOrthersId.push({ _id: element?._id });
        }
      }
      if (
        name &&
        phone &&
        email &&
        address &&
        streetsName &&
        district &&
        city
      ) {
        dispatch(
          createUserBooking(
            { name, phone, email, address, streetsName, district, city },
            enqueueSnackbar
          )
        );
        dispatch(ortherConfim({ dataOrthers: dataOrthersId }, enqueueSnackbar));
        handleClose();
      }
    };

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            minWidth: "1000px",
          },
          textAlign: "center",
        }}
      >
        <form>
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "40px",
                padding: "12px 16px",
                color: "tomato",
                backgroundColor: "#001c44",
                my: 2,
                borderRadius: "5px",
              }}
            >
              <LocalShippingIcon
                sx={{ fontSize: "40px", marginRight: "5px" }}
              />
              <Typography variant="h6">{title}</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <StyledBox>
              <SdInput
                value={name}
                required
                sdChange={(text) => {
                  setName(text);
                }}
                form={form}
                variant="standard"
                id="name"
                label="First and last name"
                sx={{ width: "45%" }}
              />
              <SdInput
                value={phone}
                required
                sdChange={(text) => {
                  setPhone(text);
                }}
                form={form}
                variant="standard"
                id="phone"
                label="Contact phone number"
                sx={{ width: "45%" }}
              />
            </StyledBox>
            <StyledBox sx={{ margin: "30px 0" }}>
              <SdInput
                value={email}
                required
                sdChange={(text) => {
                  setEmail(text);
                }}
                form={form}
                variant="standard"
                id="email"
                label="Email address"
                sx={{ width: "30%" }}
              />

              <SdInput
                value={address}
                required
                sdChange={(text) => {
                  setAddress(text);
                }}
                form={form}
                variant="standard"
                id="address"
                label="Address"
                sx={{ width: "30%" }}
              />
              <SdInput
                value={streetsName}
                required
                sdChange={(text) => {
                  setStreetsName(text);
                }}
                form={form}
                variant="standard"
                id="streetsName"
                label="Street names"
                sx={{ width: "30%" }}
              />
            </StyledBox>

            <StyledBox sx={{ marginBottom: "20px" }}>
              <SdInput
                value={district}
                required
                sdChange={(text) => {
                  setDistrict(text);
                }}
                form={form}
                variant="standard"
                id="district"
                label="District"
                sx={{ width: "45%" }}
              />
              <SdInput
                value={city}
                required
                sdChange={(text) => {
                  setCity(text);
                }}
                form={form}
                variant="standard"
                id="city"
                label="City"
                sx={{ width: "45%" }}
              />
            </StyledBox>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{
                border: " 1px solid tomato ",
                color: "tomato",
                "&:hover": { color: "tomato", border: " 1px solid tomato " },
              }}
              variant="outlined"
            >
              No
            </Button>
            <Button
              type="submit"
              onClick={onSubmit}
              autoFocus
              sx={{
                color: "white",
                backgroundColor: "#001c44",
                "&:hover": { backgroundColor: "#001c44", opacity: 0.9 },
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
);

export default DialogInformation;
