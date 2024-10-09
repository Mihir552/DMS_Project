import { useDispatch, useSelector } from "react-redux"
import { Demand } from "../../../Domain/Demand/Demand"
import './Demand.css'
import { RootState } from "../../../BusinessLogic/Store/store"
import { SubmitHandler, useForm } from "react-hook-form"
import { useParams, useLocation } from "react-router-dom"
import { addDemand, editDemand, setLoader } from "../../../BusinessLogic/Store/DemandSlice"
import { useEffect, useState } from "react"
import { error } from "console"
import { Spinner } from "../Common/Spinner"
import { updateApprovals } from "../../../BusinessLogic/Store/ApprovalSlice"
import ApprovalConfirmationModal from "../Approval/ApprovalConfirmationModal"
import { DemandStatusModal } from "./DemandStatusModal"
export const DemandFormComponent = () => {
    const { uid } = useParams()

    const isNewDemand = !uid;
    const role = useSelector((state: RootState) => state.User.userInfo?.Roles)

    const [currentUID, setCurrrentUid] = useState('')
    const demand = useSelector((state: RootState) => uid ?
        state.Demand.demandsList.filter(x => x.uid === uid).length > 0 ? state.Demand.demandsList.filter(x => x.uid === uid)[0] : state.Demand.sampleDemand
        : state.Demand.sampleDemand)
    const approvals = useSelector((state: RootState) => state.Approval.approvalList)
    const masterConfigs = useSelector((state: RootState) => state.MasterConfig)
    const isDemandLoading = useSelector((state: RootState) => state.Demand.isLoading)
    const isDemandActionSuccess = useSelector((state: RootState) => state.Demand.isActionSuccess)
    const demandError = useSelector((state: RootState) => state.Demand.errorList)
    const isApprovalLoading = useSelector((state: RootState) => state.Approval.isLoading)
    const dispatch = useDispatch();
    const location = useLocation()
    const isViewOnly: boolean = location.pathname.includes('ViewDemand') || (isDemandLoading || isApprovalLoading)
    const isEditOnly: boolean = location.pathname.includes('EditDemand')
    const isApprovalOnly: boolean = location.pathname.includes('Approval')
    const [disableOtherContractor, setDisableOtherContractor] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<Demand>({
        defaultValues: demand
    })

    const [showModal, setShowModal] = useState<{ display: boolean, status: 'Approve' | 'Reject', ID: string }>({ display: false, status: 'Approve', ID: '' });

    const onSubmit: SubmitHandler<Demand> = (data) => {
        setCurrrentUid(data.uid)
        console.log(data)
        if (isNewDemand) {
            dispatch(addDemand(data))
        }
        else {
            dispatch(editDemand(data))
        }
    }

    const resetOtherContractor = (e: number) => {
        if (e < 100) {
            setValue('otherContractor', '');
            setDisableOtherContractor(true)
        }
        else{
            setDisableOtherContractor(false)
        }
    }

    const setRaisedByValue = (e: any) => {

        const selectedDepartment = Number(e.target.value)
        const department = masterConfigs.departmentMaster.filter(x => x.departmentId === selectedDepartment)[0]
        setValue('raisedBy', department.initiator_Name)
        return department.initiator_Name;
    }

    useEffect(() => {
        window.setTimeout(() => {
            reset(demand);
            console.log('Setting fields', demand);
            const department = masterConfigs.departmentMaster.filter(x => x.departmentId === demand.department)[0]
            setValue('raisedBy', department.initiator_Name);
            resetOtherContractor(demand.contractorReplacement)
            setValue('secondarySkills', demand.secondarySkills.map(x => x.toString()))
        }, 1000)

    }, [demand, uid])

//#region Approval
function showModalDialog(value: 'Approve' | 'Reject') {
    setShowModal({ display: !showModal.display, status: value, ID: demand.uid });
}

function UpdateApproval(ID: string, action: 'Approve' | 'Reject', comment: string) {
    if (comment) {
        let Currentapprovals = [...approvals].filter(x => ID === (x.uid)).map(x => ({ ...x, action: action === 'Approve', remark: comment }))
        dispatch(updateApprovals(Currentapprovals));
    }
    setShowModal(val => ({ ...val, display: false }))
}


//#endregion

    
    return (
        <>
            <div style={{ marginLeft: '5%' }}>
                <h2>{location.pathname.includes('NewDemand') ? 'Create A New Demand:' :
                    location.pathname.includes('EditDemand') ? 'Edit Demand #' + demand?.uid :
                        location.pathname.includes('ViewDemand') ? 'View Demand #' + demand?.uid :
                            isApprovalOnly ? 'Approve Demand #' + demand.uid : ''} </h2>
            </div>

            {(isApprovalOnly && demand.uid !== '') && <div style={{ margin: '20px', minHeight: '3em', paddingLeft: '150px', position: 'sticky', height: '5em', display: 'flex', alignItems: 'center', width: '80%', backgroundColor: 'white', zIndex: 2, top: 0 }}>
                {role?.includes('Demand Manager') ? (
                    <input className="LinkButton" type="button" value={'Send for Approval'} onClick={e => showModalDialog('Approve')} />
                ) : (
                    <>
                        <input className="LinkButton" style={{ backgroundColor: 'orange' }} type="button" value={'Reject '} onClick={e => showModalDialog('Reject')} />
                        <input className="LinkButton" type="button" value={'Approve '} onClick={e => showModalDialog('Approve')} />
                    </>
                )}
        </div>
}

            {
                uid && demand.uid === '' ? <div style={{width: '100%', fontSize: '3em', display: 'flex', justifyContent: 'center', marginTop: '10%'}}>No such demand found</div>

                    : <div style={{ display: 'flex', height: '80vh', alignItems: 'stretch', justifyContent: 'center' }}>
                        {demand ?
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="uid">UID<span style={{color:'red'}}>*</span>:</label>
                                    <input disabled={isViewOnly || isEditOnly || isApprovalOnly} type='text' id='uid' {...register("uid", { required: 'UID is required' })} placeholder="UID1001"></input>
                                    <label className='errorLabel' >{errors.uid?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="department">Department<span style={{color:'red'}}>*</span>:</label>
                                    <select disabled={isViewOnly || isApprovalOnly} id="department" {...register('department', { required: 'Please select a department' })} onChange={setRaisedByValue} onLoad={setRaisedByValue}>
                                        {masterConfigs.departmentMaster.map(x => <option key={x.departmentId} value={x.departmentId}>{x.departmentName}</option>)}
                                    </select>
                                    <label className='errorLabel'>{errors.department?.message}</label>
                                </div>
                                <div>
                                    <label htmlFor="practice">Practice<span style={{color:'red'}}>*</span>:</label>
                                    <select disabled={isViewOnly || isApprovalOnly} id="practice" {...register('practice', { required: 'Please select a practice' })} onChange={setRaisedByValue} onLoad={setRaisedByValue}>
                                        {masterConfigs.practiceMaster.map(x => <option key={x.id} value={x.id}>{x.practiceName}</option>)}
                                    </select>
                                    <label className='errorLabel'>{errors.practice?.message}</label>
                                </div>

                                <div>

                                    <label htmlFor="Application">Asset<span style={{color:'red'}}>*</span>:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} id="Application" {...register('asset', { required: 'Please select an Asset' })} type='text' list="AssetList"></input>

                                    <datalist id="AssetList">
                                        <option value="CARE">CARE</option>

                                        <option value="KDB">KDB</option>
                                        <option value="DocumentService">Document Services</option>

                                        <option value="EASY">EASY</option>
                                    </datalist>
                                    <label className='errorLabel'>{errors.asset?.message}</label>
                                </div>

                                <div>

                                    <label htmlFor="role">Role<span style={{color:'red'}}>*</span>:</label>
                                    <select disabled={isViewOnly || isApprovalOnly} id='role' {...register('role', { required: 'Please select a role' })} >
                                        {masterConfigs.roleMaster.map(x => <option value={x.id} key={x.id}>{x.role}</option>)}
                                    </select>
                                    <label className='errorLabel'>{errors.role?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="roleDetails">Role Details(optional):</label>
                                    <input type='text' disabled={isViewOnly || isApprovalOnly} id='roleDetails' {...register('roleDetails')} />
                                    <label className='errorLabel'>{errors.roleDetails?.message}</label>
                                </div>
                                <div>

                                    <label htmlFor="status">Status:</label>
                                    <select disabled={isViewOnly || isApprovalOnly} id="status" {...register('status', {valueAsNumber: true})} >
                                        {masterConfigs.statusMaster.map(x => <option key={x.id} value={x.id}>{x.status}</option>)}
                                    </select>
                                    <label className='errorLabel'>{errors.status?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="experience">Years of Experience<span style={{color:'red'}}>*</span>:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} type="number" min={0} step="0.01" {...register('yearsOfExp', { required: 'Please enter Years of experience' })} />
                                    <label className='errorLabel'>{errors.yearsOfExp?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="RaisedBy">Raised By<span style={{color:'red'}}>*</span>:</label>
                                    <input disabled={true} id="RaisedBy" {...register('raisedBy')} type="text"></input>
                                    <label className='errorLabel'>{errors.raisedBy?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="PrimarySkill">PrimarySkill:</label>
                                    <select disabled={isViewOnly || isApprovalOnly} id="PrimarySkill" {...register('primarySkills', { required: 'Please select a primary Skill' })} >
                                        {masterConfigs.skillsMaster.filter(x => x.skillType === 'p').map(x => <option value={x.skillId} key={x.skillId}>{x.skillName}</option>)}
                                    </select>
                                    <label className='errorLabel'>{errors.primarySkills?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="SecondarySkill">SecondarySkill:</label>
                                    <select disabled={isViewOnly || isApprovalOnly} id="SecondarySkill" size={3} {...register('secondarySkills', { required: 'Please select atleast one secondary skill' })} multiple>
                                        {masterConfigs.skillsMaster.filter(x => x.skillType === 's').map(x => <option value={x.id} key={x.id}>{x.skillName}</option>)}
                                    </select>
                                    <label className='errorLabel'>{errors.secondarySkills?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="SkillDetails">Skill Details:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} id="SkillDetails" {...register('skillDetails')} type='input'></input>
                                    <label className='errorLabel'>{errors.skillDetails?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="JDFileLocationField">JD File Location<span style={{color:'red'}}>*</span>:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} id="JDFileLocationField" {...register('jdFileLocation', { required: 'Please enter the file location of JD' })} type='input'></input>
                                    <label className='errorLabel'>{errors.jdFileLocation?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="DemandInitiatorFileLocationField">Demand Initiator File Location<span style={{color:'red'}}>*</span>:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} id="DemandInitiatorFileLocationField" {...register('demandInitiationFileLocation', { required: 'Please enter the file location for Demand Initiator' })} type='input'></input>
                                    <label className='errorLabel'>{errors.demandInitiationFileLocation?.message}</label>
                                </div>

                                <div className="hclCheckBox">
                                    <label htmlFor="hlcApprovalchkBox">HLC Approval:  </label>
                                    <input disabled={isViewOnly || isApprovalOnly} type="checkbox" id="hlcApprovalchkBox" {...register('hlcApproval')} />
                                    <label className='errorLabel'>{errors.hlcApproval?.message}</label>
                                </div>


                                <div>{
                                    watch('hlcApproval') ?
                                        <><label htmlFor="hlcApprovalDate">HLC Approval Date:</label>
                                            <input disabled={isViewOnly || isApprovalOnly} id="hlcApprovalDate" {...register('hlcApprovalDate')} type="date"></input>
                                            <label className='errorLabel'>{errors.hlcApprovalDate?.message}</label>
                                        </>

                                        :
                                        <> 
                                        <div></div>  
                                        </>
                                }

                                </div>

                                <div>
                                    <label htmlFor="mtbShare">MTB Share %:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} id="mtbShare" {...register('mtbShare')} type="number" min={0} max={100}></input>
                                    <label className='errorLabel'>{errors.mtbShare?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="contractorReplacement">Contractor Replacement:</label>
                                    {/* <input disabled={isViewOnly || isApprovalOnly} id="ContractorReplacementNeeded" {...register('contractorReplacement')}></input> */}
                                    <select disabled={isViewOnly || isApprovalOnly} id="contractorReplacement" {...register('contractorReplacement', {valueAsNumber: true}) } onChange={e => resetOtherContractor(Number(e.target.value))}>
                                        <option value={-1}>Please select</option>
                                        {masterConfigs.contractorMaster.map(x => <option value={x.contractorId} key={x.id}>{x.contractorName}</option>)}
                                    </select>
                                    <label className='errorLabel'>{errors.contractorReplacement?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="OtherContractor">External Contractor Name:</label>
                                    <input disabled={isViewOnly || isApprovalOnly || disableOtherContractor} id="OtherContractor" {...register('otherContractor')} type='text'></input>
                                    <label className='errorLabel'>{errors.otherContractor?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="raisedOn">Raised On:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} id="raisedOn" {...register('raisedOn')} type="date"></input>
                                    <label className='errorLabel'>{errors.raisedOn?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="requiredByDate">Required By Date<span style={{color:'red'}}>*</span>:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} id="requiredByDate" {...register('requiredByDate', {required: 'Please enter Required By Date'})} type="date"></input>
                                    <label className='errorLabel'>{errors.requiredByDate?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="rechargeDate">Recharge Date:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} id="rechargeDate" {...register('rechargeDate')} type="date"></input>
                                    <label className='errorLabel'>{errors.rechargeDate?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="ktStartDate">KT Start Date<span style={{color:'red'}}>*</span>:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} id="ktStartDate" {...register('kTstartDate', { required: 'Please enter KT start date' })} type="date"></input>
                                    <label className='errorLabel'>{errors.kTstartDate?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="ktEndDate">KT End Date<span style={{color:'red'}}>*</span>:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} id="ktEndDate" {...register('kTendDate', { required: 'Please enter KT End date' })} type="date"></input>
                                    <label className='errorLabel'>{errors.kTendDate?.message}</label>
                                </div>

                                <div>
                                    <label htmlFor="Remarks">Remarks<span style={{color:'red'}}>*</span>:</label>
                                    <input disabled={isViewOnly || isApprovalOnly} id="Remarks" {...register('additionalRemark', {required: 'Please enter Remarks'})} type='text'></input>
                                    <label className='errorLabel'>{errors.additionalRemark?.message}</label>
                                </div>
                                {isViewOnly || isApprovalOnly ? '' : <input disabled={isViewOnly || isApprovalOnly} className="LinkButton" type="submit" />}
                                {(isDemandLoading || isApprovalLoading) && <Spinner />}
                            </form>

                            : ''}
                    </div>}
            {((isDemandLoading || isApprovalLoading) && uid && demand.uid === '') && <Spinner />}
            {showModal.display ? <ApprovalConfirmationModal ID={[showModal.ID]} action={showModal.status} callback={UpdateApproval}></ApprovalConfirmationModal> : ''}
            {isDemandActionSuccess || demandError.id === currentUID ? <DemandStatusModal error={demandError.id === currentUID ? demandError.error : []} isSuccess={isDemandActionSuccess} isNewDemand={isNewDemand} ></DemandStatusModal> : ''}
        </>

    )
}