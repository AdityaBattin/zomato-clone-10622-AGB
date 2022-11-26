import joi from "joi";

export const RestaurantCityValidation = (restaurantObject) => {
  const Schema = joi.object({
    city: joi().string().required(),
  });

  return Schema.validateAsync(restaurantObject);
};

export const SearchStringValidation = (restaurantObject) => {
  const Schema = joi.object({
    searchString: joi().string().required(),
  });

  return Schema.validateAsync(restaurantObject);
};
