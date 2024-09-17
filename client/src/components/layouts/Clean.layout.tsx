import { Outlet } from 'react-router-dom';

function Clean() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Clean;
