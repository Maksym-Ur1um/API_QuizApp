import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import  LoginPage  from './pages/LoginPage'
import ActiveTestPage from './pages/ActiveTestPage'
import TestListPage from './pages/TestListPage'
import TestResultPage from './pages/TestResultPage'

export default function App() {
  return(
    <Routes>
      <Route path = "/login" element= {<LoginPage />}/>
      <Route path="/" element = {<TestListPage />} />
      <Route path = "/test/:id" element = {<ActiveTestPage />}/>
      <Route path = "results/:id" element = {<TestResultPage />} />
    </Routes>
  )
}