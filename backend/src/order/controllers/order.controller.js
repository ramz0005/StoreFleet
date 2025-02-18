import { createNewOrderRepo, getAllOrdersRepo, getUserOrdersRepo, getSingleOrderRepo, updateOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderedItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Check if all required fields are present
    if (!shippingInfo || !orderedItems || !paymentInfo || !itemsPrice || !taxPrice || !shippingPrice || !totalPrice) {
      return next(new ErrorHandler(400, "Please provide all necessary order details"));
    }

    const orderData = {
      shippingInfo,
      orderedItems,
      user: req.user._id,  // Add the authenticated user's ID to the order
      paymentInfo,
      paidAt: Date.now(),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus: "Processing",
    };

    const newOrder = await createNewOrderRepo(orderData);

    res.status(201).json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    return next(new ErrorHandler(500, "Failed to place a new order: " + error.message));
  }
};

export const getAllPlacedOrders = async (req, res, next) => {
  try {
    const allOrders = await getAllOrdersRepo();
    res.status(200).json({ success: true, allOrders });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await getUserOrdersRepo(req.user._id);
    if (!orders) {
      res.status(400).json({ success: false, msg: "No orders found." });
    }
    else {
      res.status(200).json({ success: true, orders });
    }
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
}

export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await getSingleOrderRepo(req.params.id);

    if (!order) {
      res.status(400).json({ success: false, msg: "Order not found." });
    }
    else {
      res.status(200).json({ success: true, order });
    }
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await updateOrderRepo(req.params.id, req.body);
    if (!updatedOrder) {
      res.status(400).json({ success: false, msg: "Order not found." });
    }
    else {
      res.status(200).json({ success: true, updatedOrder });
    }
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};