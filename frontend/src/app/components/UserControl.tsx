import React, { useState } from "react";
import { AuthorizationLevel, UserState, User } from "@/app/models/User";
import Config from "@/../frontend.config";

interface UserControlProps {
  user: User;
}

const UserControl: React.FC<UserControlProps> = ({ user }) => {
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [address, setAddress] = useState<string>(user.address);
  const [authLevel, setAuthLevel] = useState<string>(user.authorizationLevel);
  const [promotions, setPromotions] = useState<boolean>(user.wantsMarketingEmails);
  const [userState, setUserState] = useState<string>(user.userState)

  const saveUserChanges = async () => {

    fetch(`${Config.apiRoot}/admin/updateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        firstName,
        lastName,
        billingAddr: address,
        authorizationLevel: authLevel,
        wantsMarketingEmails: promotions,
        userState: userState,
      }),
    });
  if (userState=="SUSPENDED") {
    fetch(`${Config.apiRoot}/admin/suspendUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      })
    })} else {
      fetch(`${Config.apiRoot}/admin/unsuspendUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        })
      })
    }
};

  return (
    <div className="p-6 bg-gray-900 text-white rounded-md shadow-lg">
      <table className="w-full border-separate border-spacing-4">
        <thead>
          <tr className="text-lg font-semibold bg-gray-800">
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">First Name</th>
            <th className="p-2 text-left">Last Name</th>
            <th className="p-2 text-left">Address</th>
            <th className="p-2 text-left">Authorization Level</th>
            <th className="p-2 text-left">Promotions</th>
            <th className="p-2 text-left">Account State</th>
            <th className="p-2 text-left">Save Changes</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-800">
            <td className="p-2">{user.email}</td>
            <td className="p-2">
              <input
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </td>
            <td className="p-2">
              <input
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </td>
            <td className="p-2">
              <input
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </td>
            <td className="p-2">
              <select
                value={authLevel}
                onChange={(e) => setAuthLevel(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {Object.values(AuthorizationLevel).map((value) => (
                  <option key={value} value={value} className="bg-gray-900">
                    {value}
                  </option>
                ))}
              </select>
            </td>
            <td className="p-2 text-center">
              <input
                className="scale-150 accent-blue-400"
                type="checkbox"
                checked={promotions}
                onChange={(e) => setPromotions(e.target.checked)}
              />
            </td>
            <td className="p-2">
              <select
                value={userState}
                onChange={(e) => setUserState(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {Object.values(UserState).map((value) => (
                  <option key={value} value={value} className="bg-gray-900">
                    {value}
                  </option>
                ))}
              </select>
            </td>
            <td className="p-2">
              <button
                className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={saveUserChanges}
              >
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserControl;
