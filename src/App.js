import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import UserList from './Component/UserList';
import TeamDetails from './Component/TeamDetails';
import { store } from './store'; // Import your Redux store

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/team/:id" element={<TeamDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
