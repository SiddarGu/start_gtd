import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:5000/getdata')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => console.error("There was an error fetching the data:", error));
  }, []);

  return <div>Main Page Content: {message}</div>;
};

export default MainPage;
