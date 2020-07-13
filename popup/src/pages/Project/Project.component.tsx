import React, { PureComponent } from "react";
import WebhookDiscord from "../../components/WebhookDiscord";
import Approvers from "../../components/Approvers";

export interface IProps {
  onActivate: (activated: boolean) => void;
  activated?: boolean;
}

export class Project extends PureComponent<IProps> {
  public render() {
    const { activated, onActivate } = this.props;
    return (
      <div className="container">
        <h5 className="text-center mt-3">Gitlab Discord Approvers</h5>
        <p className="text-center">
          <i>
            To edit this section ensure you are in one of the page of your
            gitlab project
          </i>
        </p>
        <div className="input-group mb-3">
          <div className="input-group-text mr-1">
            <input
              id="activate"
              type="checkbox"
              onChange={e => onActivate(e.target.checked)}
              checked={activated}
              aria-label="Checkbox for following text input"
            />
          </div>
          <label className="text-success" htmlFor="activate">
            Activate approvers for this project
          </label>
        </div>
        {activated && (
          <>
            <WebhookDiscord />
            <br />
            <Approvers />
          </>
        )}
        <br />
        <p className="text-center">To apply changes reload the page</p>
      </div>
    );
  }
}
