import { configureStore } from '@reduxjs/toolkit'

import  DemandMiddleware  from './Middlewares/DemandMiddleware';
import Demand from './DemandSlice';
import MasterConfig from './MasterConfigSlice'
import User from './UserSlice'
import Approval from './ApprovalSlice'
import Employee from './EmployeeSlice'
import { MiddlewareList } from './Middlewares/MiddlewareListProvider';
import { ServiceProvider } from '../Services/ServiceProvider';

const serviceProvider = new ServiceProvider(
  {
    apiEndPoint: 'https://<domain>/api/',
    currentEnvironment: 'Dev'
  }
)


export const store = configureStore({
  reducer: {
    Demand,
    MasterConfig,
    User,
    Approval,
    Employee
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MiddlewareList(serviceProvider)),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch



//{
//   serializableCheck: {
//     // Ignore these action types
//     ignoredActions: ['demand/addDemand', 'demand/editDemand'],
//   },
// }