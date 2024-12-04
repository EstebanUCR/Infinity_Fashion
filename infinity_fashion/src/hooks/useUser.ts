import { useState } from 'react';
import type { userData } from "../types/types";
const useUser = () => {
  const [user, setUser] = useState<userData>({
    name: '',
    email: '',
    password: '',
    phone: null,
    shipping_address: null,
    billing_address: null,
    profile_picture: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return { user, handleInputChange };
};

export default useUser;
