import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../Posts.css"

interface PostItem {
    id: number;
    file: string; 
    description: string;
    uploaded_at: string;
    group: number; 
    user: number; 
}

interface ViewPostProps {
    isLoggedIn: boolean; 
}

const ViewPosts: React.FC<ViewPostProps> = ({ isLoggedIn }) => {
    const [mediaItems, setMediaItems] = useState<PostItem[]>([]);
    const [userGroups, setUserGroups] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserGroups = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/groups', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                    withCredentials: true,
                });
                const userId = Number(localStorage.getItem('userId'));
                const filteredGroups = response.data.filter((group: { members: number[] }) =>
                    group.members.includes(userId) 
                );
                setUserGroups(filteredGroups.map(group => group.id)); 
            } catch (error) {
                console.error('Error fetching user groups:', error);
                toast.error("Failed to fetch groups. Please try again.");
            }
        };

        if (isLoggedIn) {
            fetchUserGroups();
        }
    }, [isLoggedIn, token]);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/upload', {
                    headers: {
                        Authorization: `Token ${token}`, 
                    }
                });
                const allMedia: PostItem[] = response.data;

                const accessibleMedia = allMedia.filter((media) =>
                    userGroups.includes(media.group)
                );

                setMediaItems(accessibleMedia);
            } catch (err) {
                console.error('Error fetching media:', err);
                setError('Error fetching media.');
            } finally {
            }
        };

        if (userGroups.length > 0) {
            fetchMedia(); 
        }
    }, [userGroups, token]);

    if (!isLoggedIn) {
        return <p>You must be logged in to view media.</p>;
    }

    if (error) return <p>{error}</p>;

    return (
        <div className="posts-container">
            <h1>Posts</h1>
            {mediaItems.length === 0 ? (
                <p>No media available for your groups.</p>
            ) : (
                mediaItems.map((media) => (
                    <div key={media.id} className="media-item frame">
                        <h3 className="media-title">{media.description || 'Untitled'}</h3>
                        {media.file.endsWith('.mp4') || media.file.endsWith('.mov') ? (
                            <video controls className="media-content">
                                <source src={media.file} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : media.file.endsWith('.txt') || media.file.endsWith('.bin') || media.file.endsWith('.pdf') ? (
                            <div className="file-icon">
                                <p>{media.file}.</p>
                                <a href={media.file} download className="download-link">Download</a>
                            </div>
                        ) : (
                            <img src={media.file} alt={media.description} className="media-content" />
                        )}
                        <p className="upload-date">Uploaded on: {new Date(media.uploaded_at).toLocaleString()}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ViewPosts;
