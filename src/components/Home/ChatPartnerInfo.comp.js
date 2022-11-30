function ChatPartnerInfo({ partner: { photoURL, displayName, email } }) {
  return (
    <>
      <img
        src={photoURL}
        alt={displayName}
        width={25}
        height={25}
        className="rounded-circle bg-secondary bg-opacity-50 object-fit-contain"
      />
      <div className="partner-info flex-grow-1 d-flex align-items-center justify-content-between ms-3">
        <p className="m-0 fw-semibold" title={email || "Unknown Email"}>
          {displayName}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
          role="button"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </div>
    </>
  );
}
export default ChatPartnerInfo;
