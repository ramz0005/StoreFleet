import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (orderData) => {
  try {
    const newOrder = await OrderModel.create(orderData);
    return newOrder;
  } catch (error) {
    throw new Error("Failed to create a new order: " + error.message);
  }
};


export const getAllOrdersRepo = async () => {
  try {
    const orders = await OrderModel.find();
    return orders;
  } catch (error) {
    throw new Error("Failed to retrieve orders: " + error.message);
  }
};

export const getUserOrdersRepo = async (userId) => {
  try {
    // Find orders where the 'user' field matches the provided user ID
    const userOrders = await OrderModel.find({ user: userId });
    return userOrders;
  } catch (error) {
    throw new Error("Failed to retrieve user orders: " + error.message);
  }
};

export const getSingleOrderRepo = async (id) => {
  try {
    const order = await OrderModel.findById(id);
    return order;
  } catch (error) {
    throw new Error("Failed to retrieve user orders: " + error.message);
  }
};

export const updateOrderRepo = async (id, data) => {
  try {
    return await OrderModel.findOneAndUpdate({_id: id}, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    
  } catch (error) {
    throw new Error("Failed to retrieve user orders: " + error.message);
  }
}