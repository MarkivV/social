import {CREATE, FETCH, UPDATE, LIKE, DELETE, FETCH_SEARCH} from "../constants/actionTypes"
export default (state = [], action) =>{
    switch (action.type){
        case UPDATE:
        case LIKE:
            return state.map((post) => (post._id === action.payload._id ? action.payload : post));
        case FETCH:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                totalNumberOfPages: action.payload.totalNumberOfPages
            };
        case DELETE:
            return state.filter((post)=>post._id !== action.payload);
        case CREATE:
            return [...state, action.payload];
        case FETCH_SEARCH:
            return {...state, posts: action.payload};
        default:
            return state;
    }
}
