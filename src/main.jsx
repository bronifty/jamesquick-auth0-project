import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact.jsx";
import EditContact, { action as editAction } from "./routes/edit.jsx";
import { action as destroyAction } from "./routes/destroy.jsx";
import Index from "./routes/index.jsx";
import Game from "./pages/Game";
import Home from "./pages/Home";
import HighScores from "./pages/HighScores";
import GameOver from "./pages/GameOver";
import Layout from "./components/Layout";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     loader: rootLoader,
//     action: rootAction,
//     children: [
//       {
//         errorElement: <ErrorPage />,
//         children: [
//           { index: true, element: <Index /> },
//           {
//             path: "contacts/:contactId",
//             element: <Contact />,
//             loader: contactLoader,
//             action: contactAction,
//           },
//           {
//             path: "contacts/:contactId/edit",
//             element: <EditContact />,
//             loader: contactLoader,
//             action: editAction,
//           },
//           {
//             path: "contacts/:contactId/destroy",
//             action: destroyAction,
//             errorElement: <div>Oops! There was an error.</div>,
//           },
//         ],
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "game",
        element: <Game />,
      },
      {
        path: "highScores",
        element: <HighScores />,
      },
      {
        path: "gameOver",
        element: <GameOver />,
      },
    ],
  },
]);

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/game" component={Game} />
//         <Route path="/highScores" component={HighScores} />
//         <Route path="/gameOver" component={GameOver} />
//         <Route path="/" component={Home} />
//       </Switch>
//     </Router>
//   );
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
