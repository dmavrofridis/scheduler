import React from 'react';
import './App.css';
import { useData, useUserState } from './utilities/firebase.js';
import CourseList from './components/CourseList';
import {timeParts} from './utilities/times.js';

const Banner = ({ title, user }) => (
  <div className="content display-flex justify-content-space-between">
    <h1>{ title }</h1>
    {user ? <p className="ms-auto" id="welcome">Welcome, {user.displayName}</p> : <p className="ms-auto" id="welcome">Welcome guest, sign in to view, select and edit courses.</p>}
    </div>
);

const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});

const App = () => {
  const [schedule, loading, error] = useData('/schedule/', addScheduleTimes); 
  const [user] = useUserState();

  console.log(schedule);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } user = {user} />
      <CourseList courses={ schedule.courses } />
    </div>
  );

};


export default App;