export class Comments {
  $commentArea: HTMLTextAreaElement;
  $commentButton: HTMLButtonElement;
  $commentsPayloadUrl: HTMLScriptElement;
  $commentsContainer: HTMLDivElement;
  comments: string[];
  commentItemSelector: string;

  public constructor(
    $commentArea: HTMLTextAreaElement,
    $commentButton: HTMLButtonElement,
    $commentsPayloadUrl: HTMLScriptElement,
    $commentsContainer: HTMLDivElement,
    commentItemSelector: string
  ) {
    this.$commentArea = $commentArea;
    this.$commentButton = $commentButton;
    this.$commentsPayloadUrl = $commentsPayloadUrl;
    this.$commentsContainer = $commentsContainer;
    this.commentItemSelector = commentItemSelector;
    this.comments = [];
  }

  public sendComment(comment: string) {
    this.$commentArea.value = comment;
    this.$commentArea.dispatchEvent(new Event("change"));
    this.$commentButton.disabled = false;
    this.$commentButton.click();
    this.$commentButton.disabled = true;
    this.comments.push(comment);
  }

  public async fetchComments() {
    const notesPayloadsUrl = this.$commentsPayloadUrl.textContent;
    const { notesUrl } = JSON.parse(notesPayloadsUrl) as {
      notesUrl: string;
    };
    await fetch(notesUrl);

    const $comments = document.querySelectorAll<HTMLDivElement>(
      this.commentItemSelector
    );
    for (let i = 0; i < $comments.length; i++) {
      if ($comments[i].innerText !== "")
        this.comments.push($comments[i].innerText);
    }

    return this.comments;
  }

  public getApprover() {
    const approverRegex = /^\[approver:@(.*)\]$/;

    for (let i = 0; this.comments.length > i; i++) {
      if (approverRegex.test(this.comments[i])) {
        return this.comments[i].match(approverRegex)[1];
      }
    }
    return null;
  }

  public getApprovedBy() {
    const approvedByRegex = /^\[approvedBy:@(.*)\]$/;
    return this.comments.find(comment => approvedByRegex.test(comment));
  }

  public getDisapprovedBy() {
    const approvedByRegex = /^\[disapprovedBy:@(.*)\]$/;
    return this.comments.find(comment => approvedByRegex.test(comment));
  }
}
