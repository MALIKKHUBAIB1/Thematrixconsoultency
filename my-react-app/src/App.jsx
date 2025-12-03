import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "../layout/Body";

// Pages
import CourseContainer from "./component/Course/CourseContainer";
import Testimonal from "./component/Testimonals/Testimonal";
import Partner from "./component/Partners/Partner";
import Service from "./component/services/Service";
import Contact from "./component/Contact";
import About from "./component/about/About";
import CrousleSection from "./component/CrousleSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "",
        element: (
          <>
            <CrousleSection />
            <CourseContainer />
            <Testimonal />
            <Partner />
          </>
        ),
      },
      {
        path: "services",
        element: <Service />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
