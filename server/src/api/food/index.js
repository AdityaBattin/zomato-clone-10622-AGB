import express from 'express'
import { FoodModel } from '../../database/allModules'
import { IdValidation, CategoryValidation } from '../../validation/common.validation'

const Router = express.Router();

/**
 * Route     /
 * Des       Create New Food Item
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post('/', async (req, res) => {
    try {
        const foods = await FoodModel.create(req.body.foodItem);

        return res.status(200).json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

})

/**
 * Route    /:_id
 * des      get food by _id
 * params   _id
 * access   public  
 * Method   Get
 * 
 */
Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        await IdValidation(req.params);
        const foods = await FoodModel.findById(_id);
        if (!foods) {
            return res.status(400).json({ Error: 'Food item not found' });
        }
        return res.status(200).json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route     /r/:_id
 * Des       Get all food based on particular restaurant
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get('/r/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        await IdValidation(req.params);
        const foods = await FoodModel.find({
            restaurant: _id,
        });
        if (!foods) {
            return res.status(400).json({ Error: 'Food item not found' });
        }
        return res.status(200).json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route     /c/:category
 * Des       Get all foods based on category 
 * Params    category
 * Access    Public
 * Method    GET
 */
Router.get('/c/:category', async (req, res) => {
    try {
        const { category } = req.params;
        await CategoryValidation(req.params);
        const foods = await FoodModel.find({
            category: { $regex: category, $options: 'i' }
        });
        if (!foods) {
            return res.status(400).json({ Error: 'Food item not found' });
        }

        return res.status(200).json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;