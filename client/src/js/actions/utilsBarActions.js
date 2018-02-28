export const setFilter = (filterType) => {
  //change filter
  return {
    type: 'SET_FILTER',
    payload: filterType
  };
};

export const setSort = (sortType) => {
  //change filter
  return {
    type: 'SET_SORT',
    payload: sortType
  };
};