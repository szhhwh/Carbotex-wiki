export function stakeholderGroupId(title: string) {
  return `ihp-stakeholder-group-${title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}
