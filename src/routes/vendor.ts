import { updateVendorProfile, getAllVendors, getFoodByVendor } from './../controller/vendorController';
import express from "express";
import {authVendor} from '../middleware/authorization'
import {createFood, vendorLogin, vendorProfile, deleteFood} from "../controller/vendorController";
import { upload } from '../utils/multer';

const router = express.Router();
router.post('/login', vendorLogin)
router.post('/create-food', authVendor, upload.single("image"), createFood)
router.get('/get-profile', authVendor, vendorProfile)
router.get('/get-vendor-food/:id', getFoodByVendor)
router.get('/get-all-vendors', getAllVendors)
router.delete('/delete-food/:foodid', authVendor, deleteFood)
router.patch('/update-vendor-profile', authVendor, upload.single("coverImage"), updateVendorProfile)


export default router;