import { Button, Modal, Form } from "react-bootstrap";

export default function FormModal({
  visible,
  closeModal,
  addUser,
  name,
  email,
  password,
  phone,
  avatar,
  setName,
  setEmail,
  setPassword,
  setPhone,
  setAvatar
}) {
  return (
    <Modal show={visible} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Đăng Ký</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="file"
            value={avatar}
            onChange={(event) => setAvatar(event.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Đóng
        </Button>
        <Button
          variant="primary"
          disabled={name === undefined || password === undefined}
          onClick={() => addUser({ name, email, password, phone, avatar })}
        >
          Tạo Tài Khoản
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
