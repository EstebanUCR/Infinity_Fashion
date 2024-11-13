export const signUp = async (email: string, password: string, name: string): Promise<any> => {
  const response = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
  return response.json();
};

export const signIn = async (email: string, password: string): Promise<any> => {
  const response = await fetch('http://localhost:3000/api/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
      console.log("dentro de signIn");
  return response.json();
};

export const signOut = async (): Promise<any> => {
  const response = await fetch('http://localhost:3000/api/signout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};
