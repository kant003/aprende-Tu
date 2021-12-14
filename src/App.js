import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { NotFound } from 'http-errors';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AddThemePage from './pages/AddThemePage';
import AddCoursePage from './pages/AddCoursePage';
import ThemeDetailPage from './pages/ThemeDetailPage';
import AddSectionPage from './pages/AddSectionPage';

import { SnackbarProvider } from 'notistack';
import ProfilePage from './pages/ProfilePage';


//import ExperiencesPage from './pages/ExperiencesPage';

function App() {

  const [user] = useState(JSON.parse(localStorage.getItem('authUser')));


  return (
    <div>
          <SnackbarProvider maxSnack={3}>

      {user && <Navigation />}
      <React.StrictMode>
        <Routes>
          <Route path="/" element={ <SignInPage /> } />
          <Route path="home" element={ <LandingPage /> } />
          <Route path="courses" element={
            <CoursesPage />
          } />
          <Route path="users/:uid" element={
            <ProfilePage />
          } />
          <Route path="courses/:idCourse" element={
            <CourseDetailPage />
          } />
          <Route path="addcourse" element={
            <AddCoursePage />
          } />
          <Route path="addcourse/:idCourse" element={
            <AddCoursePage />
          } />
          <Route path="courses/:idCourse/addTheme" element={
            <AddThemePage />
          } />
          <Route path="courses/:idCourse/addTheme/:idTheme" element={
            <AddThemePage />
          } />
          <Route path="courses/:idCourse/themes/:idTheme" element={
            <ThemeDetailPage />
          } />
           <Route path="courses/:idCourse/themes/:idTheme/addSection/:type" element={
            <AddSectionPage />
          } />
           <Route path="courses/:idCourse/themes/:idTheme/addSection/:type/:idSection" element={
            <AddSectionPage />
          } />
          {/* <Route path="/courses" element={
                <ExperiencesPage />
            } /> */}
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
      </React.StrictMode>
          </SnackbarProvider>

    </div>
  );
}

export default App;