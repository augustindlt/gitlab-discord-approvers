import React, { PureComponent } from "react";
import { IApprover } from "../../types/approver";

interface IProps {
  approver: IApprover;
  onEdit: (approverId: string) => void;
  onDelete: (approverId: string) => void;
}

export class ApproverRow extends PureComponent<IProps> {
  public render() {
    const {
      approver: { id, gitlabId, discordId, name },
      onEdit
    } = this.props;
    return (
      <tr onClick={() => onEdit(id)}>
        <td>{gitlabId}</td>
        <td>{discordId}</td>
        <td>{name}</td>
        <td>
          <div className="btn-group">
            <button
              className="btn btn-danger btn-sm"
              onClick={this.handleDelete}
            >
              🗑
            </button>
          </div>
        </td>
      </tr>
    );
  }

  private handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure to delete this approver ?"))
      this.props.onDelete(this.props.approver.id);
  };
}
