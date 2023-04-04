// cut off _id from mongoose response model
export const transform = (document, result) => {
  delete result._id;
};
