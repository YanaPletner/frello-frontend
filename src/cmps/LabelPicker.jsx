import { useEffect, useState } from "react";

import { boardService } from "../services/board";
import { updateBoard } from "../store/actions/board.actions";
import SvgIcon from "./SvgIcon";
import { MdEdit } from "react-icons/md";
import { EditLabel } from "./EditLabel";

export function LabelPicker({
  board,
  task,
  handlePopoverClick,
  setTaskSelectedLabels,
  setBoardSelectedLabels,
  boardSelectedLabels,
  setIsPopoverOpen,
  onUpdated,
}) {
  const [localTaskSelectedLabels, setLocalTaskSelectedLabels] = useState(
    Array.isArray(task.labels) ? task.labels : []
  );

  const [editLabel, setEditLabel] = useState("");
  const [addLable, setAddLabel] = useState(boardService.getEmptyLabel());

  const labelsList = Array.isArray(board.labels) ? board.labels : [];

  function handleLabelChange(ev, label) {
    ev.stopPropagation();

    const updatedTaskLabels = localTaskSelectedLabels.some(
      (l) => l.id === label.id
    )
      ? localTaskSelectedLabels.filter((l) => l.id !== label.id)
      : [...localTaskSelectedLabels, label];
    setLocalTaskSelectedLabels(updatedTaskLabels);
    setTaskSelectedLabels(updatedTaskLabels);
  }

  useEffect(() => {
    onUpdated("labels", localTaskSelectedLabels);
  }, [localTaskSelectedLabels]);

  async function onSave(newLabel) {
    const updatedLabels = labelsList.map((label) =>
      label.id === newLabel.id ? newLabel : label
    );
    onUpdatedBoard(updatedLabels);
  }

  function onDelete(deleteLabel) {
    const updatedLabels = labelsList.filter(
      (label) => label.id !== deleteLabel.id
    );
    onUpdatedBoard(updatedLabels);
  }

  function onAdd(newLable) {
    const updateLable = { ...newLable, isEditable: true };
    const updatedLabels = [updateLable, ...labelsList];
    setAddLabel(boardService.getEmptyLabel());

    onUpdatedBoard(updatedLabels);
  }

  function handleClose() {
    setIsPopoverOpen(false);
  }

  async function onUpdatedBoard(updatedLabels) {
    try {
      const updatedBoard = boardService.updateBoard(board, null, null, {
        key: "labels",
        value: updatedLabels,
      });
      await updateBoard(updatedBoard);
      setEditLabel("");
    } catch (error) {
      console.error("Failed to update the board:", error);
    }
    setBoardSelectedLabels(updatedLabels);
    setEditLabel("");
  }

  return (
    <div className="edit-task-modal-content" onClick={handlePopoverClick}>
      {editLabel ? (
        <EditLabel
          label={editLabel}
          onSave={onSave}
          onDelete={onDelete}
          onAdd={onAdd}
          handleClose={handleClose}
          setEditLabel={setEditLabel}
        />
      ) : (
        <>
          <button
            className="close-labels-btn"
            onClick={() => setIsPopoverOpen(false)}
          >
            <SvgIcon iconName="close" />
          </button>

          <h2 className="labels-heading">Labels</h2>

          <p className="labels-title">Labels</p>
          <div className="labels-container">
            <ul>
              {labelsList.map((label, idx) => (
                <li key={idx}>
                  <input
                    data-name={label.color}
                    type="checkbox"
                    onChange={(event) => handleLabelChange(event, label)}
                    checked={localTaskSelectedLabels.some(
                      (l) => l.id === label.id
                    )}
                  />

                  <div
                    className="label-color"
                    style={{
                      backgroundColor: label.color,
                    }}
                  >
                    <p>{label.title}</p>
                  </div>

                  <span className="edit-icon">
                    <MdEdit onClick={() => setEditLabel(label)} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="create-label-btn"
            onClick={() => setEditLabel(addLable)}
          >
            Create a new label
          </button>
        </>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";

// import { boardService } from "../services/board";
// import { useSelector } from "react-redux";
// import { updateBoard } from "../store/actions/board.actions";
// import SvgIcon from "./SvgIcon";
// import { MdEdit } from "react-icons/md";
// import { EditLabel } from "./EditLabel";

// export function LabelPicker({
//   board,
//   task,
//   handlePopoverClick,
//   setTaskSelectedLabels,
//   setBoardSelectedLabels,
//   boardSelectedLabels,
//   setIsPopoverOpen,
//   onUpdated,
//   taskSelectedLabels
// }) {

//   // const board = useSelector((storeState) => storeState.boardModule.board);
//   const [editLabel, setEditLabel] = useState("");
//   const [addLable, setAddLabel] = useState(boardService.getEmptyLabel());

//   const labelsList = Array.isArray(board.labels) ? board.labels : [];
//   const labelsTaskList = Array.isArray(task.labels) ?task.labels : [];

//   function handleLabelChange(ev,label) {

//     ev.stopPropagation()

//     console.log(label)

//     const updatedTaskLabels = labelsTaskList.some((l) => l.id === label.id)
//       ? labelsTaskList.filter((l) => l.id !== label.id)
//       : [...labelsTaskList, label];

//       console.log(updatedTaskLabels)
//       setTaskSelectedLabels(updatedTaskLabels);

//       onUpdated("labels", updatedTaskLabels)

//   }

//   async function onSave(newLabel) {
//     console.log(newLabel);

//     const updatedLabels = labelsList.map((label) =>
//       label.id === newLabel.id ? newLabel : label
//     );

//     onUpdatedBoard(updatedLabels);
//   }

//   function onDelete(deleteLabel) {
//     const updatedLabels = labelsList.filter(
//       (label) => label.id !== deleteLabel.id
//     );

//     onUpdatedBoard(updatedLabels);
//   }

//   function onAdd(newLable) {
//     const updateLable = { ...newLable, isEditable: true };
//     const updatedLabels = [updateLable, ...labelsList];
//     setAddLabel(boardService.getEmptyLabel());

//     onUpdatedBoard(updatedLabels);
//   }

//   function handleClose() {
//     setIsPopoverOpen(false);
//   }

//   async function onUpdatedBoard(updatedLabels) {
//     try {
//       const updatedBoard = boardService.updateBoard(board, null, null, {
//         key: "labels",
//         value: updatedLabels,
//       });

//       await updateBoard(updatedBoard);
//       setEditLabel("");
//     } catch (error) {
//       console.error("Failed to update the board:", error);
//     }
//     setBoardSelectedLabels(updatedLabels);
//     setEditLabel("");
//   }

//   return (
//     <div className="edit-task-modal-content" onClick={handlePopoverClick}>
//       {editLabel ? (
//         <EditLabel
//           label={editLabel}
//           onSave={onSave}
//           onDelete={onDelete}
//           onAdd={onAdd}
//           handleClose={handleClose}
//           setEditLabel={setEditLabel}
//         />
//       ) : (
//         <>
//           <button
//             className="close-labels-btn"
//             onClick={() => setIsPopoverOpen(false)}
//           >
//             <SvgIcon iconName="close" />
//           </button>

//           <h2 className="labels-heading">Labels</h2>

//           <p className="labels-title">Labels</p>
//           <div className="labels-container">
//             <ul>
//               {labelsList.map((label, idx) => (
//                 <li key={idx}>
//                   <input
//                     data-name={label.color}
//                     type="checkbox"
//                     onChange={(event) => handleLabelChange(event,label)}
//                     checked={labelsTaskList.some((l) => l.id === label.id)}
//                   />

//                   <div
//                     className="label-color"
//                     style={{
//                       backgroundColor: label.color,
//                     }}
//                   >
//                     <p>{label.title}</p>
//                   </div>

//                   <span className="edit-icon">
//                     <MdEdit onClick={() => setEditLabel(label)} />
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <button
//             className="create-label-btn"
//             onClick={() => setEditLabel(addLable)}
//           >
//             Create a new label
//           </button>
//         </>
//       )}
//     </div>
//   );
// }