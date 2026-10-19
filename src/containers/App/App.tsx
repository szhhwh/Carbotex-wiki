import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { getPathMapping, stringToSlug } from "../../utils";
import { Suspense, useEffect, type ComponentType } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Header } from "../../components/layout/Header";
import { NotFound } from "../../components/routing/NotFound";
import { Footer } from "../../components/layout/Footer";
import { ReferencesProvider } from "../../components/article/References";
import {
  PageLoadBoundary,
  PageLoading,
} from "../../components/routing/PageLoadState";
import {
  RouteContentReady,
  RouteScrollManager,
} from "../../components/routing/RouteScrollManager";
import { RouteLoadingScreen } from "../../components/routing/RouteLoadingScreen";
import type { PageLayout } from "../../pages";

interface PageRouteProps {
  title: string | undefined;
  lead: string | undefined;
  component: ComponentType;
  layout?: PageLayout;
}

function PageRoute({
  title,
  lead,
  component: Component,
  layout,
}: PageRouteProps) {
  const pageTitle = title || "";
  const pageContent = (
    <PageLoadBoundary title={pageTitle} layout={layout}>
      <Suspense fallback={<PageLoading title={pageTitle} layout={layout} />}>
        <Component />
        <RouteContentReady />
      </Suspense>
    </PageLoadBoundary>
  );

  return (
    <ReferencesProvider>
      {layout === "fullscreen" || layout === "article" ? (
        pageContent
      ) : (
        <>
          <Header title={pageTitle} lead={lead || ""} />
          <div className="container">{pageContent}</div>
        </>
      )}
    </ReferencesProvider>
  );
}

const App = () => {
  const pathMapping = getPathMapping();
  const { pathname } = useLocation();
  const currentPath =
    pathname.split(`${stringToSlug(import.meta.env.VITE_TEAM_NAME)}`).pop() ||
    "/";

  const pageMeta =
    currentPath in pathMapping ? pathMapping[currentPath] : undefined;
  const isFullscreen = pageMeta?.layout === "fullscreen";

  // Set Page Title
  const title = pageMeta ? pageMeta.title : "Not Found";

  // Fullscreen pages (e.g. scroll-driven Home) drop the fixed-navbar body offset
  useEffect(() => {
    document.body.classList.toggle("fullscreen-page", isFullscreen);
    return () => document.body.classList.remove("fullscreen-page");
  }, [isFullscreen]);

  useEffect(() => {
    document.title = `${title || ""} | ${import.meta.env.VITE_TEAM_NAME} - iGEM ${import.meta.env.VITE_TEAM_YEAR}`;
  }, [title]);

  return (
    <>
      <RouteScrollManager enabled={!isFullscreen} />
      {/* Navigation */}
      <Navbar />
      <RouteLoadingScreen title={title ?? ""} />

      {/* Header and PageContent */}
      <Routes>
        {Object.entries(pathMapping).map(
          ([path, { title, lead, component, layout }]) => (
            <Route
              key={path}
              path={path}
              element={
                <PageRoute
                  key={path}
                  title={title}
                  lead={lead}
                  component={component}
                  layout={layout}
                />
              }
            />
          ),
        )}
        <Route
          path="*"
          element={
            <ReferencesProvider>
              <Header
                title="Not Found"
                lead="The requested URL was not found on this server."
              />
              <NotFound />
              <RouteContentReady />
            </ReferencesProvider>
          }
        />
      </Routes>

      {/* Footer */}
      {/* MUST mention license AND have a link to team wiki's repository on gitlab.igem.org */}
      <Footer />
    </>
  );
};

export default App;
