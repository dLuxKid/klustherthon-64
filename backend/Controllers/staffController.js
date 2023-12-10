import expressAsyncHandler from "express-async-handler";
import Staff from "../Models/Staff.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import Business from "../Models/Business.js";

export const staffSignup = expressAsyncHandler(async (req, res) => {
  const business = await Business.findOne({
    businessRegNo: req.body.businessRegNo,
  });
  if (business) {
    try {
      const newStaff = new Staff({
        name: req.body.name,
        staffId: req.body.staffId,
        email: req.body.email,
        department: req.body.department,
        password: bcrypt.hashSync(req.body.password),
        userName: req.body.userName,
        managerName: req.body.managerName,
        isVerified: false,
        isBusiness: false,
        business: business._id,
      });
      const staff = await newStaff.save();
      if (staff.validationError) {
        return res.status(400).send({
          message: "Validation failed",
          errors: staff.validationError.errors,
        });
      }
      res.status(201).send({
        message: "New Staff succesfully Saved",
      });
    } catch (err) {
      res.status(400).send({
        message: err,
      });
    }
  } else {
    res.status(400).send({
      message: "No such Business with Reg No: " + req.body.businessRegNo,
    });
  }
});

export const staffSignin = expressAsyncHandler(async (req, res) => {
  const staff = await Staff.findOne({ email: req.body.email });
  if (staff) {
    try {
      if (bcrypt.compareSync(req.body.password, staff.password)) {
        res.status(200).send({
          name: staff.name,
          staffId: staff.staffId,
          email: staff.email,
          department: staff.department,
          userName: staff.userName,
          managerName: staff.managerName,
          isVerified: false,
          isBusiness: false,
          businessId: staff.business,
          id: staff._id,
          token: generateToken(staff),
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error signing check input details",
      });
    }
  } else {
    res.status(400).send({
      message: "Invalid email or password ",
    });
  }
});
export const getBusinessStaff = expressAsyncHandler(async (req, res) => {
  try {
    const staffs = await Staff.find({
      business: req.params.businessId,
    });
    res.status(200).send(staffs);
  } catch (err) {
    res.status(400).send({
      err: err,
      message: "Error fetching Staffs",
    });
  }
});