import { withState, compose, lifecycle } from "recompose";

export interface IWithProjectIdProp {
  projectId: string;
}

interface IConnectedProps {
  setProjectId: (projectId: string) => void;
}

export const withCurrentProjectId = compose<IWithProjectIdProp, {}>(
  withState("projectId", "setProjectId", "waiting"),

  lifecycle<IConnectedProps, {}>({
    componentDidMount() {
      chrome.tabs.getSelected(tab => {
        if (tab && tab.url) {
          const projectId = tab.url.split("/")[4];
          if (projectId) this.props.setProjectId(projectId);
        }
      });
    }
  })
);
