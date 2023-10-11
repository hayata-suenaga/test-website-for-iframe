import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Expenses() {
  const [searchParams] = useSearchParams();
  const param = JSON.parse(searchParams.get("param")) ?? {};
  const { viewMode } = param;

  return (
    <div>
      <h2>{viewMode === "charts" ? "Insights" : "Expenses"}</h2>
    </div>
  );
}

function Reports() {
  return (
    <div>
      <h2>Reports</h2>
    </div>
  );
}

function WorkspaceEditor() {
  const [searchParams] = useSearchParams();
  const param = JSON.parse(searchParams.get("param")) ?? {};
  const { section } = param;

  return (
    <div>
      <h2>
        {`Workspaces > ${
          section === "individual"
            ? "Individual Workspaces"
            : "Group Workspaces"
        }`}
      </h2>
    </div>
  );
}

function Settings() {
  const [searchParams] = useSearchParams();
  const param = JSON.parse(searchParams.get("param")) ?? {};
  const { section } = param;

  let pageName = "";

  switch (section) {
    case "account":
      pageName = "Account Details";
      break;
    case "preferences":
      pageName = "Preferences";
      break;
    case "expenserules":
      pageName = "Expense Rules";
      break;
    case "creditcards":
      pageName = "Credit Cards and Transaction Feeds";
      break;
    case "payments":
      pageName = "Payments";
      break;
    default:
      break;
  }

  return (
    <div>
      <h2>{`Account > ${pageName}`}</h2>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 Page</h2>
    </div>
  );
}

function App() {
  useEffect(() => {
    const isWebsiteEmbedded = window !== window.top;

    if (!isWebsiteEmbedded) {
      return;
    }

    function handleURLChange() {
      window.parent.postMessage(window.location.href, "http://localhost:8082");
    }

    window.addEventListener("hashchange", handleURLChange, false);

    const originalPushState = window.history.pushState;
    window.history.pushState = function () {
      originalPushState.apply(window.history, arguments);
      handleURLChange();
    };

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function () {
      originalReplaceState.apply(window.history, arguments);
      handleURLChange();
    };

    return () => {
      window.removeEventListener("hashchange", handleURLChange);
    };
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/inbox">Home</Link>
            </li>
            <li>
              <Link to="/expenses">Expenses</Link>
            </li>
            <li>
              <Link to="/reports">Reports</Link>
            </li>
            <li>
              <Link to='/expenses?param={"viewMode":"charts"}'>Insights</Link>
            </li>
            <li>
              <Link to="/admin_policies">Workspaces</Link>
            </li>
            <ul>
              <li>
                <Link to='/admin_policies?param={"section":"individual"}'>
                  Individual Workspaces
                </Link>
              </li>
              <li>
                <Link to='/admin_policies?param={"section":"group"}'>
                  Group Workspaces
                </Link>
              </li>
            </ul>
            <li>
              <Link to='settings?param={"section":"account"}'>Accounts</Link>
            </li>
            <ul>
              <li>
                <Link to='settings?param={"section":"account"}'>
                  Account Details
                </Link>
              </li>
              <li>
                <Link to='settings?param={"section":"preferences"}'>
                  Preferences
                </Link>
              </li>
              <li>
                <Link to='settings?param={"section":"expenserules"}'>
                  Expense Rules
                </Link>
              </li>
              <li>
                <Link to='settings?param={"section":"creditcards"}'>
                  Credit Cards and Transaction Feeds
                </Link>
              </li>
              <li>
                <Link to='settings?param={"section":"payments"}'>Payments</Link>
              </li>
            </ul>
          </ul>
        </nav>

        <Routes>
          <Route path="/inbox" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin_policies" element={<WorkspaceEditor />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
