import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
// Hooks
import useAuthContext from "../../hooks/useAuthContext.hook";

// Assets
import logo from "../../assets/pelmorex_logo.png";

// Helpers
import { getRandomColor } from "../../helpers/TailwindColor";

export default function Header() {
  const { authUser, logOut } = useAuthContext();

  return (
    <nav
      aria-label="Global"
      className="mx-auto flex items-center justify-between p-6 lg:px-8"
    >
      <div className="flex lg:flex-1">
        <div className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img alt="logo" src={logo} className="h-10 w-auto" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        {authUser && (
          <>
             <div className="flex items-center gap-x-6">
                <Avatar>
                  {authUser.username[0].toUpperCase()}
                </Avatar>
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{authUser.username}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{authUser.status} user</p>
                </div>
              </div>
          </>
        )}
      </div>
      <div className="lg:flex lg:flex-1 lg:justify-end">
        <div
          className="text-sm font-semibold leading-6 text-gray-900 flex items-center cursor-pointer"
          onClick={logOut}
        >
          Log out <LogoutIcon fontSize="small" className="ml-2" />
        </div>
      </div>
    </nav>
  );
}
