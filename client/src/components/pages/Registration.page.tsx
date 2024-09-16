// Hooks
import useAuthContext from "../../hooks/useAuthContext.hook";

// Types
import { EUserStatus } from "../../app/types/User.type";

export default function Registration() {
  const { authSighUp } = useAuthContext();

  const sighUpHandler = async (e: any) => {
    e.preventDefault();
    authSighUp({
      username: "free",
      email: "free2@gmail.com",
      password: "1234",
      status: EUserStatus[EUserStatus.free],
    });
  };

  return (
    <div>
      <h1>Registration Title</h1>
      <button onClick={sighUpHandler}>Register new User</button>
    </div>
  );
}
