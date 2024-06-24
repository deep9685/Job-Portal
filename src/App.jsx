import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

import React from "react";
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import JobPage, {jobLoader} from './pages/JobPage';
import NotFound from './pages/NotFound';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';



const App = () => {

  // Addjob 
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  }

  // Delete job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // update Job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
  
        <Route index element={<HomePage/>}/>
        <Route path='/jobs' element={<JobsPage/>}/>
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>}/>
        <Route path='/jobs/:id' element={<JobPage deleteJob = {deleteJob}/>} loader={jobLoader} />
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />

  
        <Route path='*' element={<NotFound/>}/>
  
  
      </Route>
      
    )
  )

  return <RouterProvider router={router} />;
  // return (
  //   <div>
      
  //     <Navbar/>
  //     {/* <!-- Hero --> */}
  //     <Hero title='Become React Dev' subTitle='Find the React job that fits your skills and needs'/>

  //     {/* <!-- Developers and Employers --> */}
  //     <HomeCards/>

  //     {/* <!-- Browse Jobs --> */}
  //     <JobListings/>

  //     <ViewAllJobs/>
      
  //   </div>
  // );
};

export default App;
