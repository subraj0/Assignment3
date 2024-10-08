import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import '../Profile.css';

const Profile = (props) => {
    const { isLoggedIn, userName } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn === false) navigate("/");
    }, [isLoggedIn, navigate]);

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="button-container">
                    <div className="button-group left">
                        <Link to="/media" className="button">
                            Create Post
                        </Link>
                        <Link to="/view-posts" className="button">
                            View Posts
                        </Link>
                    </div>
                    <div className="button-group right">
                        <Link to="/groups" className="button">
                            Create Groups
                        </Link>
                        <Link to="/join-groups" className="button">
                            Join Groups
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;