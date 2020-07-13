import { IApprover } from "./approver";

export interface IProject {
  id: string;
  activated?: boolean;
  discordWebHookUrl?: string;
  approvers: IApprover[];
}

export type TProjects = { [projectId: string]: IProject };
