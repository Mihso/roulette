import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
function SubmitScore(id) {
  // eslint-disable-next-line
  const [accounts, setAccounts] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    async function getAccounts() {
      const Url = `http://localhost:8000/api/recipes/${id.id}`
      const autoResponse = await fetch(Url, { method: "get", mode: "cors" })

      if (autoResponse.ok) {
        const autoData = await autoResponse.json()
        setAccounts(autoData)
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