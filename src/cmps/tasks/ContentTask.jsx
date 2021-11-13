import React, { useContext, useState } from "react";
import { description_mission, chat_logo, attachment_icon, plus_sign } from "../../assets/images/icons";
import { AssignedTask, AttachmentsTask, HeadlinesTask, Labels, TextArea, ChatsTask } from "./UtilsTask";
import { modes, ModeChoosen, PriorityChoosen } from "./UtilsTask";
import { TaskContext } from "../../Context/TaskContext";



export const ContentTask = ({ setToggleMode }) => {
  const { taskContent: { title, priority, taskMode, label, pplAssigned, date, description, chats },
    saveTask, setTaskContent } = useContext(TaskContext);
  const [isClicked, setIsClicked] = useState({ priority: false, taskMode: false, title: false })

  const handleChangeTaskMode = (e) => {
    const nameClicked = e.target.getAttribute('name')
    const value = e.target.getAttribute('value');
    setTaskContent(prev => ({ ...prev, [nameClicked]: value }))
    setIsClicked(prev => ({ ...prev, [nameClicked]: !prev[nameClicked] }))
  }

  return (
    <div className="new-task flex column">
      <div className="new-task-container">
        <div className="new-task-title flex align-center">
          <div className='title'>
            {!isClicked.title
              ? <h2 onClick={() => setIsClicked(p => ({ ...p, title: !p.title }))}>
                {title || "משימה חדשה"}
              </h2>
              : <input
                type="text"
                autoFocus
                value={title}
                onChange={(e) => setTaskContent(p => ({ ...p, title: e.target.value }))}
                onKeyPress={e => e.key === 'Enter' && setIsClicked(p => ({ ...p, title: !p.title }))}
              />
            }

          </div>
          <div className="task-mode flex column" >
            {!isClicked.taskMode
              ? <span
                onClick={() => setIsClicked(p => ({ ...p, taskMode: !p.taskMode }))}
                id={`task-mode${modes.indexOf(taskMode) + 1}`}
              >
                {taskMode}
              </span>
              : <ModeChoosen handleChangeTaskMode={handleChangeTaskMode} />
            }
          </div>
          <div className="priority-task flex column">
            {!isClicked.priority
              ? <span
                onClick={() => setIsClicked(p => ({ ...p, priority: !p.priority }))}
                id="priority-task"
              >
                {priority}
              </span>
              : <PriorityChoosen handleChangeTaskMode={handleChangeTaskMode} />
            }
          </div>
        </div>

        <div className="due-date-task flex align-center">
          <input type="checkbox" />
          <h4 className="flex column">
            <span>תאריך התחלה:</span> {date.startDate}
          </h4>
          <h4 className="flex column">
            <span>שעה: </span>
            {date.time}
          </h4>
          <h4 className="flex column">
            <span>תאריך סוף: </span>
            {date.endDate}
          </h4>
          <h4 className="flex column">
            <span>תזכורת: </span>
            {date.reminder}
          </h4>
        </div>

        <div className="labels-assigned flex">
          <div className="assigned-task">
            <HeadlinesTask title="מוקצים למשימה" />
            <AssignedTask areAssigned={pplAssigned}>
              <span
                onClick={() =>
                  setToggleMode((p) => ({ ...p, pplAssigned: !p.pplAssigned }))
                }
              >
                <img src={plus_sign} alt="circle plus" />
              </span>
            </AssignedTask>
          </div>

          <div className="labels">
            <HeadlinesTask title="תווית" />
            <Labels colorLabel={label} />
          </div>
        </div>

        <div className="description-task">
          <HeadlinesTask title="תיאור משימה" icon={description_mission} />
          <TextArea
            id="description-area"
            name="description"
            rows="5"
            cols="40"
            defaultVal={description}
          />
        </div>

        <div className="attachment-task">
          <HeadlinesTask title="קבצים" icon={attachment_icon} />
          <AttachmentsTask
            files={[{ name: "קובץ 1" }, { name: "קובץ 2" }, { name: "קובץ 3" }]}
          />
        </div>

        <div className="chat-task">
          <HeadlinesTask title="פעילות" icon={chat_logo} />
          <div className="chat-users flex column">
            {/* <object data={shimon} type="image/svg+xml" /> */}
            <TextArea
              id="chat-area"
              name="chats"
              rows="1"
              cols="30"
              placeHolder="רשום תגובה...."
            />
            <ChatsTask chats={chats} />
          </div>
        </div>
      </div >

      <div className="submit-task">
        <span onClick={saveTask}>שמור וסגור</span>
      </div>
    </div >
  );
};
