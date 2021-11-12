import React, { useEffect, useState } from "react";
import "./project_page.css";
import projectsDAL from "../../adapters/TMS/projectsDAL";
import { loadProjects } from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { width } from "@mui/system";
import TaskList from "./TaskList";
import edit from "../../assets/images/icons/edit_pen.png";
import erase from "../../assets/images/icons/erase.png";
import {
  TextField,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ProjectPreview } from "./ProjectPreview";

const ProjectsList = () => {
  const descriptionRef = React.createRef();
  const projectNameRef = React.createRef();
  const endDateRef = React.createRef();
  const startDateRef = React.createRef();
  const deleteProject = async (id) => await projectsDAL.deleteProject(id);
  const [project, setProject] = useState({});
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.entities.projects);
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [projectStatus, setProjectStatus] = useState("");
  const statusOptions = [
    "On Track",
    "On Hold",
    "Done",
    "Ready",
    "Off Track",
    "Blocked",
  ];

  // const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProjects());
    console.log(projects.list);
  }, []);

  const handleChangeStart = (newValue) => {
    setStartDate(newValue);
  };

  const handleChangeEnd = (newValue) => {
    setEndDate(newValue);
  };

  const handleStatus = (event) => {
    setProjectStatus(event.target.value);
  };
  // const handleClose = async () => {
  //     setOpen(false);
  // };

  const tasksProject = () => {
    debugger;
    // <TaskList></TaskList>
  };
  const editproject = () => {
    // const project = {
    //     projectName: "first_project",
    //     description: "zsxdcfvg",
    //     startDate: "10/12/2013",
    //     endDate: "10/15/2013",

    // }
    setProject(project);
    setOpen(true);
  };
  const editProject = async (id) => await projectsDAL.editProject(id);

  const handleEdit = (project) => {
    debugger;
    const newProject = {
      // id: project.id,
      projectName: projectName,
      description: description,
      startDate: startDate,
      endDate: endDate,
      // task: project.task
    };
    editProject(newProject);
    // handleClose();
  };
  if (!projects) return <div>Loading...</div>;
  return (
    <React.Fragment>
      <div className="projects-table grid">
        <div className="projects-title grid">
          <p>שם הפרויקט</p>
          <p>סטטוס</p>
          <p>תאריך התחלה וסיום</p>
          <p>השלמת המשימה</p>
          <p>משימות שהושלמו</p>
        </div>

        {projects.list.map((project, idx) => (
          <ProjectPreview
            project={project}
            editproject={editproject}
            key={idx}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProjectsList;
