import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Button, Form, Card } from 'react-bootstrap';
import { useEffect } from "react";

const URL = process.env.REACT_APP_BACKEND_URL + "/api/login";

const LoginPage = (props) => {
    let navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, setUsername } = props;
    
    useEffect(() => {
        if (isLoggedIn) navigate("profile");
    }, [isLoggedIn, navigate]); // Adding dependency array to avoid infinite loop

    const handleLogin = async (ev) => {
        ev.preventDefault();
        const username = ev.target.username.value;
        const password = ev.target.password.value;
        const formData = { username, password };

        try {  
            const res = await axios.post(URL, formData, { withCredentials: true });
            const data = res.data;
            if (data.success) {
                localStorage.setItem('token', data.token); // Make sure to get token correctly
                localStorage.setItem('userId', data.userId);
                setIsLoggedIn(true);
                setUsername(username);
                navigate("/profile");
            } else {
                toast.error("Invalid username and/or password");
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                // Check for specific status code
                if (err.response.status === 401) {
                    toast.error("Invalid username and/or password");
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            } else {
                // Handle network or other errors
                toast.error("Network error. Please check your connection.");
            }
        }
    };

    return (
        <Container>
            <Card>
                <Card.Header as="h1">Login Page</Card.Header>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label htmlFor='username'>Username</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="username"
                            required
                            maxLength={255}
                            minLength={4}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="password"
                            required
                            maxLength={255}
                            minLength={6}
                        />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button className='btn btn-md btn-success' type="submit">Login</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default LoginPage;
