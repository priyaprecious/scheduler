import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';


const Form = (props) => {
  const [name, setName] = useState(props.name || '');
  const [error, setError] = useState('');
  const [noInterviewerError, setNoInterviewerError] = useState('');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const validate = () => {
    // check student name is inputted
    if (name) {
      setError('');
    } else {
      setError('Student name cannot be blank');
      return;
    }

    props.onSave(name, interviewer);
  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            type='text'
            placeholder='Enter Student Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid='student-name-input'
          />
          <section className='appointment__validation'>
            {error}
          </section>
          <InterviewerList
            interviewers={props.interviewers}
            value={interviewer}
            onChange={setInterviewer}
          />
          <section className='appointment__validation'>
            {noInterviewerError}
          </section>
        </form>
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;