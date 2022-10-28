import {Course } from './Course.js';
import React, { useState } from 'react';
import {signInWithGoogle, signOut, useUserState } from '../utilities/firebase';
import Modal from './Modal';
import ActiveModal from './ActiveModal';

const terms = { Fall: 'Fall', Winter: 'Winter', Spring: 'Spring'};


const scheduleChanged = (selected, courses) => (
  selected.some(course => course !== courses[course.term[0] + course.number])
);


const SignInButton = () => (
  <button className="ms-auto btn btn-dark m-1 p-2"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);


const SignOutButton = () => (
  <button className="ms-auto btn btn-dark m-1 p-2"
      onClick={() => signOut()}>
    Sign Out
  </button>
);

const ScheduleButton = ({ openModal }) => (
  <button className="ms-auto btn btn-dark m-1 p-2" onClick={openModal}>Course Plan</button>
);

export const TermButton = ({term, setTerm, checked}) => (
  <>
    <input type="radio" id={term} className="btn-check" checked={checked} autoComplete="off"
      onChange={() => setTerm(term)} />
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
  </>
);

export const TermSelector = ({term, setTerm}) => {
  return (
      <div className="btn-group">
      { 
        Object.values(terms).map(
          value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
        )
      }
    </div>
  );
};

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);

  const [user] = useUserState();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  if (scheduleChanged(selected, courses)) {
    setSelected([])
  };
  
  const termCourses = Object.values(courses).filter(course => term === course.term);

  
  return (
    <>
      <div className="btn-toolbar justify-content-between">
        <TermSelector term={term} setTerm={setTerm} />
        <div className="btn-group">
          <ScheduleButton openModal={openModal} />
          { user ? <SignOutButton /> : <SignInButton /> }
        </div>
      </div>
      <Modal open={open} close={closeModal}>
        <ActiveModal selected={selected} />
      </Modal>
      <div className="course-list">
        { 
          termCourses.map(course =>
            <Course key={ course.term[0] + course.number } course={ course }
              selected={selected} setSelected={ setSelected } 
            />) 
        }
      </div>
    </>
  );
};

export default CourseList;