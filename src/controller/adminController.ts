import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  adminSchema,
  GenerateOTP,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  vendorSchema,
  option,
} from "../utils";
import { UserAttributes, UserInstance } from "../model/userModel";
import { v4 as uuidv4 } from "uuid";
import { fromAdminMail, superAdmin1, userSubject } from "../config";
import { VendorAttributes, VendorInstance } from "../model/vendorModel";

/**==============SUPER ADMIN REGISTRATION=============== */

export const SuperAdminRegister = async (req: JwtPayload, res: Response) => {
  try {
    // const id = req.user.id
    const { email, phone, password, firstName, lastName, address } = req.body;
    //to create user Id from uuid
    const uuiduser = uuidv4();
    const validateResult = adminSchema.validate(req.body, option);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    };
    //generate salt
    const salt = await GenerateSalt();
    //encrypt password
    const userPassword = await GeneratePassword(password, salt);
    //Generte OTP
    const { otp, expiry } = GenerateOTP();
    //check if the admin exist
    const Admin = (await UserInstance.findOne({
      where: { email: email },
    })) as unknown as UserAttributes;
    //create admin if not existing
    if (!Admin) {
      //.role  === "superadmin")
      //to create admin u must add all the model properties
      await UserInstance.create({
        id: uuiduser, // user id created from uuidv4
        email,
        password: userPassword, //we set the password to user password that has been hashed
        firstName,
        lastName,
        salt,
        address,
        phone,
        otp,
        otp_expiry: expiry,
        lng: 0,
        lat: 0,
        verified: true,
        role: "superadmin", //admin
        coverImage: ""
      });
      //send OTP to USer phone number
      //await onRequestOTP(otp, phone)
      //check if admin Exist, if yes, he is given a signature(token)
      const Admin = (await UserInstance.findOne({
        where: { email: email },
      })) as unknown as UserAttributes; //attributes comes from the User attribute
      //generate signature
      const signature = await GenerateSignature({
        id: Admin.id,
        email: Admin.email,
        verified: Admin.verified,
      });
      //   console.log(signature)
      // return statement on creation of user
      return res.status(201).json({
        message: "Admin created Successfull",
        signature,
        verified: Admin.verified,
      });
    }
    // return statement if user exist
    return res.status(400).json({
      message: "Admin already exist",
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal Server Error",
      route: "/admin/create-superadmin",
    });
  }
};

/**=============ADMIN REGISTER ===================== */

export const AdminRegister = async (req: JwtPayload, res: Response) => {
  try {
    // const id = req.user.id
    const { email, phone, password, firstName, lastName, address } = req.body;
    //to create user Id from uuid
    const uuiduser = uuidv4();
    const validateResult = adminSchema.validate(req.body, option);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    //generate salt
    const salt = await GenerateSalt();
    //encrypt password
    const userPassword = await GeneratePassword(password, salt);
    //Generte OTP
    const { otp, expiry } = GenerateOTP();
    //check if the admin exist
    const Admin = (await UserInstance.findOne({
      where: { email: email },
    })) as unknown as UserAttributes;
    //create admin if not existing

    if (!Admin) {
      const superadmin = (await UserInstance.findOne({
        where: { email: superAdmin1 },
      })) as unknown as UserAttributes;

      if (superadmin.role === "superadmin") {
        //.role  === "superadmin")
        //to create admin u must add all the model properties
        await UserInstance.create({
          id: uuiduser, // user id created from uuidv4
          email,
          password: userPassword, //we set the password to user password that has been hashed
          firstName,
          lastName,
          salt,
          address,
          phone,
          otp,
          otp_expiry: expiry,
          lng: 0,
          lat: 0,
          verified: true,
          role: "admin", //admin
          coverImage: ""
        });
        //send OTP to USer phone number
        //await onRequestOTP(otp, phone)
        //check if admin Exist, if yes, he is given a signature(token)
        const Admin = (await UserInstance.findOne({
          where: { email: email },
        })) as unknown as UserAttributes; //attributes comes from the User attribute
        //generate signature
        const signature = await GenerateSignature({
          id: Admin.id,
          email: Admin.email,
          verified: Admin.verified,
        });
        //   console.log(signature)
        // return statement on creation of user
        return res.status(201).json({
          message: "Admin Created Successfull",
          signature,
          verified: Admin.verified,
        });
      }
    }
    // return statement if user exist
    return res.status(400).json({
      message: "Admin Already Exist",
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal Server Error",
      route: "/admin/signup",
    });
  }
};

/**============= CREATE VENDOR ===================== */

export const createVendor = async (req: JwtPayload, res: Response) => {
  try {
    const id = req.user.id;
    const { name, restaurantName, pincode, phone, address, email, password } =
      req.body;
    const uuidvendor = uuidv4();
    const validateResult = vendorSchema.validate(req.body, option);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }

    // Generate salt
    const salt = await GenerateSalt();
    const vendorPassword = await GeneratePassword(password, salt);

    // check if the vendor exist
    const Vendor = (await VendorInstance.findOne({
      where: { email: email },
    })) as unknown as VendorAttributes;

    const Admin = (await UserInstance.findOne({
      where: { id: id },
    })) as unknown as UserAttributes;

    if (Admin.role === "admin" || Admin.role === "superadmin") {
      if (!Vendor) {
        const createVendor = await VendorInstance.create({
          id: uuidvendor,
          name,
          restaurantName,
          pincode,
          phone,
          address,
          email,
          password: vendorPassword,
          salt,
          role: "vendor",
          serviceAvailable: false,
          rating: 0,
          coverImage: "",
        });

        return res.status(201).json({
          message: "Vendor created successfully",
          createVendor,
        });
      }
      return res.status(400).json({
        message: "Vendor already exist",
      });
    }

    return res.status(400).json({
      message: "unathorised",
    });
  } catch (err) {
    res.status(500).json({
      Error: "Internal server Error",
      route: "/admins/create-vendors",
    });
  }
};
