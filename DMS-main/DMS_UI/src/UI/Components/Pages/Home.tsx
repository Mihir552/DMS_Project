import { MouseEventHandler, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../BusinessLogic/Store/store";
import { Demand } from "../../../Domain/Demand/Demand";
import { Link, useNavigate } from "react-router-dom";
import { GridComponent } from "../Common/GridComponent";
import { init, setLoader } from "../../../BusinessLogic/Store/DemandSlice";
import { Spinner } from "../Common/Spinner";

export const Home = () => {
    const dispatch = useDispatch();
    const sampledemand = useSelector((state: RootState) => state.Demand.sampleDemand)
    const isDemandLoading = useSelector((state: RootState) => state.Demand.isLoading)
    const demands = useSelector((state: RootState) => state.Demand.demandsList)
    const masterConfigs = useSelector((state: RootState) => state.MasterConfig)
    const user = useSelector((state: RootState) => state.User)
    const navigate = useNavigate();

    const [selectedRows, setSelectedRow] = useState([] as Demand[]);

    function updateSelectedRows(rows: Demand[]) {
        setSelectedRow(rows)
    }

    function OpenDemand(uid: number): void {
        navigate(`/EditDemand/${uid}`)
    }

    function NewDemand(): void {
        navigate(`/NewDemand/`)
    }

    // useEffect(() => {
    //     fetch('https://localhost:44359/WeatherForecast', {method: 'GET', headers})
    // }, [])
    return (
        <div style={{margin: '20px'}}>
            <div style={{margin: '20px', width: '90%', height: '5em', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                {user.userInfo?.Roles?.includes('Demand Manager') ?
                    <><Link to={'NewDemand'}>
                        <button type="button" className="LinkButton">
                            + Create New Demand
                        </button></Link>
                        {/* <button type="button" className="LinkButton" onClick={e => }>
                            Bulk Upload Demand
                        </button> */}
                       </> 
                    :
                    ''}
            </div>
            {isDemandLoading ? <Spinner /> : <GridComponent demand={demands}  rowsSelected={updateSelectedRows}/>}
        </div>
    )
}
