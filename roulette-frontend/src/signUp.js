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
  const navigate = useNavigate();

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
    const accountUrl = `http://localhost:8000/api/recipes/`;
    const fetchSoldConfig = {
      method: "post",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const Response = await fetch(accountUrl, fetchSoldConfig);
  }
  useEffect(() => {
    async function getAccounts() {
      const Url = `http://localhost:8000/api/recipes/`
      const autoResponse = await fetch(Url, { method: "get", mode: "cors" })

      if (autoResponse.ok) {
        const autoData = await autoResponse.json()
      }
    } getAccounts();
  }, [])


  return (
<div>

</div>
  )

}
export default SignupPage