import { useContext, useState } from "react";
import { loginUser } from "../../services/UserServices/auth-services";
import { getUserData } from "../../services/UserServices/user-services";
import { AppContext } from "../../components/context/UserContext/UserContext";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const { user, userData, setUserContext } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const login = async () => {
    try {
      const credentials = await loginUser(form.email, form.password);

      if (credentials.user) {
        await getUserData(credentials.user.uid).then((snapshot) => {
            setUserContext({
            user: credentials.user,
            userData: snapshot.val()[Object.keys(snapshot.val())[0]],
          });
        });
      }
        navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div>
      <label htmlFor="email">Enter email:</label>
      <input type="text" id="email" value={form.email} onKeyDown={handleKeyPress} onChange={updateForm("email")}/>
      <label htmlFor="pass">Enter Password:</label>
      <input type="password" id="pass" value={form.password} onKeyDown={handleKeyPress} onChange={updateForm("password")}/>
      <button onClick={login}>Log In</button>
    </div>
  );
}
