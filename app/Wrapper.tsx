'use client';

import { Footer, Navbar } from '@/components';
import { StateContext } from '@/context/StateContext';

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <StateContext>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </StateContext>
  );
};

export default Wrapper;
