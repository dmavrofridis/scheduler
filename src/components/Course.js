import { hasConflict } from '../utilities/times';
import React, { useState } from 'react';
import { useUserState } from '../utilities/firebase';
import Modal from './Modal';
import ActiveModalEditCourse from './ActiveModalEditCourse';
import './Course.css';

const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

export const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const [user] = useUserState();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const style = {
    backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };
  
  return (
    <div className="card m-1 p-2" 
        data-cy="course"
        style={style}
        onClick={(isDisabled) ? null : () => setSelected(toggle(course, selected))}>
          
      <div className="card-body">
        <div className="card-title">{ course.term } CS { course.number }</div>
        <div className="card-text">{ course.title }</div>
        <div className="card-text">{ course.meets }</div>
        { user ? <button className="ms-auto btn btn-dark m-1 p-2" onClick={openModal}>Edit</button> : <></> }
        <Modal open={open} close={closeModal}>
        <ActiveModalEditCourse course={course} />
        </Modal>
      </div>
    </div>
  );
};
