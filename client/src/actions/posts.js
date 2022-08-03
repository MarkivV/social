import * as api from "../api"
import {CREATE, DELETE, LIKE, UPDATE, FETCH, FETCH_SEARCH} from "../constants/actionTypes";

//action creators

export const getPosts = (page) => async(dispatch) => {
    try{
        const {data} = await api.fetchPosts(page)
        console.log(data)
        dispatch({type: FETCH, payload: data});
    }catch(error){
        console.log(error.message)
    }

}

export const getPostsBySearch = (searchQuery) => async(dispatch) =>{
    console.log(searchQuery)
    try{
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery)
        console.log(data)
        dispatch({type: FETCH_SEARCH, payload: data});
    }catch(error){
        console.log(error.message)
    }
}


export const createPost = (post) => async(dispatch) => {
    try{
        const {data} = await api.createPost(post)
        dispatch({type: CREATE, payload: data});
    }catch(error){
        console.log(error.message)
    }

}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePost = (id) => async(dispatch) => {
    try {
       await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};
export const likePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};



