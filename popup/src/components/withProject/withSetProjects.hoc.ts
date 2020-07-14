import { withProps } from "recompose";
import config from "../../config";
import { TProjects } from "../../types/project";

export interface IWithSetProjectsProp {
  setProjects: (projects: TProjects) => void;
}
export const withSetProjects = withProps<IWithSetProjectsProp, {}>(() => ({
  setProjects: (projects) => {
    // @ts-ignore
    window.addEventListener("unload", () =>
      // @ts-ignore
      window.confirm(
        "The application is saving .. your configuration do you really want to quit ?"
      )
    );
    window.onbeforeunload = () =>
      "The application is saving your configuration do you really want to quit ?";
    chrome.storage.local.set({ [config.LOCAL_STORAGE_KEY]: projects });
  },
}));
