import { useState } from "react";
import "./SignIn.css";
import { createUser, getUserHandle } from "../../services/UserServices/user-services";
import { registerUser } from "../../services/UserServices/auth-services";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const updateForm = (prop) => (event) => {
    setForm({
      ...form,
      [prop]: event.target.value,
    });
  };

  const register = async () => {
    try {
      const user = await getUserHandle(form.username);
      if (user.exists()) {
        return console.log(
          `User with handle ${form.username} already exists. Please choose another username.`
        );
      }
      const credentials = await registerUser(form.email, form.password);
      navigate('/home');
      await createUser(
        form.username,
        form.firstName,
        form.lastName,
        credentials.user.uid,
        form.email,
        form.phoneNumber,
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div id="sign-in-main-container">
      <label htmlFor="FirstName">First Name</label>
      <input type="text" id="FirstName" value={form.firstName} onChange={updateForm('firstName')}/>
      <label htmlFor="LastName">Last Name</label>
      <input type="text" id="LastName" value={form.lastName} onChange={updateForm('lastName')}/>
      <label htmlFor="UserName">User Name</label>
      <input type="text" id="UserName" value={form.username} onChange={updateForm('username')}/>
      <label htmlFor="Email">Email</label>
      <input type="email" id="Email" value={form.email} onChange={updateForm('email')}/>
      <label htmlFor="pass">Password</label>
      <input type="password" id="pass" value={form.password} onChange={updateForm('password')}/>
      <label htmlFor="phone">Phone number</label>
      <input type="text" id="phone" value={form.phoneNumber} onChange={updateForm('phoneNumber')}/>

      <button onClick={register}>Register</button>
    </div>
  );
}
