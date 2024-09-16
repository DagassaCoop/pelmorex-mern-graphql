import { Link } from "react-router-dom";

// Hooks
import useAuthContext from "../../hooks/useAuthContext.hook";

export default function Login() {
  const { authLogin } = useAuthContext();

  const loginHandler = async (e: any) => {
    e.preventDefault();

    authLogin({ email: "free@gmail.com", password: "1234" });
  };

  return (
    <div className="login-page">
      <div>
        <div>
          <h1>Login Title</h1>
        </div>
        <form onSubmit={loginHandler}>
          <button type="submit">Login</button>
        </form>
        <div>
          <Link to="/registration">Create new account.</Link>
        </div>
      </div>
    </div>
  );
}
