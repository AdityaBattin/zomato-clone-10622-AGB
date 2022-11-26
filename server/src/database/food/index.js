import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        descript: { type: String, required: true },
        isVeg: { type: Boolean, required: true },
        isContainsEgg: { type: Boolean, required: true },
        category: { type: String, required: true },
        photo: {
            type: mongoose.Types.ObjectId,
            ref: "images",
        },
        prices: { type: Number, required: true },
        addOnes: [{
            type: mongoose.Types.ObjectId,
            ref: "foods",
        },],
        restaurant: {
            type: mongoose.Types.ObjectId,
            ref: "restaurants",
            required: true,
        }
    },
    {
        timestamps: true,
    });

export const FoodModel = mongoose.model("foods", FoodSchema);