import { FilterProductsByPriceRange } from "../model/product.repository2.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const productsByPriceRange = async (req, res, next) => {
    const { minPrice, maxPrice } = req.body;
    try {
        const result = await FilterProductsByPriceRange(minPrice, maxPrice);
        res.status(201).send(result);
    } catch (error) {
        return next(new ErrorHandler(400, error));
    }
}