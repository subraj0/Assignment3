import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Button, Form, Card } from 'react-bootstrap';
import { useEffect } from "react";
import Cookies from 'js-cookie';

const URL = process.env.REACT_APP_BACKEND_URL + "/api/register";

const Register = (props) => {
    const { isLoggedIn, setIsLoggedIn, setUsername } = props;
    let navigate = useNavigate();
    const csrfToken = Cookies.get('csrftoken');

    useEffect(() => {
        if (isLoggedIn) navigate("/profile");
    }, [isLoggedIn, navigate]);

    const handleRegister = async (ev) => {
        ev.preventDefault();
        const username = ev.target.username.value;
        const password = ev.target.password.value;

        const formData = {
            username: username,
            password: password,
        };

        try {
            const res = await axios.post(URL, formData, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            });

            const data = res.data;
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                setIsLoggedIn(true);
                setUsername(username);
                navigate("/profile");
                toast.success("Registration successful!");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error("Error during registration", err);
            if (axios.isAxiosError(err) && err.response) {
                toast.error("Username already exists. Please try again.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <Container>
            <Form onSubmit={handleRegister}>
                <Card.Header as="h1">
                    Registration Page
                </Card.Header>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label htmlFor='username'>Create Username</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="username"
                        required
                        maxLength={255}
                        minLength={4}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Create Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="password"
                        required
                        maxLength={255}
                        minLength={6}
                    />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button className='btn btn-md btn-success' type="submit">Register Account</Button>
                </div>
            </Form>
        </Container>
    );
};

export default Register;
