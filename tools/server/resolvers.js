import data from './brand-data';

export default {
  Query: {
    brands: (obj, { limit, offset }) =>
      data.map((brand, index) => ({ id: index, ...brand })).slice(offset, limit + offset),
  },
};
