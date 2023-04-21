


import React, { useState } from 'react'
import { FormInputs } from "../../components/formInputs/FormInputs";
import "./Jobs.css";
import { Button, Form } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

import { useNavigate } from "react-router-dom";
const Jobs = (props) => {
  const navigate = useNavigate();
  const handleOnClickView = (id) => {
    console.log(id);
    navigate("/postedJobProfile", { state: { jobStringId: id } });
  };
  let type = sessionStorage.getItem("type");
return (
  
  <>

  <div className="job-card" >

  <div className="info">

  <div className="name">JobDescriptions:<p>{props?.data?.jd	}</p> </div> &nbsp; 
  <div className="name">OpenDate:<p>{props?.data?.openDate	}</p> </div> &nbsp;
 
    <div className="name"> CloseDate:<p>{props?.data?.closeDate}</p></div> 
    <div className="name">Budget :<p>{props?.data?.budget} </p></div> 


<div className="name">Ticket:<p>{props?.data?.jobStringTicket	}</p> </div> &nbsp;


<div>Sample Resume:</div>
<button className="button">
  <a
     className="button"
     href={props?.data?.sampleResume}
   
     >
    Download Resume:
  </a>
</button>

   
  
  </div>
 
        <label htmlFor="TaggedEmployees">
          TaggedEmployees:
           <nobr />
           <span className="text-danger"> *</span>
         </label>
               <div className="groove">
               <Table responsive>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>LancesoftId</th>
         </tr>
      </thead>
      <tbody>
      {props?.data?.taggedEmployees?.map((type,index) => (
              <tr data-index={index}>
               
                <td><p>{type.employeeName}</p></td>
                <td><p>{type.lancesoftId}</p></td>
               
              </tr>
            ))}
    
      </tbody>
    
    </Table>
    
</div>
<Button
        className=""
        onClick={(e) => {
          e.stopPropagation();
          handleOnClickView(props?.data?.jobStringId);
          //console.log("emp1");
        }}
      >
        View
      </Button>

    </div>
    </>
 )
      }
       

export default Jobs