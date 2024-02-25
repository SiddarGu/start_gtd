import React from "react";
import axios from "axios";

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            error: "",
            expanded: false,
            data: [],
        };
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    componentDidMount() {
        this.setState({ data: this.props.data });
        this.fetchUsers();
    }

    fetchUsers = async () => {
        // Check if the user is an admin
        const isAdmin = localStorage.getItem("isAdmin") === "true";

        if (!isAdmin) {
            this.setState({ isLoading: false });
            return; // Exit if not admin
        }

        try {
            const response = await axios.get("http://localhost:5000/getusers");
            this.setState({ users: response.data, isLoading: false });
        } catch (error) {
            console.error("Failed to fetch users:", error);
            this.setState({ error: "Failed to load users.", isLoading: false });
        }
    };

    render() {
        const { expanded, users, isLoading, error } = this.state;
        const isAdmin = localStorage.getItem("isAdmin") === "true";

        if (!isAdmin) {
            return <div></div>;
        }

        if (isLoading) {
            return <p>Loading users...</p>;
        }

        if (error) {
            return <p>{error}</p>;
        }

        return (
            <div
                style={{
                    border: "1px solid black",
                    margin: "10px",
                    padding: "10px",
                    position: "relative",
                }}
            >
                <div
                    onClick={this.toggleExpand}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                    Users List
                    <span
                        style={{
                            float: "right",
                            transform: expanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s",
                        }}
                    >
                        ▼
                    </span>
                    {expanded && users.length > 0 ? (
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>
                                {user.username} - Admin:{" "}
                                {user.is_admin ? "Yes" : "No"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    expanded && <p>No users found.</p>
                )}
                </div>
            </div>
        );
    }
}

export default UsersList;
