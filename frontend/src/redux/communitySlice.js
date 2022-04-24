import {createSlice} from '@reduxjs/toolkit';
import API from '../api';

const getDefaultCommunity = () => {
    
}
export const communitySlice = createSlice({
    name: 'community',
    initialState: {
        userCommunity: [],
        communityInView: getDefaultCommunity(),
        error: null,

    },
    reducers: {
        add_community: (state, action) => {
            const response = API.post('/addCommunity', {
                email: action.payload[0],
                communityToAdd: action.payload[1]
            },  {
                headers: {
                  'Content-Type': 'application/json',
                  'token': `${localStorage.getItem('JWTtoken')}`
                  }
                } 
            ).then((response) => {
                // if successful, call getCommunity again!
                if (response.data) {
                    state.userCommunity.push(action.payload[1]); 
                } else {
                    state.error = "something is wrong"
                }
            })
        },
        remove_community: (state, action) => {
             return state.userCommunity.filter(com => com !== state.communityInView);

            
        },
        change_community_in_view: (state, action) => {
            let currentCommunity = action.payload;
            return Object.assign(state, {communityInView: action.payload});
        },

        community_load_failure:  (state, action) => {
            

        }, 
        getAllCommunities: (state, action) => {
            
        }
    }

});


export const { add_community, remove_community } = communitySlice.actions;
export default communitySlice.reducer;


