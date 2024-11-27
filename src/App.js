import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { DefaultLayout } from "./components/Layouts";
import { khachHangRoutes, nhanVienRoutes, quanLyRoutes, bepRoutes, publicRoutes } from "./routers";

function App() {
  const nguoiDung = JSON.parse(sessionStorage.getItem('nguoidung'))

  if (!nguoiDung) {
    return (
      <Router>
        <div className="App">
          <Routes>
            {
              publicRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                }
                else if (route.layout === null) {
                  Layout = Fragment;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                )
              })
            }
          </Routes>
        </div>
      </Router>
    )
  }
  else if (nguoiDung.idquyen === 0) {
    return (
      <Router>
        <div className="App">
          <Routes>
            {
              nhanVienRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                }
                else if (route.layout === null) {
                  Layout = Fragment;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                )
              })
            }
          </Routes>
        </div>
      </Router>
    )
  }

  else if (nguoiDung.idquyen === 1) {
    return (
      <Router>
        <div className="App">
          <Routes>
            {
              quanLyRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                }
                else if (route.layout === null) {
                  Layout = Fragment;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                )
              })
            }
          </Routes>
        </div>
      </Router>
    )
  }

  else if (nguoiDung.idquyen === 2) {
    return (
      <Router>
        <div className="App">
          <Routes>
            {
              bepRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                }
                else if (route.layout === null) {
                  Layout = Fragment;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                )
              })
            }
          </Routes>
        </div>
      </Router>
    )
  }

  else if (nguoiDung.idquyen === 3) {
    return (
      <Router>
        <div className="App">
          <Routes>
            {
              khachHangRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                }
                else if (route.layout === null) {
                  Layout = Fragment;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                )
              })
            }
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;
