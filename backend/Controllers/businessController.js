import expressAsyncHandler from "express-async-handler";
import Business from "../Models/Business.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

export const businessSignup = expressAsyncHandler(async (req, res) => {
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
        message: "Validation failed",
        errors: business.validationError.errors,
      });
    }
    res.status(201).send({
      message: "New business succesfully created",
    });
  } catch (err) {
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
        businessName: businessAdmin.businessName,
        businessType: businessAdmin.businessType,
        businessRegNo: businessAdmin.businessRegNo,
        businessAddress: businessAdmin.businessAddress,
        industry: businessAdmin.industry,
        administratorFullName: businessAdmin.administratorFullName,
        administratorPosition: businessAdmin.administratorPhoneNo,
        administratorEmail: businessAdmin.administratorEmail,
        administratorPhoneNo: businessAdmin.administratorPhoneNo,
        userName: businessAdmin.desiredUsername,
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
  TODO; //this function will verify staff
});
