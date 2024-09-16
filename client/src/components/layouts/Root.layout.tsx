import { Outlet, Link } from 'react-router-dom';

function Root() {
  return (
    <div>
      <header>
        {/* <Link>Login</Link> */}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
