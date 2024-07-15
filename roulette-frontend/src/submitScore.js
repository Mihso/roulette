import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
function SubmitScore(score) {
  // eslint-disable-next-line
  const [is_active, setIsActive] = useState(false);
  const [username, setUsername] = useState('');
  const [accounts, setAccounts] = useState([])
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      'username': username,
      'score': score.score,
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

      console.log("Success!");
      setUsername('');
      setIsActive(false)
      navigate("/")
    }
    else {
      console.log("failure");
    }
  }
  useEffect(() => {
    async function getAccounts() {
      const Url = `http://localhost:8000/api/accounts/`
      const autoResponse = await fetch(Url, { method: "get", mode: "cors" })

      if (autoResponse.ok) {
        const autoData = await autoResponse.json()
        setAccounts(autoData.accounts)
      }
    } getAccounts();
  }, [])

  return (
    <section className="vh-101" >
      <div className="container h-100 pt-5 mt-5 mb-4">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Submit your score to leaderboard!</p>

                    <form onSubmit={e => handleSubmit(e)} className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input onChange={e => setUsername(e.target.value)} value={username} type="text" id="form3Example1c" className="form-control" />
                          <label className="form-label" htmlFor="form3Example1c">Your Username</label>
                        </div>
                      </div>

                      Score : {score.score}

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input onChange={e => setIsActive(e.target.checked)} value={is_active} className="form-check-input me-2" type="checkbox" id="form2Example3c" />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree
                        </label>
                      </div>

                      <div>
                        <input type="submit"></input>
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
export default SubmitScore