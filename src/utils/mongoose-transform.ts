// cut off _id from mongoose response model
export const transform = (document: any, result: any): void => {
  // eslint-disable-next-line no-param-reassign
  delete result._id;
};
