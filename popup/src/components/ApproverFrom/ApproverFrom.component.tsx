import React, { Component } from "react";
import { IApprover } from "../../types/approver";

interface IProps {
  approver?: IApprover;
  editing?: boolean;
  onSubmit: (approver: IApprover) => void;
}

interface IState extends IApprover {}

const initialState: IState = {
  id: "",
  gitlabId: "",
  discordId: "",
  name: ""
};

export class ApproverFrom extends Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = { ...initialState, ...(props.approver || {}) };
  }

  public render() {
    const { gitlabId, discordId, name } = this.state;
    const { editing } = this.props;
    const buttonStyle = editing
      ? { className: "btn btn-warning btn-sm", icon: "✏️" }
      : { className: "btn btn-primary btn-sm", icon: "➕" };
    return (
      <tr>
        <td>
          <input
            type="text"
            value={gitlabId}
            onChange={this.handleChangeAttribut("gitlabId")}
            placeholder="Gitlab Id*"
            className="form-control form-control-sm"
          />
        </td>
        <td>
          <input
            type="text"
            value={discordId}
            onChange={this.handleChangeAttribut("discordId")}
            placeholder="Discord Id"
            className="form-control form-control-sm"
          />
        </td>
        <td>
          <input
            type="text"
            value={name}
            onChange={this.handleChangeAttribut("name")}
            placeholder="Name*"
            className="form-control form-control-sm"
          />
        </td>
        <td>
          <button
            className={buttonStyle.className}
            onClick={this.handleSubmit}
            disabled={!gitlabId || !name}
          >
            {buttonStyle.icon}
          </button>
        </td>
      </tr>
    );
  }

  private handleChangeAttribut = (attributName: keyof IState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // @ts-ignore
    this.setState({ [attributName]: e.target.value });
  };

  private handleSubmit = () => {
    this.props.onSubmit(this.state);
    this.setState(initialState);
  };
}
