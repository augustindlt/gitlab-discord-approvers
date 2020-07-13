import { withState, compose, lifecycle } from "recompose";
import { TProjects } from "../../types/project";
import config from "../../config";

export interface IWithProjectsProp {
  projects: TProjects;
}

interface IConnectedProps {
  setProjectsList: (projects: TProjects) => void;
}

const withFetchProjects = lifecycle<IConnectedProps, {}>({
  componentDidMount() {
    chrome.storage.local.get(
      [config.LOCAL_STORAGE_KEY],
      (projects: { [storageKey: string]: TProjects }) => {
        if (projects[config.LOCAL_STORAGE_KEY]) {
          this.props.setProjectsList(projects[config.LOCAL_STORAGE_KEY]);
        } else chrome.storage.local.set({ [config.LOCAL_STORAGE_KEY]: {} });
      }
    );
  }
});

export const withProjects = compose(
  withState("projects", "setProjectsList", {}),
  withFetchProjects
);
