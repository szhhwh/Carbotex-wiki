export type MemberRole =
  | "pi"
  | "secondaryPi"
  | "instructor"
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
  imageCrop?: {
    scale?: number;
    origin?: string;
    objectPosition?: string;
  };
  facts: MemberFact[];
}
