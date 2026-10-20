export type MemberRole =
  | "leader"
  | "wetlab"
  | "drylab"
  | "design"
  | "education"
  | "model"
  | "advisor";

export interface MemberFact {
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  major: string;
  roles: [MemberRole, ...MemberRole[]];
  image: string;
  facts: MemberFact[];
}
