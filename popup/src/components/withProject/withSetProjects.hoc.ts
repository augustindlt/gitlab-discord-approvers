import { withProps } from "recompose";
import config from "../../config";
import { TProjects } from "../../types/project";

export interface IWithSetProjectsProp {
  setProjects: (projects: TProjects) => void;
}
export const withSetProjects = withProps<IWithSetProjectsProp, {}>(() => ({
  setProjects: projects => {
    chrome.storage.local.set({ [config.LOCAL_STORAGE_KEY]: projects });
  }
}));
