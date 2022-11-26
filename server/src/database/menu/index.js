import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
    {
        menus: [
            {
                name: { type: String, required: true },
                items: [{
                    type: mongoose.Types.ObjectId,
                    ref: "foods",
                }]
            },
        ],
        recomanded: [{
            type: mongoose.Types.ObjectId,
            ref: "foods"
        }]
    }, {
    timestamps: true,
}
)

export const MenuModel = mongoose.model("menus", MenuSchema)