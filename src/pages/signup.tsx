import React, { useState } from 'react';

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Add signup logic here
    console.log('Name:', name, 'Email:', email, 'Password:', password);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <form onSubmit={handleSignup} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
