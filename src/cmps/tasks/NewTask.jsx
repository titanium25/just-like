import React, { useState, useEffect } from "react";
import ContentTask from "./ContentTask";
import { SideBar } from "./SideBar";
import { AddFile, AddLabel, DueDate, PeopleAssigned } from "./modals";
import { TaskProvider } from "../../context/TaskContext";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { closeIcon } from "../../assets/images/icons";
import { useHistory } from "react-router-dom";

const NewTask = ({ match }) => {
  const [toggleMode, setToggleMode] = useState({
    label: false,
    pplAssigned: false,
    dueDate: false,
    file: false,
  });
  let history = useHistory();

  useEffect(() => {
    console.log(history);
  }, []);

  const { projectId } = match.params;
  const IsClicked = () => {
    const isClicked = Object.keys(toggleMode).filter((k) => toggleMode[k]);
    switch (isClicked[0]) {
      case "label":
        return (
          <AddLabel toggleMode={toggleMode} setToggleMode={setToggleMode} />
        );
      case "pplAssigned":
        return (
          <PeopleAssigned
            toggleMode={toggleMode}
            setToggleMode={setToggleMode}
          />
        );
      case "dueDate":
        return (
          <DueDate toggleMode={toggleMode} setToggleMode={setToggleMode} />
        );
      case "file":
        return (
          <AddFile toggleMode={toggleMode} setToggleMode={setToggleMode} />
        );
      default:
        break;
    }
    return null;
  };

  return (
    <TaskProvider>
      <div className="main-task flex justify-center">
        <span
          className="btn-close"
          onClick={() => {
            history.goBack();
          }}
        >
          <img src={closeIcon} />
        </span>
        <ContentTask setToggleMode={setToggleMode} projectId={projectId} />
        <SideBar setToggleMode={setToggleMode} />
        <IsClicked />
      </div>
    </TaskProvider>
  );
};

export default NewTask;
