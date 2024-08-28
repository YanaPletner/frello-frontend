import { Link } from "react-router-dom";
import { userService } from "../services/user";
import { BoardPreview } from "./BoardPreview";
import { Popover } from "@mui/material";
import { useState } from "react";
import { CreateBoardModal } from "./CreateBoardModal";
import { useNavigate } from "react-router-dom";

export function BoardList({
  boards,
  onAddBoard,
  onRemoveBoard,
  onUpdateBoard,
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpenByName, setModalOpenByName] = useState(null);

  const navigate = useNavigate();

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");

    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  }

  function shouldShowActionBtns(board) {
    const user = userService.getLoggedinUser();

    if (!user) return false;
    if (user.isAdmin) return true;
    return board.owner?._id === user._id;
  }

  function handleStartBoard(board) {
    console.log(board);
    onAddBoard(board);
    handleClosePopover();
    navigate(`/board/${board._id}`);
  }

  function handleClosePopover() {
    setIsPopoverOpen(false);
    setAnchorEl(null);
    setModalOpenByName(null);
  }

  return (
    <ul className="board-list">
      <header>
        <h2>Demo boards</h2>
      </header>
      {boards &&
        boards.length &&
        boards.map((board) => (
          <li key={board._id}>
            <BoardPreview board={board} />
            <Link to={`/board/${board._id}`}>{board.title}</Link>
            <div className="actions">
              <button onClick={() => onUpdateBoard(board)}>Edit</button>
              <button onClick={() => onRemoveBoard(board._id)}>x</button>
            </div>
          </li>
        ))}
      <button
        aria-describedby="7"
        data-name="add-board"
        className="new-board-btn"
        onClick={handleClick}
      >
        Create new board
      </button>
      {modalOpenByName === "add-board" && (
        <Popover
          id={anchorEl}
          open={isPopoverOpen}
          onClose={handleClosePopover}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          disablePortal
        >
          <CreateBoardModal handleStartBoard={handleStartBoard} />
        </Popover>
      )}
    </ul>
  );
}
