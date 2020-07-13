export interface IApprover {
  id: string;
  gitlabId: string;
  discordId?: string;
  name: string;
}

export interface IProject {
  id: string;
  activated?: boolean;
  discordWebHookUrl?: string;
  approvers: IApprover[];
}

export type TProjects = { [projectId: string]: IProject };
