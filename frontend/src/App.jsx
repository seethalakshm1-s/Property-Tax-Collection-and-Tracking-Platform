
import { useState } from "react";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Property from "./Property";
import Tax from "./Tax";
import Payment from "./Payment";
import Admin from "./Admin";
import Receipt from "./Receipt";
import Complaint from "./Complaint";
function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  switch (page) {
    case "home":
      return <Home setPage={setPage} />;

    case "login":
      return (
        <Login
          setPage={setPage}
          setUser={setUser}
        />
      );

    case "register":
      return <Register setPage={setPage} />;

    case "dashboard":
      return (
        <Dashboard
          setPage={setPage}
          user={user}
        />
      );

    case "admin":
      return <Admin setPage={setPage} />;

    case "property":
      return <Property setPage={setPage} />;

    case "tax":
  return <Tax setPage={setPage} user={user} />;

    case "payment":
  return <Payment setPage={setPage} user={user} />;
 case "receipt":
  return <Receipt setPage={setPage} user={user} />;
  case "complaint":
  return <Complaint setPage={setPage} />;
    default:
      return <Home setPage={setPage} />;
  }
}

export default App;