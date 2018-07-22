import { FETCH_POSTS, UPDATE_LIKES, FETCH_LIKES, REMOVE_LIKES, REMOVE_LIKE } from '../actions/types';

const initialState = {
    items: [],
    likes:[],
    like:''
}

export default function(state = initialState, action){
    switch(action.type) {
    case FETCH_POSTS:
    
        return {
            ...state,
            items: action.payload
        }
    case FETCH_LIKES:
        return{
            ...state,
            likes: action.payload
        }
    case REMOVE_LIKES:

        return{
            ...state,
            likes: action.payload.likes,
            like: action.payload.like

        }

    case REMOVE_LIKE:

        return{
            ...state,
            like: action.payload.like

        }

    case UPDATE_LIKES:

        return{
            ...state,
            likes: action.payload.likes,
            like: action.payload.like

        }
    default:
        return state;
    }
}