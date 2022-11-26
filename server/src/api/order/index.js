import express from 'express';
import { OrderModel } from '../../database/allModules'
import passport from 'passport';

const Router = express.Router();

/**
 * Route     /
 * Des       Get all orders by user id
 * Params    none
 * Access    Private
 * Method    GET
 */
Router.get('/',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { user } = req;
            const getOrders = await OrderModel.findOne({ user: user._id });
            if (!getOrders) return res.status(400).json({ Error: 'User not Found' });
            return res.status(200).json({ orders: getOrders });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

/**
 * Route     /new
 * Des       Add new Order
 * Params    none
 * Access    Private
 * Method    PUT
 */
Router.put('/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { user } = req;
        const { orderDetails } = req.body;

        const addNewOrder = await OrderModel.findOneAndUpdate(
            { user: user._id },
            { $push: { orderDetails: orderDetails }, },
            { new: true }
        );
        return res.status(200).json({ order: addNewOrder });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export default Router;