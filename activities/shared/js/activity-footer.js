import { stringToSlug } from "../../../src/utils/stringToSlug";
import "../css/activity-footer.css";

const year = import.meta.env.VITE_TEAM_YEAR;
const slug = stringToSlug(import.meta.env.VITE_TEAM_NAME);

export function createActivityLegalFooter(doc = document) {
  const footer = doc.createElement("footer");
  footer.className = "activity-legal";

  const license = doc.createElement("a");
  license.href = "https://creativecommons.org/licenses/by/4.0/";
  license.rel = "license";
  license.textContent =
    "Creative Commons Attribution 4.0 International license";

  const repository = doc.createElement("a");
  repository.href = `https://gitlab.igem.org/${year}/${slug}`;
  repository.textContent = `gitlab.igem.org/${year}/${slug}`;

  const notice = doc.createElement("p");
  notice.append(
    `© ${year} - Content on this site is licensed under a `,
    license,
    ".",
  );

  const source = doc.createElement("p");
  source.append(
    "The repository used to create this website is available at ",
    repository,
    ".",
  );

  footer.append(notice, source);
  return footer;
}

export function mountActivityLegalFooter(doc = document) {
  // The wiki shell already renders the shared site footer around the iframe.
  if (window.self !== window.top) return null;

  const existing = doc.querySelector("body > .activity-legal");
  if (existing) return existing;

  const footer = createActivityLegalFooter(doc);
  doc.body.appendChild(footer);
  return footer;
}
