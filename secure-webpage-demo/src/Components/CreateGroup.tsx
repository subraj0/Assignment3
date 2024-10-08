import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const URL = process.env.REACT_APP_BACKEND_URL + "/api/groups";

const CreateGroup = ({ isLoggedIn }) => {
    const [groupName, setGroupName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token');

    const handleCreateGroup = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            setError("You must be logged in to create a group.");
            return;
        }

        try {
            const response = await axios.post(URL, {
                name: groupName
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                withCredentials: true,
            });

            if (response.data.success) {
                setSuccess("Group created successfully!");
                setGroupName('');
                setError('');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to create group. Please try again.");
        }
    };

    return (
        <div className="create-group">
            <h2>Create a New Group</h2>
            <form onSubmit={handleCreateGroup}>
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    required
                />
                <button type="submit">Create Group</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default CreateGroup;
