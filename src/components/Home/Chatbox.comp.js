// react imports
import { useEffect, useRef, useState } from "react";

// rBs imports
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";

// styled imports
import {
  StyledInfiniteScroll,
  StyledMessageBox,
  StyledTypebox,
  StyleMessage,
} from "../../styles/Home.styled";

// firebase imports
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  addDoc,
  where,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebase_init";

// custom function imports
import sortAlphabets from "../../utils/sortAlphabetically";

function ChatBox({ partner: { uid: partnerUID, displayName, email }, myuid }) {
  // mediaBtn ref
  const mediaBtn = useRef();

  // messages content state
  const [messagesContent, setMessagesContent] = useState(null);

  // hasMore state (InfinteScroll)
  const [hasMore, setHasMore] = useState(true);

  // handling form submit (send message)
  const inputBox = useRef();
  async function handleForm(e) {
    e.preventDefault();
    const inputValue = inputBox?.current?.value.toString().trim();
    e.target.reset();
    if (inputValue.length) {
      try {
        // Add a new document in collection "chats"
        await addDoc(collection(db, "chats"), {
          content: inputValue,
          sender: myuid,
          receiver: partnerUID,
          participants: sortAlphabets(`${myuid}_${partnerUID}`),
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  // last doc state
  const [lastDoc, setLastDoc] = useState(null);

  // fetching messages first time
  useEffect(() => {
    const chatsRef = collection(db, "chats");

    const participants = sortAlphabets(`${myuid}_${partnerUID}`);
    setMessagesContent(null);

    // Create a query against the collection.
    const queryResult = query(
      chatsRef,
      where("participants", "==", participants),
      orderBy("timestamp", "desc"),
      limit(20)
    );

    // snapshot of "chats" doc
    onSnapshot(queryResult, (result) => {
      let result_arr = [];

      setLastDoc(result.docs[result.size - 1]);

      result.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result_arr.push(doc.data());
      });

      setHasMore(true);

      setMessagesContent(result_arr);
    });
  }, [myuid, partnerUID]);

  // fetching more messages
  async function fetchMoreData() {
    const chatsRef = collection(db, "chats");

    const participants = sortAlphabets(`${myuid}_${partnerUID}`);

    // Create a query against the collection.
    const queryResult = query(
      chatsRef,
      where("participants", "==", participants),
      orderBy("timestamp", "desc"),
      startAfter(lastDoc),
      limit(20)
    );

    const querySnapshot = await getDocs(queryResult);

    if (!querySnapshot.size) {
      setHasMore(false);
      return;
    }

    let result_arr = [];
    querySnapshot.forEach((doc) => {
      result_arr.push(doc.data());
    });

    setLastDoc(querySnapshot.docs[querySnapshot.size - 1]);

    setMessagesContent((prev) => [...prev, ...result_arr]);
  }

  // handling go down event
  const [goDownShow, setGoDownShow] = useState(false);
  const scrollableDiv = useRef();

  function goDown() {
    const { current } = scrollableDiv;
    if (current) {
      current.scrollTop = 0;
    }
  }

  if (scrollableDiv.current) {
    scrollableDiv.current.onscroll = () => {
      scrollableDiv.current.scrollTop < -80
        ? setGoDownShow(true)
        : setGoDownShow(false);
    };
  }

  function MessageComp({ variant, content, timestamp }) {
    const date = new Date(timestamp?.toMillis())?.toDateString();
    const time = new Date(timestamp?.toMillis())
      ?.toTimeString()
      ?.split(" GMT")[0];

    return (
      <div className={`mb-4${variant === `in` ? `` : ` text-end`}`}>
        <StyleMessage
          variant={variant}
          className={`d-inline-block text-start px-4 py-3 rounded-pill position-relative ${
            variant === `in` ? `ms-3 ms-md-4` : `me-3 me-md-4`
          }`}
          title={`${date}, ${time}`}
        >
          {content}
        </StyleMessage>
      </div>
    );
  }

  return (
    <>
      <StyledMessageBox
        className="h-100 overflow-auto d-flex flex-column-reverse flex-grow-1"
        id="scrollableDiv"
        ref={scrollableDiv}
      >
        {messagesContent === null ? (
          <div className="h-100 d-flex align-items-center justify-content-center">
            <Spinner variant="light" animation="border" />
          </div>
        ) : messagesContent.length ? (
          <>
            <StyledInfiniteScroll
              dataLength={messagesContent.length}
              next={fetchMoreData}
              inverse={true}
              className="d-flex flex-column-reverse"
              hasMore={hasMore}
              loader={
                <div className="text-center my-2">
                  <Spinner variant="secondary" animation="border" />
                </div>
              }
              scrollableTarget="scrollableDiv"
            >
              {messagesContent.map(({ content, sender, timestamp }, index) => (
                <MessageComp
                  key={index}
                  variant={sender === myuid ? "out" : "in"}
                  content={content}
                  timestamp={timestamp}
                />
              ))}
            </StyledInfiniteScroll>
          </>
        ) : (
          <div className="h-100 text-muted d-flex flex-column align-items-center justify-content-center">
            Say hi to {displayName}🙋‍♂️
            <br />
            <i>( {email || "Unknown Email😵"} )</i>
          </div>
        )}
      </StyledMessageBox>
      <Form onSubmit={(e) => handleForm(e)} className="position-relative">
        <div
          className={`position-absolute`}
          role="button"
          onClick={goDown}
          style={{
            transform: `translateY(${goDownShow ? `-50px` : 0})`,
            transition: `300ms`,
            right: 10,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-arrow-down-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
            />
          </svg>
        </div>
        <InputGroup className="text-white bg-brand rounded-2 p-2">
          <Form.Control hidden type="file" ref={mediaBtn} />
          <Button
            className="bg-transparent border-0 text-brand fw-semibold"
            id="typebox-media"
            onClick={() => mediaBtn?.current?.click()}
          >
            <svg
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5.05371C0 3.72763 0.526784 2.45586 1.46447 1.51818C2.40215 0.580495 3.67392 0.0537109 5 0.0537109H13C14.3261 0.0537109 15.5979 0.580495 16.5355 1.51818C17.4732 2.45586 18 3.72763 18 5.05371V6.05371H16V5.05371C16 4.25806 15.6839 3.495 15.1213 2.93239C14.5587 2.36978 13.7956 2.05371 13 2.05371H5C4.20435 2.05371 3.44129 2.36978 2.87868 2.93239C2.31607 3.495 2 4.25806 2 5.05371V13.0537C2 13.8494 2.31607 14.6124 2.87868 15.175C3.44129 15.7376 4.20435 16.0537 5 16.0537H16.17C16.4059 15.3865 16.8701 14.8242 17.4805 14.4661C18.0909 14.108 18.8082 13.9772 19.5057 14.0969C20.2032 14.2166 20.836 14.579 21.2921 15.1201C21.7482 15.6611 21.9984 16.346 21.9984 17.0537C21.9984 17.7614 21.7482 18.4463 21.2921 18.9874C20.836 19.5284 20.2032 19.8908 19.5057 20.0105C18.8082 20.1302 18.0909 19.9994 17.4805 19.6413C16.8701 19.2833 16.4059 18.7209 16.17 18.0537H5C3.67392 18.0537 2.40215 17.5269 1.46447 16.5892C0.526784 15.6516 0 14.3798 0 13.0537V5.05371ZM10 20.0537V21.0537C10 22.3798 10.5268 23.6516 11.4645 24.5892C12.4021 25.5269 13.6739 26.0537 15 26.0537H23C24.3261 26.0537 25.5979 25.5269 26.5355 24.5892C27.4732 23.6516 28 22.3798 28 21.0537V13.0537C28 11.7276 27.4732 10.4559 26.5355 9.51818C25.5979 8.58049 24.3261 8.05371 23 8.05371H11.83C11.5941 7.3865 11.1299 6.82416 10.5195 6.46608C9.90911 6.108 9.19176 5.97724 8.49427 6.09692C7.79677 6.21659 7.16404 6.57898 6.7079 7.12005C6.25175 7.66112 6.00157 8.34602 6.00157 9.05371C6.00157 9.7614 6.25175 10.4463 6.7079 10.9874C7.16404 11.5284 7.79677 11.8908 8.49427 12.0105C9.19176 12.1302 9.90911 11.9994 10.5195 11.6413C11.1299 11.2833 11.5941 10.7209 11.83 10.0537H23C23.7956 10.0537 24.5587 10.3698 25.1213 10.9324C25.6839 11.495 26 12.2581 26 13.0537V21.0537C26 21.8494 25.6839 22.6124 25.1213 23.175C24.5587 23.7376 23.7956 24.0537 23 24.0537H15C14.2044 24.0537 13.4413 23.7376 12.8787 23.175C12.3161 22.6124 12 21.8494 12 21.0537V20.0537H10Z"
                fill="white"
              />
            </svg>
          </Button>
          <StyledTypebox
            ref={inputBox}
            required
            placeholder="Type here..."
            aria-label="Type your message here"
            aria-describedby="Type your message here"
            type="text"
            className="bg-transparent shadow-none text-white border-0"
          />
          <Button
            className="bg-white text-brand border-brand fw-semibold rounded-1 px-4"
            id="typebox-send"
            type="submit"
          >
            Send
          </Button>
        </InputGroup>
      </Form>
    </>
  );
}

export default ChatBox;
