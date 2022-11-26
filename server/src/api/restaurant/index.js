import express from "express";
import mongoose from "mongoose";
import { RestaurantModel } from "../../database/allModules";
import { IdValidation } from '../../validation/common.validation'
import { RestaurantCityValidation, SearchStringValidation } from "../../validation/restaurant.validation";

const Router = express.Router();

/**
 * Route     /
 * Des       Create new restaurant
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post('/', async (req, res) => {
    try {
        const restaurant = await RestaurantModel.create(req.body.newRes);
        const _id = restaurant.get_id();
        return res.status(200).json({ restaurant, _id })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route     /
 * Des       Get all the restuarant details based on the city
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get('/', async (req, res) => {
    try {
        const { city } = req.query;
        // await RestaurantCityValidation(req.query);
        const restaurants = await RestaurantModel.find({ city });
        if (!restaurants) {
            return res.status(400).json({ Error: `No Resturants found in this ${city} ...` });
        }
        return res.status(200).json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route     /:_id
 * Des       Get individual restuarant details based on id
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        await IdValidation(req.params);
        const restaurants = await RestaurantModel.findById({ _id });
        if (!restaurants) {
            return res.status(400).json({ Error: "No Resturant found " });
        }
        return res.status(200).json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

/**
 * Route     /search/:searchString
 * Des       Get restaurants details based on search string
 * Params    searchString
 * Access    Public
 * Method    GET
 */
Router.get('/search/:searchString', async (res, req) => {
    try {
        const { searchString } = req.params;
        // await SearchStringValidation(req.params);
        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $options: 'i' }
        })
        if (restaurants.length === 0) {
            return res.status(400).json({ Error: `No Resturant found with matching ${searchString}` });
        }
        return res.status(200).json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export default Router;