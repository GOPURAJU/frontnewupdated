// import React, { useEffect } from "react";

import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import ApiService from "../../services/ApiService";



import "./Recruiter.css";
import Jobs from "../jobNotifications/Jobs";
function RecruiterNotifications() {
  const[data,setData]=useState({})
  const[file,setFile]=useState(null)

  const [status, setStatus] = useState(false);
  // const[jobs,setJobs]=useState([])
  const[msg,setMsg]=useState(null)


  useEffect(() => {
    setStatus(false);
 ApiService.getRecruiterNotifications(true)
      .then((res) => {
     console.log(res.data);
       setStatus(true);
    setData(res.data)
      })
      .catch((error) => {
        setStatus(false);
        console.log(error);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
 
  }, []);

  return (

<div>
  <nav className="Navitems"><h1>Posted jobs</h1>
  
  </nav>
 
<div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
        {data?.length>0 && data.map(it=> <Jobs data={it}/>)}
      </div>
      </div>
   
  );
}

export default RecruiterNotifications;

