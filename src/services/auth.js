const signIn = async (username, password) => {

  if (!username) throw new Error('User name is empty');
  if (!password) throw new Error('Password is empty.')

  const res = await fetch('http://localhost:3001/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  const respJson = await res.json();
  if (!res.ok) throw new Error(`${respJson.message}`)
  return respJson;
}

// fake
const signOut = async () => {
  const res = await fetch('http://localhost:3001/api/logout');
  return await res.json();
}

export {
  signIn,
  signOut
}