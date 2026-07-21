import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>ATLAS Home</h1>} />
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/register" element={<h1>Register</h1>} />
      <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      <Route path="/profile" element={<h1>Profile</h1>} />
      <Route path="/settings" element={<h1>Settings</h1>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;