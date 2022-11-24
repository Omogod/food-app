import express from "express";
import {authVendor} from '../middleware/authorization'
import {createFood, vendorLogin, vendorProfile, deleteFood} from "../controller/vendorController";

const router = express.Router();
router.post('/login', vendorLogin)
router.post('/create-food', authVendor, createFood)
router.get('/get-profile', authVendor, vendorProfile)
router.delete('/delete-food/:foodid', authVendor, deleteFood)


export default router;