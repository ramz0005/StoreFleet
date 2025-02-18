import ProductModel from "./product.schema.js";
import OrderModel from "../../order/model/order.schema.js";

export const FilterProductsByPriceRange = async (minPrice, maxPrice) => {
  const products = await ProductModel.find({ price: { $gte: minPrice, $lte: maxPrice } });
  let productIds = [];
  products.map((product) => {
    productIds.push(product._id);
  });
  const result = await OrderModel.aggregate([
    {
      $match: { "orderedItems.product": { $in: productIds } }
    },
    {
      $unwind: "$orderedItems"
    },
    {
      $match: { "orderedItems.product": { $in: productIds } }
    },
    {
      $group: {
        _id: "$orderedItems.product",
        userIds: { $addToSet: "$user" }
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productInfo"
      }
    },
    {
      $unwind: "$productInfo"
    },
    {
      $project: {
        productId:"$_id",
        productName: "$productInfo.name",
        userIds: 1,
        price: "$productInfo.price"
      }
    }
  ])
  return result;
};
