import React, { Component, ChangeEvent } from "react";
import { IProject } from "../../types/project";
import { saveAs } from "file-saver";

export interface IProps {
  project: IProject;
  setProject: (project: IProject) => void;
}

interface IState {
  approverEditingId?: string;
}

export class ImportExport extends Component<IProps, IState> {
  public state = { approverEditingId: undefined };

  public render() {
    return (
      <div className="card">
        <div className="card-body">
          <p className="card-text">Import or export config :</p>
          <div className="form-group">
            <label htmlFor="importInput">Import config</label>
            <input
              type="file"
              className="form-control-file"
              id="importInput"
              onChange={this.handleOnImport}
            />
          </div>
          <button
            className="btn btn-sm btn-warning"
            onClick={this.handleOnExport}
          >
            Export config
          </button>
        </div>
      </div>
    );
  }

  private handleOnImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files?.length) return;
    const { project } = this.props;
    try {
      // @ts-ignore
      const importProject = JSON.parse(await files[0].text()) as IProject;
      const importApprovers = importProject.approvers;
      const importApproversIds = importApprovers.map((a) => a.gitlabId);
      this.props.setProject({
        ...project,
        discordWebHookUrl:
          importProject.discordWebHookUrl || project.discordWebHookUrl,
        approvers: importApprovers
          ? [
              ...project.approvers.filter(
                (a) => !importApproversIds.includes(a.gitlabId)
              ),
              ...importApprovers.map((a) => ({
                ...a,
                id: a.discordId,
              })),
            ]
          : project.approvers,
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert("An error occured when parsing file");
    }
  };

  private handleOnExport = () => {
    const { project } = this.props;
    const exportContent = {
      discordWebHookUrl: project.discordWebHookUrl,
      approvers: project.approvers,
    };
    const exportFileName = `gitlab-discord-approvers-config-${project.id}.json`;
    saveAs(
      new Blob([JSON.stringify(exportContent)], {
        type: "text/plain;charset=utf-8",
      }),
      exportFileName
    );
  };
}
