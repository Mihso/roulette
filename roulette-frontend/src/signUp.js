import React, { useEffect, useState } from 'react';
import { useToken } from "./token";
import { useNavigate } from "react-router-dom";
function SignupPage() {
  // eslint-disable-next-line
  const [token, login] = useToken();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [is_active, setIsActive] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [success, setSuccess] = useState('');
  const [failuree, setFailureE] = useState(false);
  const [failureu, setFailureU] = useState(false);
  const [accounts, setAccounts] = useState([])
  const navigate = useNavigate();

  function confirmedPassword() {
    if (password === password2 && password !== "" && is_active === true) {
      return (
        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button className="btn btn-outline-primary btn-lg">Register</button>
        </div>)
    }
  }

  async function checker() {
    let founde = false
    let foundu = false
    for (let a of accounts) {
      const IndAccountUrl = `http://localhost:8000/api/accounts/${a.id}`
      const fetchSoldConfig = {
        method: "get",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const newResponse = await fetch(IndAccountUrl, fetchSoldConfig);
      const data = await newResponse.json()
      if (username === data.username) {
        setFailureU(true)
        setUsername('')
        foundu = true
      }
      if (email === data.email) {
        setFailureE(true)
        setEmail('')
        founde = true
      }
      if (founde === false) {
        setFailureE(false)
      }
      if (foundu === false) {
        setFailureU(false)
      }
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      'username': username,
      'first_name': first_name,
      'last_name': last_name,
      'email': email,
      'password': password,
      'is_active': is_active
    };
    const accountUrl = `http://localhost:8000/api/accounts/`;
    const fetchSoldConfig = {
      method: "post",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const Response = await fetch(accountUrl, fetchSoldConfig);
    if (Response.ok) {
      const url = `http://localhost:8000/api/login/`;

      const form = new FormData();
      form.append("username", username);
      form.append("password", password);

      const response = await fetch(url, {
        method: "post",
        credentials: "include",
        mode: "cors",
        body: form,
      });
      if (response.ok) {
        login(username, password)
      }
      setFirstName('');
      setLastName('');
      setEmail('');
      setUsername('');
      setPassword('');
      setPassword2('');
      setSuccess(true);
      setFailureE(false)
      setFailureU(false)
      setIsActive(false)
      navigate("/")
    }
    else {
      checker()
      setPassword2('')
      setSuccess(false)
    }
  }
  useEffect(() => {
    async function getAccounts() {
      const Url = `http://localhost:8000/api/accounts/`
      const autoResponse = await fetch(Url, { mode: "cors" })

      if (autoResponse.ok) {
        const autoData = await autoResponse.json()
        setAccounts(autoData.accounts)
      }
    } getAccounts();
  }, [])

  let successful
  let failure
  let failureee
  let failureuu

  if (success === true) {
    successful = "alert alert-success mb-0"
  }
  else {
    successful = "alert alert-success d-none mb-0"
  }
  if (success === false) {
    failure = "alert alert-danger mb-0"
  }
  else {
    failure = "alert alert-danger d-none mb-0"
  }
  if (failuree === true) {
    failureee = "alert alert-danger mb-0"
  }
  else {
    failureee = "alert alert-danger d-none mb-0"
  }
  if (failureu === true) {
    failureuu = "alert alert-danger mb-0"
  }
  else {
    failureuu = "alert alert-danger d-none mb-0"
  }

  return (
    <section className="vh-101" >
      <div className="container h-100 pt-5 mt-5 mb-4">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <form onSubmit={e => handleSubmit(e)} className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input onChange={e => setFirstName(e.target.value)} value={first_name} type="text" id="firstname" className="form-control" />
                          <label className="form-label" htmlFor="firstname">Your First name</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input onChange={e => setLastName(e.target.value)} value={last_name} type="text" id="lastname" className="form-control" />
                          <label className="form-label" htmlFor="lastname">Your Last name</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input onChange={e => setUsername(e.target.value)} value={username} type="text" id="form3Example1c" className="form-control" />
                          <label className="form-label" htmlFor="form3Example1c">Your Username</label>
                          <div className={failureuu} id="failure-message">
                            Username already used. Please insert a new Username
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input placeholder="example@gmail.com" onChange={e => setEmail(e.target.value)} value={email} type="email" id="form3Example3c" className="form-control" />
                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          <div className={failureee} id="failure-message">
                            Email already used. Please insert a new Email.
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input onChange={e => setPassword(e.target.value)} value={password} type="password" id="form3Example4c" className="form-control" />
                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input placeholder="Password must be the same" onChange={e => setPassword2(e.target.value)} value={password2} type="password" id="form3Example4cd" className="form-control" />
                          <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input onChange={e => setIsActive(e.target.checked)} value={is_active} className="form-check-input me-2" type="checkbox" id="form2Example3c" />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="https://www.termsofservicegenerator.net/live.php?token=kmboCeBX0HORqXN4Nx6D8fluQPkkZYD2" target="_blank" rel="noreferrer">Terms of service</a>
                        </label>
                      </div>
                      {confirmedPassword()}
                      <div className="text-center">
                        Have an account already? <a href={`${process.env.PUBLIC_URL}/Login`}>Login</a>
                      </div>
                      <div className={successful} id="success-message">
                        Successfully Created Account
                      </div>
                      <div className={failure} id="failure-message">
                        Failed Creating Account
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )

}
export default SignupPage