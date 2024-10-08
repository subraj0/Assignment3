import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface Group {
    id: number; // or string depending on your API
    name: string;
}

const URL = process.env.REACT_APP_BACKEND_URL + "/api/groups"; // API endpoint for groups

const JoinGroup = ({ isLoggedIn }) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [error, setError] = useState(''); // State to hold error messages
    const [success, setSuccess] = useState(''); // State to hold success messages
    const token = localStorage.getItem('token'); // Get token from local storage

    // Fetch groups on component mount or when isLoggedIn changes
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(URL, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,  // Use token for authentication
                    },
                    withCredentials: true,
                });
                setGroups(response.data); // Set groups in state
            } catch (err) {
                console.error(err);
                setError("Failed to fetch groups. Please try again."); // Set error message
            }
        };

        if (isLoggedIn) {
            fetchGroups(); // Fetch groups if the user is logged in
        }
    }, [isLoggedIn, token]);

    // Handle joining a group
    const handleJoinGroup = async (groupId) => {
        try {
            const response = await axios.post(`${URL}/${groupId}/join/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,  // Use token for authentication
                },
                withCredentials: true,
            });

            if (response.data.success) {
                setSuccess("Joined group successfully!"); // Set success message
                setError(''); // Clear error message
            } else {
                setError(response.data.message); // Set error message if failed
            }
        } catch (err) {
            console.error(err);
            setError("Failed to join group. Please try again."); // Set error message
        }
    };

    return (
        <div className="join-group">
            <h2>Available Groups</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Group Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map(group => (
                        <tr key={group.id}>
                            <td>{group.name}</td>
                            <td>
                                <button onClick={() => handleJoinGroup(group.id)}>Join</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JoinGroup;
