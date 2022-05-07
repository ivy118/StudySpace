import {createSlice} from '@reduxjs/toolkit';
import API from '../api';
import store from './store';

export const communitySlice = createSlice({
    name: 'community',
    initialState: {
      userCommunity: [],
      communityInView: null,
      error: null,
    },
    reducers: {
        fill_community: (state, action) => {
            return { ...state, userCommunity: action.payload, error: null};
        },
        append_community: (state, action) => {
            return { ...state, userCommunity: [...state.userCommunity, action.payload], error: null};
        },
        remove_community: (state, action) => {
             return state.userCommunity.filter(com => com !== state.communityInView);
        },
        community_add_failure:  (state, action) => {
            return { ...state, error: action.payload }
        }, 
        cancel_community_add: (state, action) => {
            return {...state, error: null};
        },
        change_community_view: (state, action) => {
            return {...state, communityInView: action.payload};
        }
    }
});

export const getPersonalCommunity = (action) => {
    return async (dispatch) => {
    const response = await API.post("/user/getUsersCommunities", {
            email: action
        },  
        { headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('JWTtoken')}`
          }
        } 
      ).then(async(response)=> {
        if (response.data) {
            await dispatch(fill_community(response.data))
        }
      }).catch(function (error) {
        console.log(error, "error in getPersonalCommunity, communitySlice");
      });
  }
}

export const add_community = (action) => {
    return async (dispatch) => {
    const response = await API.post("/user/addCommunity", {
            communityToAdd: action,
            email: localStorage.getItem("email")
        },  
        { headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('JWTtoken')}`
          }
        } 
      ).then(async (response)=> {
        if (response.data === "You already belong to this community.") {
            await dispatch(community_add_failure("You already belong to this community."));
        } else {         
            await dispatch(append_community(action));
        }
      }).catch(function (error) {
        console.log(error, "error in add_community, communitySlice");
      });
  }
};


export const { append_community, cancel_community_add, remove_community, fill_community, community_add_failure, change_community_view } = communitySlice.actions;
export default communitySlice.reducer;


