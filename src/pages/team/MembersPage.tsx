import { TeamMembersPage } from "../../components/team/TeamMembersPage";
import { teamGroupPhoto, teamMembers } from "../../data/members.data";

export function MembersPage() {
  return <TeamMembersPage members={teamMembers} groupPhoto={teamGroupPhoto} />;
}
