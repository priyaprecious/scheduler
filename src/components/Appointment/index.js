import React from 'react'
import './styles.scss';

export default function Appointment({ time }) {
    return (
        <article className="appointment">
          {time ? `Appointment at ${time}` : 'No Appointments'}
        </article>
      );
}