import React, { useState } from "react";

interface User {
  name: string;
  email: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");

  const addUser = () => {
    const newUser: User = {
      name: newUserName,
      email: newUserEmail,
    };
    setUsers([...users, newUser]);
    setNewUserName("");
    setNewUserEmail("");
  };

  const deleteUser = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Manage Users</h1>

      <div>
        <input
          type="text"
          placeholder="Enter user name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Enter user email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={addUser}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Existing Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index} className="mb-2">
              {user.name} - {user.email}
              <button
                onClick={() => deleteUser(index)}
                className="ml-4 text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageUsers;
