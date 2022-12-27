// styled components imports
import styled from "styled-components";

// component imports
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import InfiniteScroll from "react-infinite-scroll-component";

const StyledUserList = styled(ListGroup)`
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StyledMessageBox = styled.div`
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgray;
    border-radius: 50px;
  }
  scrollbar-width: 5px;
`;

const StyledTypebox = styled(Form.Control)`
  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:-moz-placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &::-moz-placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const StyleMessage = styled.div`
  max-width: 25em;
  background-color: ${({ variant }) =>
    variant === `in` ? `#8F88FE` : `var(--brand)`};

  border-bottom-${({ variant }) =>
    variant === `in` ? `left` : `right`}-radius: 0px !important;

  @media screen and (max-width: 768px) {
    font-size: 13px;
    padding: 11px 15px !important;
    &:before {
      scale: 0.9;
      ${({ variant }) => (variant === `in` ? `bottom: -8px` : ``)}
    }
  }
`;

const StyledUsername = styled.span`
  max-width: 100px;
`;

const StyledUserImg = styled.img`
  @media screen and (max-width: 1200px) {
    width: 40px;
    height: 40px;
  }
`;

const StyledLastActive = styled.small`
  @media screen and (max-width: 1200px) {
    font-size: 10px;
  }
`;

const ZIndex = styled.div`
  z-index: ${({ ZIndex }) => ZIndex};
`;

const StyledSignOut = styled.button`
  top: 25px;
  right: 20px;
  z-index: 3;
  display: ${({ show }) => (show ? `block` : `none`)};
`;

const StyledSkeleton = styled.div`
  animation: skeleton 2s ease-in-out infinite alternate;

  @keyframes skeleton {
    50% {
      opacity: 0.5;
    }
  }
`;

const StyledInfiniteScroll = styled(InfiniteScroll)`
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: 0;
`;

export {
  StyledUserList,
  StyledMessageBox,
  StyledTypebox,
  StyleMessage,
  StyledUsername,
  StyledUserImg,
  StyledLastActive,
  StyledSignOut,
  StyledSkeleton,
  ZIndex,
  StyledInfiniteScroll,
};
