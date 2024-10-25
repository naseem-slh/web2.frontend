import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { storeJWT, getLoginInfoFromJWT, removeJWT } from '../../JWTManager';
import { useLoginContext } from '../../LoginContext';
import { login } from '../../backend/shopperapi';

type Props = {
  handleClose: () => void;
  show: boolean;
};

export default function LoginDialog({ show, handleClose }: Props) {

  const { loginInfo, setLoginInfo } = useLoginContext();

  const [email, setEMail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")


  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jwt = await login(email, password)
      console.log("Login: " + jwt)
      if (jwt) {
        // store JWT in local storage
        storeJWT(jwt);
        // sync react state
        const loginInfo = getLoginInfoFromJWT(jwt);
        setLoginInfo(loginInfo)
        setMsg("")
        handleClose()
      } else {
        setMsg("Login failed")
      }
    } catch (err) {
      setMsg(String(err))
    } finally {
      setPassword("");
    }
  }

  //12abcAB!

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="ControlInput1">
            <Form.Label>E-Mail</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" autoFocus value={email} onChange={e => setEMail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Passwort</Form.Label>
            <Form.Control type="password" placeholder="Passwort" autoFocus value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Form onSubmit={doLogin}>
        <Modal.Footer>
          {!loginInfo &&
            <div className="text-center w-100">
              <small className="text-danger">{msg}</small>
            </div>
          }
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {loginInfo ? (
            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
          ) : (
            <Button type="submit" variant="primary">
              OK
            </Button>
          )}
        </Modal.Footer>

      </Form>
    </Modal>
  );
}
