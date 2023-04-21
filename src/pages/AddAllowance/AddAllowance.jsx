import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import "./AddAllowance.css";
function AddAllowance() {
  const [data, setData] = useState({});

  const [status, setStatus] = useState(false);

  const [desgs, setDesgs] = useState(null);
  const [msg, setMsg] = useState("");
  const [selemp, setSelemp] = useState(null);

  const navigate = useNavigate();
  let type = sessionStorage.getItem("type");
  const handleChange = (e) => {
    const { name, value } = e.target;
    // e.preventDefault();
    // e.target.reset();
    console.log(name);
    setData({ ...data, [name]: value });
    console.log(value);
    if (name === "Designationid" && value !== "") {
      ApiService.selectEmployee(value) //select employee
        .then((res) => {
          console.log(res.data);
          setSelemp(res.data);
        })

        .catch((error) => {
          alert(JSON.stringify(error));
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
  };
  //     if (name === "selectEmp" && value !== "") {
  //       console.log("hi");
  //       setEmpIDs(value);
  //       ApiService.ReportsTo(value) //primary manager
  //         .then((res) => {
  //           console.log(res.data);
  //           setReportsto(res.data);
  //         })
  //         .catch((error) => {
  //           alert(JSON.stringify(error));
  //           setMsg(
  //             error.response.data.errorMessage
  //               ? error.response.data.errorMessage
  //               : error.message
  //           );
  //         });
  //     }
  //     if (name === "reportsTo" && value !== "") {
  //       console.log(value);

  //       ApiService.secondarymanagerpromote(empIDs, value) //secondary manager
  //         .then((res) => {
  //           console.log(res.data);
  //           setSecondarypromote(res.data);
  //         })
  //         .catch((error) => {
  //           alert(JSON.stringify(error));
  //           setMsg(
  //             error.response.data.errorMessage
  //               ? error.response.data.errorMessage
  //               : error.message
  //           );
  //         });
  //     }
  //   };
  // const handleSubmit = (e) => {
  //   setStatus(true);
  //   console.log(data);
  //   const { name, value } = e.target;
  //   // e.preventDefault();
  //   // e.target.reset();
  //   console.log(name);
  //   setData({ ...data, [name]: value });
  //   console.log(data);
  //   ApiService.AddAllowance(data)
  //     .then((res) => {
  //       e.preventDefault();
  //       e.target.reset();
  //       console.log(res.data);
  //       alert("update salary  successfully");
  //       navigate("/hr");
  //     })
  //     .catch((error) => {
  //       alert(JSON.stringify(error));
  //       setMsg(
  //         error.response.data.errorMessage
  //           ? error.response.data.errorMessage
  //           : error.message
  //       );
  //     });
  // };
  if (data.ShiftAllowance === undefined) data.ShiftAllowance = 0;
  if (data.SpecialAllowance === undefined) data.SpecialAllowance = 0;
  if (data.JoiningBonus === undefined) data.JoiningBonus = 0;
  if (data.BonusApplicable === undefined) data.BonusApplicable = 0;
  if (data.depAllowances === undefined) data.depAllowances = 0;
  if (data.extraAllowances === undefined) data.extraAllowances = 0;
  const handleSubmit = (e) => {
    setStatus(true);
    console.log(data);
    const { name, value } = e.target;
    // e.preventDefault();
    // e.target.reset();
    console.log(name);
    setData({ ...data, [name]: value });
    console.log(data);
    ApiService.AddAllowance(
      data.ShiftAllowance,
      data.SpecialAllowance,
      data.JoiningBonus,
      data.BonusApplicable,
      data.depAllowances,
      data.extraAllowances,

      data.selectEmp
    )
      .then((res) => {
        // e.preventDefault();
        // e.target.reset();
        console.log(res);
        alert("data inserted");
        navigate("/hr");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  // };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
  };

  useEffect(() => {
    ApiService.getDesignationse() //choose designation
      .then((res) => {
        //  console.log(res.data);
        setSelemp(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  }, []);

  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Add Allowance</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="chooseDesignation">
            <b>Select Employee</b>
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            id="selectEmp"
            aria-label="employee Type"
            className="selectInput"
            name="selectEmp"
            required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {selemp?.map((type) => (
              <option key={type.lancesoft} value={type.lancesoft}>
                {type.firstName} {type.lastName} {type.lancesoft}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {/* <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="SelectEmp">
            <b>Select Employee</b>
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            id="SelectEmp"
            aria-label="employee Type"
            className="selectInput"
            name="selectEmp"
            required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
        {/* {selemp?.map((type) => (
              <option key={type.empId} value={type.lancesoft}>
                {type.firstName} {type.lastName} {type.lancesoft}
              </option>
            ))} */}
        {/* </Form.Select> */}
        {/* </Form.Group> */}
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="salary">
            <b>Shift Allowance</b>
          </Form.Label>
          <Form.Control
            name="ShiftAllowance"
            id="ShiftAllowance"
            type="number"
            placeholder=""
            //defaultValue={data.ShiftAllowance}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="salary">
            <b>Special Allowance</b>
          </Form.Label>
          <Form.Control
            name="SpecialAllowance"
            id="SpecialAllowance"
            type="number"
            placeholder=""
            //defaultValue={data.salary}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="groove">
          <Form.Group className="mb-3 px-2 text-danger">
            <Form.Label htmlFor="salary">
              <b>Joining Bonus</b>
            </Form.Label>
            <Form.Control
              name="JoiningBonus"
              id="JoiningBonus"
              variant="danger"
              type="number"
              placeholder=""
              //defaultValue={data.salary}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 px-2 text-danger">
            <Form.Label htmlFor="salary" className="danger">
              <b> Bonus Applicable(Tenure)</b>
            </Form.Label>
            <Form.Control
              name="BonusApplicable"
              id="BonusApplicable"
              type="number"
              className="danger"
              placeholder=""
              //defaultValue={data.salary}
              onChange={handleChange}
            />
          </Form.Group>
        </div>{" "}
        {/* <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="AssignEmp">
            Assign To
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            id="AssignEmp"
            aria-label="employee Type"
            className="selectInput"
            name="AssignTo"
            required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
       
            {assignEmp?.map((type) => (
              <option key={type.typeName} value={type.lancesoft}>
                {type.firstName} {type.lastName}
                {type.lancesoft}
              </option>
            ))}
          </Form.Select>
        </Form.Group> */}{" "}
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="salary">
            <b>Deputataion Allowance</b>
          </Form.Label>
          <Form.Control
            name="depAllowances"
            id="depAllowances"
            type="number"
            placeholder=""
            //defaultValue={data.salary}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="salary">
            <b>Extra Allowance</b>
          </Form.Label>
          <Form.Control
            name="extraAllowances"
            id="extraAllowances"
            type="number"
            placeholder=""
            //defaultValue={data.salary}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          submit
        </Button>{" "}
        <Button onClick={handleCancel} variant="danger">
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default AddAllowance;
