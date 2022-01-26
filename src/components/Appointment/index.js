import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

  
  function save(name, interviewer) {
  
    const interview = {
      student: name,
      interviewer
    };

  
    transition(SAVING);

  
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log(error);
        transition(ERROR_SAVE, true);
      })
  }

  
  function onDelete() {
    transition(CONFIRM);
  }
  
  
  function confirmDelete() {
  
    transition(DELETING, true);

  
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        console.log(error);
        transition(ERROR_DELETE, true);
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => onDelete()}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back()} 
          onSave={save} 
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={() => back()} 
          onConfirm={confirmDelete} 
          message="Are you sure you would like to delete?" 
        />
      )}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back()} 
          onSave={save} 
          student={props.interview.student} 
          interviewer={props.interview.interviewer.id} 
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not save appointment" 
          onClose={() => back()} 
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Could not cancel appointment" 
          onClose={() => back()} 
        />
      )}
    </article>
  );
} 