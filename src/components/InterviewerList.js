import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
//return interviewerlist
    const interviewers = props.interviewers.map(interviewer => {
        return (
            <InterviewerListItem
                key={interviewer.id}
                name={interviewer.name}
                avatar={interviewer.avatar}
                setInterviewer={() => props.onChange(interviewer.id)}
                selected={interviewer.id === props.value}
            />
        );
    });

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {interviewers}
            </ul>
        </section>

    );
}

// interviewers is sent as an array
InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
};