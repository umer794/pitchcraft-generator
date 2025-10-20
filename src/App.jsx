// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Text from "./pages/Text";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route → Signup */}
//         <Route path="/" element={<Signup />} />

//         {/* Login route */}
//         <Route path="/login" element={<Login />} />

//         {/* Dashboard route */}
//         <Route path="/dashboard" element={<Dashboard />} />

//         {/* Text page route */}
//         <Route path="/text" element={<Text />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Text from "./pages/Text";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Redirect to Login (better UX) */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Signup route */}
        <Route path="/signup" element={<Signup />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Text page route */}
        <Route path="/text" element={<Text />} />

        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
