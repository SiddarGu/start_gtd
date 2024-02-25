import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLogin = async (event) => {
    event.preventDefault();
    this.setState({ error: '' }); // Reset error message

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: this.state.username,
        password: this.state.password,
      });

      if (response.status === 200) {
        // Assuming the login is successful
        this.props.onLoginSuccess(); // Call the onLoginSuccess prop passed from Main
      } else {
        // Handle unsuccessful login attempt
        this.setState({ error: "Login failed. Please try again." });
      }
    } catch (error) {
      // Handle errors (e.g., network error, server error)
      this.setState({ error: "An error occurred. Please try again later." });
    }
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
      </div>
    );
  }
}

export default Login;
