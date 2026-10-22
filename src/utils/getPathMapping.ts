import pages, { type PageLayout } from "../app/routes.ts";
import type { ComponentType } from "react";

export const getPathMapping = () => {
  return pages.reduce<{
    [key: string]: {
      name: string | undefined;
      title: string | undefined;
      component: ComponentType;
      layout: PageLayout;
    };
  }>((map, item) => {
    if ("path" in item && item.path && item.component) {
      map[item.path] = {
        name: item.name,
        title: item.title,
        component: item.component,
        layout: item.layout,
      };
    } else if ("folder" in item && item.folder) {
      item.folder.forEach((page) => {
        if (page.path && page.component) {
          map[page.path] = {
            name: page.name,
            title: page.title,
            component: page.component,
            layout: page.layout,
          };
        }
      });
    }
    return map;
  }, {});
};
