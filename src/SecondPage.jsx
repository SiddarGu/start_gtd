import React, { useState } from 'react';
import axios from 'axios';

const SecondPage = () => {
  const [response, setResponse] = useState('');

  const handlePost = () => {
    // Data to be sent to the backend
    const dataToSend = { newData: 'Data sent from React' };
    axios.post('http://localhost:5000/postdata', dataToSend)
      .then(response => {
        setResponse(JSON.stringify(response.data));
      })
      .catch(error => console.error("There was an error posting the data:", error));
  };

  return (
    <div>
      Second Page Content
      <div>
        <button onClick={handlePost}>Send Data to Flask</button>
        <p>Response: {response}</p>
      </div>
    </div>
  );
};

export default SecondPage;
