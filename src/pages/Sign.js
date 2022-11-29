// illus imports
import login_illus from "../assets/login.illus.png";

// rBS imports
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

// react imports
import { useEffect, useState } from "react";

// firebase function imports
import { auth } from "../firebase/firebase_init";
import { providerSignIn } from "../firebase/firebase_functions";
import { onAuthStateChanged } from "firebase/auth";

// react router imports
import { Navigate } from "react-router-dom";

// custom comp imports
import WarningToast from "../components/WarningToast";

// styled skeleton import
import { StyledSkeleton } from "../styles/Home.styled";

function Sign() {
  // sign-in state
  const [signedIn, setSignedIn] = useState(null);

  // firebase auth observer
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  }, []);

  // third party sign in comp
  function ThirdPartySignIn() {
    // warning state
    const [error, setError] = useState(false);

    // signing in state
    const [signingInState, setSigningInState] = useState({
      google: false,
      facebook: false,
      twitter: false,
    });
    const handleSigningInState = (prop, value) => {
      setSigningInState({ ...signingInState, [prop]: value });
    };

    return (
      <>
        <div className="smart-auth">
          {signedIn === null ? (
            <>
              <StyledSkeleton className="py-4 pb-5 bg-secondary bg-opacity-50 rounded-2 w-100 mb-4"></StyledSkeleton>
              <StyledSkeleton className="py-4 pb-5 bg-secondary bg-opacity-50 rounded-2 w-100 mb-4"></StyledSkeleton>
              <StyledSkeleton className="py-4 pb-5 bg-secondary bg-opacity-50 rounded-2 w-100"></StyledSkeleton>
            </>
          ) : (
            <>
              <Button
                className="w-100 border-brand bg-transparent fs-5 d-flex align-items-center justify-content-center mb-4 px-0 py-3"
                onClick={async () => {
                  const { result, errorCode } = await providerSignIn(
                    "google",
                    handleSigningInState
                  );
                  if (!result) {
                    setError(errorCode);
                  }
                }}
                disabled={signingInState.google}
              >
                {signingInState.google ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-google me-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                    </svg>
                    Sign Up with Google
                  </>
                )}
              </Button>
              <Button
                className="w-100 border-brand bg-transparent fs-5 d-flex align-items-center justify-content-center mb-4 px-0 py-3"
                onClick={async () => {
                  const { result, errorCode } = await providerSignIn(
                    "facebook",
                    handleSigningInState
                  );
                  if (!result) {
                    setError(errorCode);
                  }
                }}
                disabled={signingInState.facebook}
              >
                {signingInState.facebook ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-facebook me-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                    Sign Up with Facebook
                  </>
                )}
              </Button>
              <Button
                className="w-100 border-brand bg-transparent fs-5 d-flex align-items-center justify-content-center mb-4 px-0 py-3"
                onClick={async () => {
                  const { result, errorCode } = await providerSignIn(
                    "twitter",
                    handleSigningInState
                  );
                  if (!result) {
                    setError(errorCode);
                  }
                }}
                disabled={signingInState.twitter}
              >
                {signingInState.twitter ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-twitter me-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                    Sign Up with Twitter
                  </>
                )}
              </Button>
            </>
          )}
        </div>
        <WarningToast
          show={!!error}
          closeFunction={() => setError(false)}
          error={error}
        />
      </>
    );
  }

  return signedIn ? (
    <Navigate to={`/Home`} />
  ) : (
    <>
      <Container>
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <Row className="justify-content-between h-100">
            <Col lg className="d-flex align-items-center">
              <img
                className="w-100"
                src={login_illus}
                alt="Login Page Illustrator"
              />
            </Col>
            <Col lg className="d-flex align-items-center">
              <div className="w-100">
                <ThirdPartySignIn />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Sign;
