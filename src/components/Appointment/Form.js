import React, { useState, useEffect } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  // to track states
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const [interviewerError, setInterviewerError] = useState("");

  // function to reset states
  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setError("");
    setInterviewerError("");
  };

  // function to bring back to previous
  const cancel = () => {
    reset();
    props.onCancel();
  }
  
  
  const validate = () => {
    
    // if student name is not entered and interviewer is not selected then the form will not get submitted
    if (student === "" && interviewer === null) {
      setError("Student name cannot be blank");
      setInterviewerError("An interviewer must be selected");
      return;
    }
    
    // if student name is not entered then the form will not get submitted
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    // if interviewer is not selected then the form will not get selected
    if (interviewer === null) {
      setInterviewerError("An interviewer must be selected");
      return;
    }

    
    setError("");
    setInterviewerError("");
    props.onSave(student, interviewer)
  };

  // if interviewer is selected then remove the error message
  useEffect(() => {
    setInterviewerError("");
  }, [interviewer]);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter student name here"
            value={student}
            onChange={(event) => {
              setStudent(event.target.value);
              setError("");
            }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <section className="appointment__validation">{interviewerError}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>

  );
}