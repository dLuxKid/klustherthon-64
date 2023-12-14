import jwt from "jsonwebtoken";
import Business from "./Models/Business.js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({
          message: "Invalid Token",
        });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "No Token",
    });
  }
};

export const isBusiness = async (req, res, next) => {
  let business = await Business.findById(req.body.businessId);
  if (!business) {
    business = await Business.findById(req.params.businessId);
  }
  if (business && business.isBusiness) {
    next();
  } else {
    res.status(401).send({
      message: "Invalid Business Token",
    });
  }
};

export const isStaff = async (id) => {
  const staff = await Staff.findById(req.body.id);
  if (staff) {
    return true;
  } else {
    return false;
  }
};
export const isVerified = async (staff) => {
  if (staff.isVerified) {
    return true;
  } else {
    return false;
  }
};
