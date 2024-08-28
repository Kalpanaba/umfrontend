import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/userSlice';
import { setQuery, setDomain, setGender, setAvailable } from '../features/filterSlice';

const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const { query, domain, gender, available } = useSelector((state) => state.filters);
  const [domains, setDomains] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const genders = ['Male', 'Female']; // Define available genders

  // Fetch domains and users on component mount
  const fetchDomainsAndUsers = useCallback(async () => {
    try {
      const response = await axios.get('https://umbackend.onrender.com/api/users');
      const usersData = response.data.users;
      const domains = [...new Set(usersData.map(user => user.domain))];
      setDomains(domains);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching domains and users:', error);
    }
  }, []);

  useEffect(() => {
    fetchDomainsAndUsers();
  }, [fetchDomainsAndUsers]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'domain':
        dispatch(setDomain(value));
        break;
      case 'gender':
        dispatch(setGender(value));
        break;
      case 'available':
        dispatch(setAvailable(value));
        break;
      default:
        break;
    }
    // Fetch users whenever filters change
    dispatch(fetchUsers({
      query,
      domain,
      gender,
      available,
    }));
  };

  // Handle query change
  const handleQueryChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  // Handle search
  const handleSearch = () => {
    dispatch(fetchUsers({
      query,
      domain,
      gender,
      available,
    }));
    onSearch(query);
  };

  // Handle user selection
  const handleUserSelect = (user) => {
    // Check if the user is already selected
    const isSelected = selectedUsers.some(selectedUser =>
      selectedUser.domain === user.domain && selectedUser.available === user.available
    );

    if (!isSelected) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      alert('User with this domain and availability has already been selected.');
    }
  };

  // Create team
  const handleCreateTeam = async () => {
    try {
        console.log(selectedUsers);
      const response = await axios.post('https://umbackend.onrender.com/api/team', {
        users: selectedUsers
      });
      setTeamId(response.data.teamId);
      alert('Team created successfully!');
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  // Fetch and display team details
  const TeamDetails = ({ teamId }) => {
    const [teamDetails, setTeamDetails] = useState(null);

    useEffect(() => {
      const fetchTeamDetails = async () => {
        try {
          const response = await axios.get(`https://umbackend.onrender.com/api/team/${teamId}`);
          setTeamDetails(response.data);
        } catch (error) {
          console.error('Error fetching team details:', error);
        }
      };

      fetchTeamDetails();
    }, [teamId]);

    if (!teamDetails) return <div>Loading...</div>;

    return (
      <div>
        <h2>Team Details</h2>
        <ul>
          {teamDetails.users.map(user => (
            <li key={user.id}>
              <span>{user.name} - {user.domain} - {user.available ? 'Available' : 'Not Available'}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search by name"
          className="w-full sm:w-2/3 lg:w-1/2 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div>
        <label className="block text-gray-700">Domain</label>
        <select
          name="domain"
          value={domain}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded w-full sm:w-2/3 lg:w-1/2"
        >
          <option value="">All Domains</option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Gender</label>
        <select
          name="gender"
          value={gender}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded w-full sm:w-2/3 lg:w-1/2"
        >
          <option value="">All Genders</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Availability</label>
        <select
          name="available"
          value={available}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded w-full sm:w-2/3 lg:w-1/2"
        >
          <option value="">All Availability</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>

      <div>
        <h2>Select Users for Team</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <span>{user.name} - {user.domain} - {user.available ? 'Available' : 'Not Available'}</span>
              <button onClick={() => handleUserSelect(user)}>Select</button>
            </li>
          ))}
        </ul>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateTeam}
        >
          Create Team
        </button>
        {teamId && <TeamDetails teamId={teamId} />}
      </div>
    </div>
  );
};

export default SearchBar;
