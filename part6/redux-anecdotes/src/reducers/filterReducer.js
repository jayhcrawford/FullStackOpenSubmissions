//action creators
export const addFilter = (filter) => {
  return { type: 'SET_FILTER' , payload: filter }
}
//(close) action creators

export const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      let newFilter = action.payload
      return newFilter
    default:
      return state
  }

}

export default filterReducer