import React, { useEffect, useState } from "react";
import {  Form ,Col,Row,Button} from "react-bootstrap";
import ApiService from "../../services/ApiService";


import "./JobProfiles.css";
const JobProfiles = (props) => {
    const[data,setData]=useState([])
    const[file,setFile]=useState(null)
    const[approve,setApprove]=useState(props?.profiles?.managerApproval)
    const[msg,setMsg]=useState(null)
    const[reject,setReject]=useState(null)

    //console.log(props)

    const handleApproval = (id) => {
      // setMessage(e.target.value);

      // const { name, value } = e.target
      // setData({ ...data, [name]: value })
let status=[
  {
    "id": id,
    "status": "APPROVE"
  }
]


      console.log(id);
      // console.log('value is:', e.target.value);

  
      // if (name === "APPROVE") {
        ApiService.ApproveProfiles(status)
          .then((res) => {
             console.log(res.data);
            
          })
  
          .catch((error) => {
            alert(JSON.stringify(error))
            setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
          })
      
  
    
    }
    const handleReject = (id) => {
      console.log(id)
  
      let status1=[
        {
          "id": id,
          "status": "REJECT"
        }
      ]
      // if (name === "REJECT") {
        ApiService.ApproveProfiles(status1)
          .then((res) => {
            // console.log(res.data);
            setReject(res.data)
          })
  
          .catch((error) => {
            alert(JSON.stringify(error))
            setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
          })
      
    
    }
   
   
    return (
      <div id="add-employee" className="card">

            
     <Form >
             
                
     <h1 className="title text-center">Profiles</h1>
                       <hr></hr>
                      
         




<div>  <b>Candidate Id:</b><p>{props?.profiles?.candidateId}</p></div>
<div>  <b>CandidateName:</b><p>{props?.profiles?.candidateName}</p></div>
<div>  <b>EmailId:</b><p>{props?.profiles?.emailId}</p></div>
<div>  <b>MobileNo:</b><p>{props?.profiles?.mobileNo}</p></div>
<div>  <b>CurrentCTC:</b><p>{props?.profiles?.currentCTC}</p></div>
<div>  <b>RelevantExp:</b><p>{props?.profiles?.relevantExp}</p></div>
<div>  <b>ExpectedCTC:</b><p>{props?.profiles?.expectedCTC}</p></div>
<div>  <b>SentBy:</b><p>{props?.profiles?.sentBy}</p></div>
<div>  <b>TotalExp:</b><p>{props?.profiles?.totalExp}</p></div>
<div>  <b>CurrentOrg:</b><p>{props?.profiles?.currentOrg}</p></div>
<div>  <b>SentAt:</b><p>{props?.profiles?.sentAt}</p></div>
<div>  <b>ManagerApproval:</b><p>{approve}</p></div>
<div>  <b>ApproveAt:</b><p>{props?.profiles?.approveAt}</p></div>
<div>  <b>TicketName:</b><p>{props?.profiles?.ticketName}</p></div>
<div><b>CandiResume:</b></div>
                          <button className="button">
                            <a
                              className="button"
                              href={props?.profiles?.candiResume}
                            
                              >
                              Download Resume:
                            </a>
                          </button>










                        

                </Form>
                <Button
                name="APPROVE"
        className="card-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleApproval(props?.profiles?.candidateId);
          //console.log("emp1");
        }}
      >
        Approve
      </Button>
      
      
      <Button
      name="REJECT"
        className="card-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleReject(props?.profiles?.candidateId);
          //console.log("emp1");
        }}
      >
      Reject
      </Button>
                </div>
            
            
      )
}

export default JobProfiles