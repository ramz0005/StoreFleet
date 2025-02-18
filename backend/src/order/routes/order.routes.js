import express from "express";
import { createNewOrder, getAllPlacedOrders, getUserOrders, getSingleOrder, updateOrder} from "../controllers/order.controller.js";
import { auth, authByUserRole } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);
router.route("/orders/placed").get(auth, authByUserRole("admin"), getAllPlacedOrders)
router.route("/my/orders").get(auth, getUserOrders)
router.route("/:id").get(auth, getSingleOrder)
router.route("/update/:id").put(auth, updateOrder)

export default router;
