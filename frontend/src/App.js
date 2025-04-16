import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page components
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CourseList from './components/courses/CourseList';
import CourseDetail from './components/courses/CourseDetail';
import LearningEnvironment from './components/learning/LearningEnvironment';
import Subscription from './components/subscription/Subscription';

// Private route component
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/courses" component={CourseList} />
            <Route exact path="/courses/category/:category" component={CourseList} />
            <Route exact path="/courses/:id" component={CourseDetail} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/learn/:courseId" component={LearningEnvironment} />
            <PrivateRoute exact path="/subscription" component={Subscription} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
