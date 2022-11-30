// react imports
import { useEffect, useState } from "react";

// firebase function imports
import { userSignOut } from "../../firebase/firebase_functions";

// styled imports
import { StyledSignOut, StyledUserList } from "../../styles/Home.styled";

// component imports
import ListMember from "./ListMember.comp";

// firebase imports
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase_init";

function Left({ offcanvas, currentUser, setChatingWith, setShowOffCanvas }) {
  // sign out button display state
  const [signOutButtonDisplay, setSignOutButtonDisplay] = useState(false);

  // friendslist state
  const [friends, setFriends] = useState(false);

  // current user info from firestore
  useEffect(() => {
    if (currentUser?.uid) {
      let result_arr = [];

      // getting all users data from db
      getDocs(
        query(
          collection(db, "users"),
          where("uid", "!=", currentUser.uid),
          limit(15)
        )
      )
        .then((result) => {
          result.forEach((doc) => {
            result_arr.push(doc.data());
          });

          // setting friends state to result_arr
          setFriends(result_arr);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentUser]);

  return (
    <div
      className={`left text-white align-items-center justify-content-center flex-column h-100 ${
        !offcanvas ? `w-25 d-none me-4 d-lg-flex` : `d-flex`
      }`}
    >
      <div className="my-info w-100 mb-3">
        <div className="d-flex align-items-center justify-content-between p-2 border border-brand rounded-2 bg-brand">
          <img
            width={40}
            height={40}
            src={currentUser?.photoURL}
            alt={currentUser?.displayName}
            className="rounded-circle bg-secondary"
            loading="lazy"
          />
          <div
            className="position-relative"
            onClick={() => setSignOutButtonDisplay(!signOutButtonDisplay)}
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
            <StyledSignOut
              show={signOutButtonDisplay}
              className="position-absolute text-dark text-nowrap py-2 px-3 rounded-2 border-0"
              onClick={async () => {
                const signOutResult = await userSignOut();
                !signOutResult && console.error("Something went wrong!:(");
              }}
            >
              Sign Out
            </StyledSignOut>
          </div>
        </div>
      </div>
      <StyledUserList
        className="w-100 border px-3 border-brand rounded overflow-auto flex-grow-1 h-100"
        variant="flush"
      >
        {friends ? (
          Array.isArray(friends) && friends.length > 0 ? (
            friends?.map((e, index) => {
              return (
                <ListMember
                  key={index}
                  friendInfo={e}
                  setChatingWith={setChatingWith}
                  setShowOffCanvas={setShowOffCanvas}
                />
              );
            })
          ) : (
            <div className="text-muted h-100 d-flex align-items-center justify-content-center fs-5">
              SUCH EMPTY 😢
            </div>
          )
        ) : (
          [1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
            <ListMember
              key={e}
              loading
              setChatingWith={setChatingWith}
              setShowOffCanvas={setShowOffCanvas}
            />
          ))
        )}
      </StyledUserList>
    </div>
  );
}

export default Left;
