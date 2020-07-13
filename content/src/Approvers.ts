import { IApprover } from "./types";

export class Approvers {
  $userMenu: HTMLLIElement;
  approvers: IApprover[];
  $authorLink: HTMLAnchorElement;

  constructor(
    $userMenu: HTMLLIElement,
    $authorLink: HTMLAnchorElement,
    approvers: IApprover[]
  ) {
    this.$userMenu = $userMenu;
    this.$authorLink = $authorLink;
    this.approvers = approvers;
  }

  public getMe(): IApprover {
    const userData = this.$userMenu.innerText
      .split("\n")
      .filter(data => data !== "");
    const [name, gitlabId] = userData;
    const gitlabIdWithoutAt = gitlabId.replace(/^@/, "");
    return {
      id: gitlabIdWithoutAt,
      name,
      gitlabId: gitlabIdWithoutAt
    };
  }

  public getAuthor(): IApprover {
    const { username, name } = this.$authorLink.dataset;
    const authorInApprovers = this.getApproverByGitlabId(username);
    if (authorInApprovers) return authorInApprovers;
    return {
      id: username,
      name,
      gitlabId: username
    };
  }

  public getApprovers() {
    return this.approvers;
  }

  private getApproverByGitlabId = (gitlabId: string) => {
    return this.approvers.find(approver => approver.gitlabId === gitlabId);
  };
}
