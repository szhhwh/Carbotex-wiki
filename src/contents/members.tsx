import { TeamMembersPage } from "../components/team/TeamMembersPage";
import { teamGroupPhoto, teamMembers } from "./membersData";

export function Members() {
  return <TeamMembersPage members={teamMembers} groupPhoto={teamGroupPhoto} />;
}
