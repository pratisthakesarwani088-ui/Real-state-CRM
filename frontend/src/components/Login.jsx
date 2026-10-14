import { useState } from "react";
import toast from "react-hot-toast";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // validation
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

   
      localStorage.setItem("token", "userLoggedIn");

      toast.success("Login successful 🎉");

      setIsLoggedIn(true);
    } catch {
      toast.error("Login failed ");
    } finally {
      setLoading(false);
    }
  };

  // Enter key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to your CRM</p>

        {/* EMAIL */}
        <input type="email" placeholder="Enter email" value={email}  onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>

        {/* PASSWORD */}

        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} autoComplete="new-password"/>
         
        {/* BUTTON */}
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}