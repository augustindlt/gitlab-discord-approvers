import React, { Component } from "react";
import { IApprover } from "../../types/approver";
import ApproverRow from "../ApproverRow";
import ApproverFrom from "../ApproverFrom";

export interface IProps {
  approvers: IApprover[];
  onChangeApprovers: (approvers: IApprover[]) => {};
}

interface IState {
  approverEditingId?: string;
}

export class Approvers extends Component<IProps, IState> {
  public state = { approverEditingId: undefined };

  public render() {
    const { approvers } = this.props;
    const { approverEditingId } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <p className="card-text">Add approvers :</p>
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">Gitlab Id</th>
                <th scope="col">Discord Id</th>
                <th scope="col">Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {approvers.map(approver =>
                approver.id === approverEditingId ? (
                  <ApproverFrom
                    approver={approver}
                    onSubmit={this.handleUpdateApprover}
                    editing
                  />
                ) : (
                  <ApproverRow
                    approver={approver}
                    onEdit={this.handleEditApprover}
                    onDelete={this.handleDeleteApprover}
                  />
                )
              )}

              <ApproverFrom onSubmit={this.handleAddApprover} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  private handleEditApprover = (approverEditingId: string) => {
    this.setState({ approverEditingId });
  };

  private handleAddApprover = (approver: IApprover) => {
    this.props.onChangeApprovers([
      ...this.props.approvers,
      { ...approver, id: approver.gitlabId }
    ]);
  };

  private handleUpdateApprover = (approver: IApprover) => {
    this.props.onChangeApprovers(
      this.props.approvers.map(a => {
        if (a.id === approver.id) return approver;
        return a;
      })
    );
    this.setState({ approverEditingId: undefined });
  };

  private handleDeleteApprover = (approverId: string) => {
    this.props.onChangeApprovers(
      this.props.approvers.filter(approver => approver.id !== approverId)
    );
  };
}
