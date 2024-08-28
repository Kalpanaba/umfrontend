import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}'s avatar`}
            className="w-16 h-16 rounded-full mb-4"
          />
          <h2 className="text-lg font-bold text-gray-800">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          {/* <Link
            to={`/team/${user.id}`}
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Team
          </Link> */}
        </div>
      );
    
};

export default UserCard;
