import { FETCH_POSTS, UPDATE_LIKES, REMOVE_LIKES, FETCH_LIKES, REMOVE_LIKE } from './types';
import { AsyncStorage} from 'react-native';

export const fetchPosts= ()=> dispatch => {
    fetch('http://damianochiarucci.altervista.org/api/json.php')
    //fetch('https://damianochiarucci.altervista.org/api/myfile.json')
        .then((res) => res.json())
        .then((res) => dispatch({
          type: FETCH_POSTS,
          payload: res
    }));

}

export const fetchLikes= ()=> dispatch => {
    AsyncStorage.getItem("ricette")
    .then((value)=> JSON.parse(value))
    .then((value) => {
      if(value instanceof Array){
        
        dispatch({
            type: FETCH_LIKES,
            payload: value
        });
      }else if (value!== null){
        newArr=[value];
        dispatch({
            type: FETCH_LIKES,
            payload: newArr
        });
  
      }else{
        dispatch({
            type: FETCH_LIKES,
            payload: []
        });
      }
    }).done();

}

export const removeLikes= (removedLike, oldLikes) => dispatch => {

    try{
        let likesArray = oldLikes.filter(function(e){
            return e !== removedLike;
          });
        AsyncStorage.setItem('ricette', JSON.stringify(likesArray));
        dispatch({
            type: REMOVE_LIKES,
            payload: {
                likes: likesArray,
                like: ''
            }
        });
      }
    catch(error){
          console.log(error)
    }

}

export const removeLike= () => dispatch => {

        dispatch({
            type: REMOVE_LIKE,
            payload: {
                like: ''
            }
        });
      

}

export const updateLikes= (newLike, oldLikes) => dispatch => {

    try{
        let likesArray = oldLikes;
        likesArray.push(newLike)
        AsyncStorage.setItem('ricette', JSON.stringify(likesArray));
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                likes: likesArray,
                like: newLike
            }
        });
      }
    catch(error){
          console.log(error)
    }

}