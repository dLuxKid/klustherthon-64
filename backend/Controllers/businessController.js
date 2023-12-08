import expressAsyncHandler from "express-async-handler";
import Business from "../Models/Business.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import Staff from "../Models/Staff.js";

export const businessSignup = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const newBusiness = new Business({
      businessName: req.body.businessName,
      businessType: req.body.businessType,
      businessRegNo: req.body.businessRegNo,
      businessAddress: req.body.businessAddress,
      industry: req.body.industry,
      administratorFullName: req.body.administratorFullName,
      administratorPosition: req.body.administratorPhoneNo,
      administratorEmail: req.body.administratorEmail,
      administratorPhoneNo: req.body.administratorPhoneNo,
      userName: req.body.userName,
      password: bcrypt.hashSync(req.body.password),
      isBusiness: true,
    });

    const business = await newBusiness.save();
    if (business.validationError) {
      return res.status(400).send({
        message: "Validation failed, check input fields",
        errors: business.validationError.errors,
      });
    }

    res.status(201).send({
      message: "New business succesfully created",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err,
    });
  }
});

export const businessSignin = expressAsyncHandler(async (req, res) => {
  const businessAdmin = await Business.findOne({
    administratorEmail: req.body.administratorEmail,
  });
  if (businessAdmin) {
    if (bcrypt.compareSync(req.body.password, businessAdmin.password)) {
      res.status(200).send({
        id: businessAdmin._id,
        businessName: businessAdmin.businessName,
        businessType: businessAdmin.businessType,
        businessRegNo: businessAdmin.businessRegNo,
        businessAddress: businessAdmin.businessAddress,
        industry: businessAdmin.industry,
        administratorFullName: businessAdmin.administratorFullName,
        administratorPosition: businessAdmin.administratorPhoneNo,
        administratorEmail: businessAdmin.administratorEmail,
        administratorPhoneNo: businessAdmin.administratorPhoneNo,
        userName: businessAdmin.userName,
        isBusiness: true,
        token: generateToken(businessAdmin),
      });
    }
  } else {
    res.status(400).send({
      message: "Wrong email or password ",
    });
  }
});

export const verifyStaff = expressAsyncHandler(async (req, res) => {
  const { businessId, staffId } = req.body;

  try {
    const staff = await Staff.findById(staffId);

    if (staff.business.toString() !== businessId) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    staff.isVerified = true;
    await staff.save();

    res.status(200).send({ message: "Staff verified successfully" });
  } catch (err) {console.log("error")
    res.status(500).send({ message: "An error occurred" });
  }
});

export const unVerifyStaff = expressAsyncHandler(async (req, res) => {
  const { businessId, staffId } = req.body;

  try {
    const staff = await Staff.findById(staffId);

    if (staff.business.toString() !== businessId) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    staff.isVerified = false;
    await staff.save();

    res.status(200).send({ message: "unverified Staff successfully" });
  } catch (err) {
    res.status(500).send({ message: "An error occurred" });
  }
});
export const allStaff = expressAsyncHandler(async (req, res) => {
  try {
    const staffs = await Staff.find({
      business: req.params.businessId,
    });
    res.status(200).send(staffs);
  } catch (err) {
    res.status(400).send({
      message: "Error fetching Staff",
    });
  }
});
