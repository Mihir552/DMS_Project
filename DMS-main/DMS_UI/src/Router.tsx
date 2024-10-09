import { createHashRouter } from "react-router-dom";
import { Home } from "./UI/Components/Pages/Home";
import { Login } from "./UI/Components/Pages/Login";
import { DemandFormComponent } from "./UI/Components/Demand/DemandFormComponent";
import { UserInfo } from "./UI/Components/Pages/UserInfo";
import { ApprovalPage } from "./UI/Components/Pages/Approval";

const router = createHashRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/EditDemand/:uid',
        element: <DemandFormComponent />
    },
    {
        path: '/ViewDemand/:uid',
        element: <DemandFormComponent />
    },
    {
        path: '/NewDemand/',
        element: <DemandFormComponent />
    },
    {
        path: '/Approval/:uid',
        element: <DemandFormComponent />
    },
    {
        path: '/Approval',
        element: <ApprovalPage />
    },
    {
        path: 'UserInfo',
        element: <UserInfo />
    }
]);


export default router;