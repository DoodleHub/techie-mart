'use client';

import { useEffect } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';
import Link from 'next/link';

import { useStateContext } from '@/context/StateContext';
import { runFireworks } from '@/lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="description">
          If you have any questions, please email{' '}
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn" style={{ width: '300px' }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
