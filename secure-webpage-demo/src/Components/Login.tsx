import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap'

function LoginPage() {
    return(
        <Container>
            <Form>
                <Card.Header as="h1">
                    Login Page
                </Card.Header>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Username" 
                        value=""
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter Password"
                        value=""
                        required 
                    />
                </Form.Group>
            <div className="d-grid gap-2">
                <Button className='btn btn-md btn-success' type="submit">Login</Button>
            </div>
            </Form>
        </Container>
    )
}

export default LoginPage