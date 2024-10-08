import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface Group {
    id: number;  // Adjust the type based on your API response
    name: string;
}

const MediaUpload = ({ isLoggedIn }) => {
    const [userGroups, setUserGroups] = useState<Group[]>([]);
    const [groupId, setGroupId] = useState('');
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token');

    const csrfToken = Cookies.get('csrftoken');

    useEffect(() => {
        const fetchUserGroups = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/groups', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,  // Include CSRF token here
                        'Authorization': `Token ${token}`
                    },
                    withCredentials: true,
                });
                const userId = localStorage.getItem('userId');
                const userIdAsNumber = userId ? parseInt(userId, 10) : null;
                const filteredGroups = response.data.filter(group => 
                    userIdAsNumber !== null && group.members.includes(userIdAsNumber) // Ensure userIdAsNumber is valid
                );
                console.log(userId);
                console.log(filteredGroups);
                setUserGroups(filteredGroups);
            } catch (error) {
                console.error('Error fetching user groups:', error);
                toast.error("Failed to fetch groups. Please try again.");
            }
        };

        if (isLoggedIn) {
            fetchUserGroups();
        }
    }, [isLoggedIn, csrfToken, token]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMediaFile(e.target.files ? e.target.files[0] : null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!groupId || !mediaFile) {
            setError("Please select a group and upload a media file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', mediaFile);
        formData.append('group', groupId);
        formData.append('description', description);

        try {
            const response = await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                    'Authorization': `Token ${token}`
                },
                withCredentials: true,
            });

            if (response.data.success) {
                setSuccess("Media uploaded successfully!");
                setMediaFile(null);
                setGroupId('');
                setDescription('');
                setError('');
                toast.success("Media uploaded successfully!");
            } else {
                setError("Failed to upload media.");
                toast.error("Failed to upload media.");
            }
        } catch (err) {
            // Check for specific error cases
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || "Failed to upload media. Please try again.");
                toast.error(err.response.data.message || "Failed to upload media.");
            } else {
                setError("An unexpected error occurred. Please try again.");
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="media-upload">
            <h2>Upload Media</h2>
            <form onSubmit={handleSubmit}>
                <select value={groupId} onChange={(e) => setGroupId(e.target.value)} required>
                    <option value="">Select Group</option>
                    {userGroups.map((group) => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>
                <div className="vertical-stack">
                    <input type="file" onChange={handleFileChange} required />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a description"
                        rows={4}
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default MediaUpload;
