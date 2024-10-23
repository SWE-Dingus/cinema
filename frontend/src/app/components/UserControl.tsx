import React, { useState } from "react";
import { AuthorizationLevel, User } from "@/app/models/User";

interface UserControlProps {
  user: User;
}

const UserControl: React.FC<UserControlProps> = ({ user }) => {
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [address, setAddress] = useState<string>(user.address);
  const [authLevel, setAuthLevel] = useState<AuthorizationLevel>(user.authorizationLevel);
  const [promotions, setPromotions] = useState<boolean>(user.wantsMarketingEmails);

  return (
    <table className="border-separate border-spacing-5">
    <thead>
      <tr>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Address</th>
        <th>Authorization Level</th>
        <th>Promotions</th>
        <th>Save Changes</th>
      </tr>
    </thead>
    <tbody>
      <tr className="text-black">
        <td className="text-white">{user.email}</td>
        <td>
          <input
            className="text-black"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </td>
        <td>
          <input
            className="text-black"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </td>
        <td>
          <input
            className="text-black"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </td>
        <td>
          <select
              value={authLevel}
              onChange={(e) => {
                setAuthLevel(AuthorizationLevel[e.target.value as keyof typeof AuthorizationLevel]);
              }}
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
            >
              {Object.values(AuthorizationLevel).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
        </td>
        <td>
          <input
            className="text-black"
            type="checkbox"
            id="promotions"
            checked={promotions}
            onChange={(_) => {setPromotions(!promotions)}}
          />
        </td>
        <td>
          <button className="bg-white text-black rounded">Save</button>
        </td>
      </tr>
      </tbody>
    </table>
  );
};

export default UserControl;
