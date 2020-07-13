import { IApprover } from "./types";

export class DiscordNotifications {
  private mrTitle: string;
  private webHookUrl: string;
  private currentUser: IApprover;

  public constructor(
    mrTitle: string,
    webHookUrl: string,
    currentUser: IApprover
  ) {
    this.mrTitle = mrTitle;
    this.webHookUrl = webHookUrl;
    this.currentUser = currentUser;
  }

  public sendForChoosenApprover = (approver: IApprover) => {
    this.sendNotification(
      `Hey <@${approver.discordId}> ! Can you review my merge request 🙏 :\n\`${this.mrTitle}\`\n[Go to the merge request !](${window.location.href})`
    );
  };

  public sendForAprooved = (author: IApprover) => {
    this.sendNotification(
      `Hey <@${author.discordId}> ! I approve your merge request 👍 :\n\`${this.mrTitle}\`\n[Go to the merge request !](${window.location.href})`
    );
  };

  public sendForDisaprooved = (author: IApprover) => {
    this.sendNotification(
      `Hey <@${author.discordId}> ! I disapprove your merge request 👎 :\n\`${this.mrTitle}\`\n[Go to the merge request !](${window.location.href})`
    );
  };

  private sendNotification = async (content: string) => {
    if (!this.isWebhookUrlValid()) return;
    try {
      return await fetch(this.webHookUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content,
          username: this.currentUser.name
        })
      });
    } catch (e) {
      console.error("DiscordNotifications : ", e);
      alert(
        "Sorry we try to send your notifiaction to discord but something failed..."
      );
    }
  };

  private isWebhookUrlValid = () =>
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
      this.webHookUrl
    );
}
