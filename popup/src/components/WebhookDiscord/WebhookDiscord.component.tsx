import React, { PureComponent } from "react";

export interface IProps {
  webhookUrl: string;
  onChangeWebhookUrl: (url: string) => void;
}

export class WebhookDiscord extends PureComponent<IProps> {
  public render() {
    const { webhookUrl, onChangeWebhookUrl } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <p className="card-text">Add webhook discord url :</p>
          <input
            type="text"
            className="form-control form-control-sm"
            value={webhookUrl}
            onChange={e => onChangeWebhookUrl(e.target.value)}
          />
        </div>
      </div>
    );
  }
}
