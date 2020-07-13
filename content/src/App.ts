import { IApprover } from "./types";

import {
  renderApproveButton,
  renderApproverSelect,
  renderDisapproveButton,
  renderWaitingApprovalMessage,
  renderApproverRefusedMessage,
  renderWaitingApprovalRefusedMessage
} from "./elements";
import { Comments } from "./Comments";
import { Approvers } from "./Approvers";
import { DiscordNotifications } from "./DiscordNotifications";
import { Thumbs } from "./Thumbs";

export interface IAppElements {
  $mergeButton: HTMLButtonElement;
  $container: HTMLSpanElement;
  $approveButton: HTMLButtonElement;
  $disapproveButton: HTMLButtonElement;
  $approverSelect: HTMLSelectElement;
  $waitingApprovalMessage: HTMLParagraphElement;
  $waitingApprovalRefusedMessage: HTMLParagraphElement;
  $approverRefusedMessage: HTMLParagraphElement;
}

export interface IAppState {
  approverId: string | null;
  approved?: boolean;
  disapproved?: boolean;
}

export class App {
  elements: IAppElements;
  comments: Comments;
  state: IAppState;
  approvers: Approvers;
  discordNotifications: DiscordNotifications;
  thumbs: Thumbs;

  public constructor(
    $container: HTMLSpanElement,
    $mergeButton: HTMLButtonElement,
    comments: Comments,
    approvers: Approvers,
    discordNotifications: DiscordNotifications,
    thumbs: Thumbs
  ) {
    this.elements = {
      $container,
      $approveButton: renderApproveButton({ onClick: this.onApprove }),
      $approverSelect: renderApproverSelect({
        onApproverSelected: this.onApproverSelected,
        approvers: approvers.getApprovers()
      }),
      $disapproveButton: renderDisapproveButton({
        onClick: this.onDisapprove
      }),
      $waitingApprovalMessage: renderWaitingApprovalMessage(),
      $waitingApprovalRefusedMessage: renderWaitingApprovalRefusedMessage(),
      $approverRefusedMessage: renderApproverRefusedMessage(),
      $mergeButton
    };
    this.comments = comments;
    this.approvers = approvers;
    this.discordNotifications = discordNotifications;
    this.thumbs = thumbs;

    this.state = {
      approverId: this.comments.getApprover(),
      approved: !!this.comments.getApprovedBy(),
      disapproved: !!this.comments.getDisapprovedBy()
    };
    this.elements.$container.append(this.elements.$approverSelect);
    this.elements.$container.append(this.elements.$approveButton);
    this.elements.$container.append(this.elements.$disapproveButton);
    this.elements.$container.append(this.elements.$waitingApprovalMessage);
    this.elements.$container.append(
      this.elements.$waitingApprovalRefusedMessage
    );
    this.elements.$container.parentElement.prepend(
      this.elements.$approverRefusedMessage
    );
  }

  public run() {
    const { approverId, approved, disapproved } = this.state;
    const {
      $container,
      $mergeButton,
      $approveButton,
      $disapproveButton,
      $waitingApprovalMessage,
      $waitingApprovalRefusedMessage,
      $approverRefusedMessage,
      $approverSelect
    } = this.elements;
    $container.classList.remove("btn-group");
    if (!approved) {
      $mergeButton.style.display = "none";
    } else {
      $mergeButton.style.display = "block";
    }
    if (
      approverId &&
      approverId === this.approvers.getMe().gitlabId &&
      !approved
    ) {
      $container.classList.add("btn-group");
      $approveButton.style.display = "block";
      $disapproveButton.style.display = "block";
    } else {
      $approveButton.style.display = "none";
      $disapproveButton.style.display = "none";
    }

    $waitingApprovalMessage.style.display =
      approverId &&
      !approved &&
      !disapproved &&
      approverId !== this.approvers.getMe().gitlabId
        ? "block"
        : "none";

    $waitingApprovalRefusedMessage.style.display =
      approverId &&
      !approved &&
      disapproved &&
      approverId !== this.approvers.getMe().gitlabId
        ? "block"
        : "none";

    $approverRefusedMessage.style.display =
      approverId &&
      !approved &&
      disapproved &&
      approverId === this.approvers.getMe().gitlabId
        ? "block"
        : "none";

    $approverSelect.style.display = approverId ? "none" : "block";
  }

  private setState = (newState: Partial<IAppState>) => {
    this.state = { ...this.state, ...newState };
    this.run();
  };

  private onApproverSelected = (selectedApprover: IApprover) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(`Are you sure to take ${selectedApprover.name} as reviewer ?`)
    ) {
      this.comments.sendComment(`[approver:@${selectedApprover.gitlabId}]`);
      this.discordNotifications.sendForChoosenApprover(selectedApprover);
      this.setState({ approverId: selectedApprover.gitlabId });
    }
  };

  private onApprove = () => {
    this.comments.sendComment(
      `[approvedBy:@${this.approvers.getMe().gitlabId}]`
    );
    this.discordNotifications.sendForAprooved(this.approvers.getAuthor());
    this.thumbs.setApprove(true);
    this.setState({ approved: true });
  };

  private onDisapprove = () => {
    this.comments.sendComment(
      `[disapprovedBy:@${this.approvers.getMe().gitlabId}]`
    );
    this.discordNotifications.sendForDisaprooved(this.approvers.getAuthor());
    this.thumbs.setApprove(false);
    this.setState({ disapproved: true });
  };
}
