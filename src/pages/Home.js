// rBS imports
import Offcanvas from "react-bootstrap/Offcanvas";
import Spinner from "react-bootstrap/Spinner";

// style imports
import { ZIndex } from "../styles/Home.styled";

// react imports
import { lazy, Suspense, useEffect, useState } from "react";

// firebase function imports
import { auth } from "../firebase/firebase_init";
import { onAuthStateChanged } from "firebase/auth";

// react-router imports
import { Navigate } from "react-router-dom";

// component imports
import Left from "../components/Home/Left.comp";
import ChatPartnerInfo from "../components/Home/ChatPartnerInfo.comp";
const ChatBox = lazy(() => import("../components/Home/Chatbox.comp"));
const Waiting = lazy(() => import("../components/Home/Waiting.comp"));

function Home() {
  // chat partner state
  const [chatingWith, setChatingWith] = useState(false);

  // offcanvas state
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCanvasToggle = () => setShowOffCanvas(!showOffCanvas);

  // currentUser state
  const [currentUser, setCurrentUser] = useState(false);

  // firebase auth observer
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return currentUser === null ? (
    <Navigate to={`/`} />
  ) : (
    <>
      <div className="vh-100 d-flex justify-content-center p-3 pb-5 position-relative p-lg-5">
        <Offcanvas
          placement="bottom"
          show={showOffCanvas}
          onHide={() => setShowOffCanvas(false)}
          responsive="lg"
          className="d-lg-none h-100"
        >
          <Offcanvas.Body>
            <Left
              offcanvas
              currentUser={currentUser}
              setChatingWith={setChatingWith}
              setShowOffCanvas={setShowOffCanvas}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <Left
          currentUser={currentUser}
          setChatingWith={setChatingWith}
          setShowOffCanvas={setShowOffCanvas}
        />
        <ZIndex
          className="d-lg-none position-absolute bottom-0 start-50 translate-middle-x bg-white rounded-circle p-2 border border-4 border-brand"
          role="button"
          onClick={handleCanvasToggle}
          ZIndex={9999}
        >
          {!showOffCanvas ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="black"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="black"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          )}
        </ZIndex>
        <main className="text-white flex-grow-1 d-flex flex-column">
          <div
            className={`chat-partner border border-brand p-3 rounded-2 w-100 mb-3 d-flex align-items-center`}
          >
            {chatingWith ? (
              <ChatPartnerInfo
                partner={{
                  photoURL: chatingWith.photoURL,
                  displayName: chatingWith.displayName,
                  email: chatingWith.email,
                }}
              />
            ) : (
              <br />
            )}
          </div>
          <div className="chat-body border border-brand w-100 flex-grow-1 rounded-2 p-3 d-flex flex-column overflow-auto">
            <Suspense
              fallback={
                <div className="vh-100 d-flex align-items-center justify-content-center">
                  <Spinner animation="border" variant="light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              }
            >
              {chatingWith ? (
                <ChatBox
                  partner={{
                    displayName: chatingWith.displayName,
                    uid: chatingWith.uid,
                    email: chatingWith.email,
                  }}
                  myuid={currentUser?.uid}
                />
              ) : (
                <Waiting />
              )}
            </Suspense>
          </div>
        </main>
      </div>
    </>
  );
}
export default Home;
