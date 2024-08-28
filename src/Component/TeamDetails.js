import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const TeamDetails = () => {
  const { id } = useParams();
  const team = useSelector((state) =>
    state.teams.find((team) => team.id === parseInt(id))
  );

  if (!team) return <div className="text-center mt-10">Team not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800">{team.name}</h1>
      <p className="text-gray-600 mt-4">{team.description}</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.members.map((member) => (
          <div key={member.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold text-gray-800">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;