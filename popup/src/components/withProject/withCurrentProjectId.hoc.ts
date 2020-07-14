import { withState, compose, lifecycle } from "recompose";
import { TProjectsStatus, TProjects } from "../../types/project";

export interface IWithProjectIdProp {
  projectId: string;
  projectIdStatus: TProjectsStatus;
}

interface IConnectedProps {
  setProjectId: (projectId: string) => void;
  setProjectIdStatus: (status: TProjectsStatus) => void;
}

export const withCurrentProjectId = compose<IWithProjectIdProp, {}>(
  withState("projectId", "setProjectId", "waiting"),
  withState("projectIdStatus", "setProjectIdStatus", "loading"),

  lifecycle<IConnectedProps, {}>({
    componentDidMount() {
      chrome.tabs.getSelected((tab) => {
        if (tab && tab.url) {
          const projectId = tab.url.split("/")[4];
          if (projectId) this.props.setProjectId(projectId);
          this.props.setProjectIdStatus("fetched");
        }
      });
    },
  })
);
