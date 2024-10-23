import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
function SubmitScore(id) {
  // eslint-disable-next-line
  const [accounts, setAccounts] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    async function getAccounts() {
      const Url = `${process.env.REACT_APP_BACKEND_URL}/api/recipes/${id.id}`
      try{
      const autoResponse = await fetch(Url, { method: "get", mode: "cors" })

      if (autoResponse.ok) {
        const autoData = await autoResponse.json()
        setAccounts(autoData)
      }
      }
      catch(e){
        var temp = [{"id": 1, "name": "pasta", "created": Date.now(), "details": "Nothing"}, {"id": 2, "name": "pizza", "created": Date.now(), "details": "lots of sauce"}];
        setAccounts(temp[id.id - 1])
      }
    } getAccounts();
  }, [])

  return (
    <section className="vh-101" >
      {accounts != null ?
      <div>
        Name: {accounts.name}
        <br></br>
        Excepted time : {accounts.time} minutes.
        <br></br>
        Details: {accounts.details}
      </div>: <div>Information not found.</div>
      }
    </section>

  )

}
export default SubmitScore