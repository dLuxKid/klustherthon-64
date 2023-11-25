import expressAsyncHandler from "express-async-handler";
import Staff from "../Models/Staff.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
export const staffSignup = expressAsyncHandler(async (req, res) => {
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
      business: req.body.businessId,
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
});

export const staffSignin = expressAsyncHandler(async (req, res) => {
  const staff = await Staff.findOne({ email: req.body.email });
  if (staff) {
    if (bcrypt.compareSync(req.body.password, staff.password)) {
      res.status(200).send({
        name: req.body.name,
        staffId: req.body.staffId,
        email: req.body.email,
        department: req.body.department,
        userName: req.body.userName,
        managerName: req.body.managerName,
        isVerified: false,
        isBusiness: false,
        business: req.body.businessId,
        token: generateToken(staff),
      });
    }
  } else {
    res.status(400).send({
      message: "Wrong email or password ",
    });
  }
});
