import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/userSlice';
import UserCard from './UserCard';
import SearchBar from './SearchBar';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, pagination, loading, error } = useSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    domain: '',
    gender: '',
    available: false,
  });

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, query: searchQuery, filters }));
  }, [dispatch, searchQuery, filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(fetchUsers({ page: pagination.currentPage - 1, query: searchQuery, filters }))}
          disabled={pagination.currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => dispatch(fetchUsers({ page: pagination.currentPage + 1, query: searchQuery, filters }))}
          disabled={pagination.currentPage === pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
