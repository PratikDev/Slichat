import Toast from "react-bootstrap/Toast";

export default function WarningToast({ show, closeFunction, error }) {
  return (
    <Toast
      show={show}
      onClose={closeFunction}
      bg="danger"
      className="position-absolute bottom-0 start-50 translate-middle-x mb-3 bg-opacity-25 border border-danger"
      delay={5000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">Ahh Shit !!</strong>
      </Toast.Header>
      <Toast.Body className="text-light fw-bold">Error : {error}</Toast.Body>
    </Toast>
  );
}
