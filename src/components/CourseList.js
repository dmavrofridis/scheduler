import {getCourseTerm, getCourseSelectedState} from './Course.js';
import {Course, TermSelector } from './Course.js';
import React, { useState } from 'react';
import {signInWithGoogle, signOut, useUserState } from '../utilities/firebase';
import Modal from './Modal';
import ActiveModal from './ActiveModal';

const scheduleChanged = (selected, courses) => (
  selected.some(course => course !== courses[course.id])
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
  
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));

  
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
            <Course key={ course.id } course={ course }
              selected={selected} setSelected={ setSelected } 
            />) 
        }
      </div>
    </>
  );
};

export default CourseList;