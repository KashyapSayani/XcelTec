import React, { useState } from "react";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

const SignUp = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", mobile: "", country: 1, state: 1, city: 1, isPhoneValid: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let country_1 =  document.getElementById('country').value;
    let state_1 = document.getElementById('state').value;
    let city_1 = document.getElementById('city').value;

    setCredentials({ ...credentials, country: country_1,state: state_1,city:city_1 });

    if (!credentials.isPhoneValid) {
      props.showAlert("Please Enter Valid Phone Number", "danger");
    }
    else if(country_1 === "000"){
      props.showAlert("Please Select a Country", "danger");
    }
    else if(state_1 === "00"){
      props.showAlert("Please Select a State", "danger");
    }
    else if(city_1 === "0"){
      props.showAlert("Please Select a City", "danger");
    }
    else if (credentials.password !== credentials.cpassword) {
      props.showAlert("Password and Confirm Password Must be Same", "danger");
    }
    else {
      const response = await fetch("http://localhost:5000/api/auth", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, mobile: credentials.mobile, country: credentials.country, state: credentials.state, city: credentials.city })
      });

      const json = await response.json()

      if (json.success) {
        props.showAlert("Account Created Successfully", "success");
      }
      else {
        props.showAlert("Sorry a User Already Exists", "danger");
      }
    }
  }

  const onChange = (e) => {
    debugger;
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  };

  const handlePhoneChange = (status, phoneNumber, country) => {
    setCredentials({ ...credentials, mobile: phoneNumber, isPhoneValid: status });
  };


  return (
    <div className="container">
      <h2 className="my-3">Please Create Account Here</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} required minLength={3} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <IntlTelInput
            containerClassName="intl-tel-input"
            inputClassName="form-control"
            name="mobile"
            placeholder="Enter Your Number"
            input
            type="tel"
            onPhoneNumberChange={handlePhoneChange}
          />

        </div>

        <div className="form-group">
          <select className="selectpicker" id="country" style={{ paddingLeft: '10px' }}>
            <option value="000">Please Select Country</option>
            <option value="001">India</option>
          </select>
        </div>

        <div className="form-group">
          <select className="selectpicker" id="state" style={{ paddingLeft: '10px' }}>
          <option value="00">Please Select State</option>
            <option value="01">Gujarat</option>
          </select>
        </div>
        <div className="form-group">
          <select className="selectpicker" id="city" style={{ paddingLeft: '10px' }}>
          <option value="0">Please Select City</option>
            <option value="1">Rajkot</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5} />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
