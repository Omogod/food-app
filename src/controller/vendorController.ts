import { FoodAttributes } from './../model/foodModel';
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { VendorAttributes, VendorInstance } from "../model/vendorModel";
import { updateVendorSchema } from '../utils';
import {
  GenerateSignature,
  loginSchema,
  option,
  validatePassword,
} from "../utils";
import { FoodInstance } from "../model/foodModel";
import { v4 as uuidv4 } from "uuid";

/** ================= Vendor Login ===================== **/

export const vendorLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const validateResult = loginSchema.validate(req.body, option);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }

    // check if the vendor exist
    const Vendor = (await VendorInstance.findOne({
      where: { email: email },
    })) as unknown as VendorAttributes;

    if (Vendor) {
      const validation = await validatePassword(
        password,
        Vendor.password,
        Vendor.salt
      );
      console.log(validation)
      if (validation) {
        //Generate signature for vendor
        let signature = await GenerateSignature({
          id: Vendor.id,
          email: Vendor.email,
          serviceAvailable: Vendor.serviceAvailable,
        });

        return res.status(200).json({
          message: "You have successfully logged in",
          signature,
          email: Vendor.email,
          serviceAvailable: Vendor.serviceAvailable,
          role: Vendor.role,
        });
      }
    }
    return res.status(400).json({
      Error: "Wrong Username or password or not a verified vendor ",
    });
  } catch (err) {
    res.status(500).json({
      Error: "Internal server Error",
      route: "/vendors/login",
    });
  }
};

/** ================= Vendor Add Food ===================== **/

export const createFood = async (req: JwtPayload, res: Response) => {
  try {
    const id = req.vendor.id;
    const { name, description, category, foodType, readyTime, price } =
      req.body;

    // check if the vendor exist
    const Vendor = (await VendorInstance.findOne({
      where: { id: id },
    })) as unknown as VendorAttributes;
    const foodid = uuidv4();
    if (Vendor) {
      const createfood = await FoodInstance.create({
        id: foodid,
        name,
        description,
        category,
        foodType,
        readyTime,
        price,
        rating: 0,
        vendorId: id,
        image: req.file.path
      });

      return res.status(201).json({
        message: "Food added successfully",
        createfood,
      });
    }
  } catch (err) {
    res.status(500).json({
      Error: "Internal server Error",
      route: "/vendors/create-food",
    });
  }
};

/** ================= Get Vendor Profile ===================== **/

export const vendorProfile = async (req: JwtPayload, res: Response) => {
try {
    const id = req.vendor.id;

    const Vendor = (await VendorInstance.findOne({
        where: { id: id },
        // attributes: [""],
        include: [
            {
                model: FoodInstance,
                as: "food",
                attributes: ["id", "name", "description", "category", "image", "foodType", "readyTime", "price", "rating", "vendorId"]
            }
        ]
      })) as unknown as VendorAttributes;
      return res.status(200).json({
        Vendor
      })
} catch(err) {
    res.status(500).json({
        Error: "Internal server Error",
        route: "/vendor/get-profile",
      });
}
}


/** ================= Vendor Delete Food ===================== **/

export const deleteFood = async(req: JwtPayload, res: Response) => {
    try {
        const id = req.vendor.id;

        const foodid = req.params.foodid

        //check if the vendor exist
        const Vendor = (await VendorInstance.findOne({
            where: { id: id },
          })) as unknown as VendorAttributes;

          if(Vendor) {

            const deletedFood = (await FoodInstance.destroy({
                where: {id: foodid},
            }))  as unknown as FoodAttributes

            return res.status(200).json({
                message: 'food successfully deleted',
                deletedFood
            })
        }
    
    } catch(err) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/delete-food",
          }); 
    }};

    /** ================= Update Vendor Profile ===================== **/

    export const updateVendorProfile = async (
      req: JwtPayload,
      res: Response
    ) => {
      try {
        const id = req.vendor.id
        const { name, address, phone, coverImage } = req.body;
        const validateResult = updateVendorSchema.validate(req.body, option);
        if (validateResult.error) {
          return res.status(400).json({
            Error: validateResult.error.details[0].message,
          });
        }
        //check if its a reg user
        const User = (await VendorInstance.findOne({
          where: { id: id },
        })) as unknown as VendorAttributes;
        if (!User) {
          return res.status(400).json({
            Error: "you are not authorised to update your profile",
          });
        }
        const updatedUser = (await VendorInstance.update(
          {
            name, 
            address, 
            phone, 
            coverImage:req.file.path
          },
          { where: { id: id } }
        )) as unknown as VendorAttributes;
        
        if (updatedUser) {
          const Vendor = (await VendorInstance.findOne({
            where: { id: id },
          })) as unknown as VendorAttributes;
          return res.status(200).json({
            message: "u have succesfully updated your profile",
            Vendor,
          });
        }
        return res.status(500).json({
          message: "Error Occured",
        });
      } catch (error) {
        return res.status(500).json({
          Error: "internal Serer Error",
          route: "/vendor/update-vendor-profile",
        });
      }
    };



export const getAllVendors = async (req: Request, res: Response) => {
  try {
      // const id = req.vendor.id;
      const Vendor = await VendorInstance.findAndCountAll({}) 
        return res.status(200).json({
          vendor : Vendor.rows
        })
  } catch(err) {
      res.status(500).json({
          Error: "Internal server Error",
          route: "/vendor/get-profile",
        });
  }
  }


  export const getFoodByVendor= async(req:Request,res:Response)=>{
    try{
      const id = req.params.id
      const Vendor = await VendorInstance.findOne({where:{id:id},
        // attributes:["id","name","ownerName","address","phone","pincode","email","rating","coverImage"],
        include:[
          { 
            model: FoodInstance, 
            as:"food", 
            attributes:["id","name","description","category","foodType","readyTime","price","rating","vendorId","image"]
          }
              ]
            }) as unknown as VendorAttributes
  
      return res.status(200).json({
        Vendor
    })
   
    }catch(err){
      res.status(500).json({
        Error:"Internal server Error",
        route:"/vendors/get-vendor-food"
      });
    }
  }
  