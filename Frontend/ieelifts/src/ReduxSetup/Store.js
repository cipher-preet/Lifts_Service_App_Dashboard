import { createStore ,combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import  AdminRootReducer  from './RootReducers/AdminRootReducer'
import ChatRootReducer from './RootReducers/ChatRootReducer'
const rootReducer = combineReducers({
     AdminRootReducer:AdminRootReducer,
     ChatRootReducer:ChatRootReducer    
})


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;