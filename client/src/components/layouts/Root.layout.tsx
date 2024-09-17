import { Outlet } from 'react-router-dom';
import Header from '../shared/Header.component';

function Root() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
