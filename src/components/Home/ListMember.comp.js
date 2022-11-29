// rBs imports
import { ListGroup } from "react-bootstrap";

// styled imports
import {
  StyledLastActive,
  StyledSkeleton,
  StyledUserImg,
  StyledUsername,
} from "../../styles/Home.styled";

// fallback image import
import fallbackImg from "../../assets/user img/fallback.png";

function ListMember({ friendInfo, loading, setChatingWith, setShowOffCanvas }) {
  return (
    <ListGroup.Item className="bg-transparent text-white border-brand px-0">
      <div
        className="rounded-2 d-flex align-items-center shadow p-2"
        role="button"
        onClick={() => {
          setShowOffCanvas(false);
          !loading && setChatingWith(friendInfo);
        }}
      >
        {loading ? (
          <>
            <StyledSkeleton
              className="bg-secondary bg-opacity-50 rounded-circle"
              style={{ width: 50, height: 50 }}
            ></StyledSkeleton>
            <StyledSkeleton className="ms-3 flex-grow-1 bg-secondary bg-opacity-50 py-3 rounded-1"></StyledSkeleton>
          </>
        ) : (
          <>
            <StyledUserImg
              src={friendInfo?.photoURL}
              alt={`${friendInfo?.displayName}`}
              width={50}
              height={50}
              className="mb-0 rounded-circle bg-secondary bg-opacity-50 object-fit-contain"
              loading="lazy"
              onError={({ target }) => {
                target.src = { fallbackImg };
              }}
            />
            <div className="d-flex align-items-center justify-content-between flex-grow-1 ms-3">
              <StyledUsername
                className="fw-semibold text-nowrap text-truncate"
                title={friendInfo?.displayName}
              >
                {friendInfo?.displayName}
              </StyledUsername>
              <StyledLastActive className="text-muted text-end">
                Today, 14:12AM
              </StyledLastActive>
            </div>
          </>
        )}
      </div>
    </ListGroup.Item>
  );
}

export default ListMember;
