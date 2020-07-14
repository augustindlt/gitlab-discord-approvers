import { withState, compose, lifecycle } from "recompose";
import { TProjects, TProjectsStatus } from "../../types/project";
import config from "../../config";

export interface IWithProjectsProp {
  projects: TProjects;
  projectsStatus: TProjectsStatus;
}

interface IConnectedProps {
  setProjectsList: (projects: TProjects) => void;
  setProjectsStatus: (status: TProjectsStatus) => void;
}

const withFetchProjects = lifecycle<IConnectedProps, {}>({
  componentDidMount() {
    chrome.storage.local.get(
      [config.LOCAL_STORAGE_KEY],
      (projects: { [storageKey: string]: TProjects }) => {
        if (projects[config.LOCAL_STORAGE_KEY]) {
          this.props.setProjectsList(projects[config.LOCAL_STORAGE_KEY]);
        } else chrome.storage.local.set({ [config.LOCAL_STORAGE_KEY]: {} });
        this.props.setProjectsStatus("fetched");
      }
    );
  },
});

export const withProjects = compose(
  withState("projects", "setProjectsList", {}),
  withState("projectsStatus", "setProjectsStatus", "loading"),
  withFetchProjects
);
