import { compose, withState, withProps, lifecycle } from "recompose";
import {
  withCurrentProject,
  IWithCurrentProjectProp,
  IWithSetProjectProp,
  withSetProject
} from "../../components/withProject";
import { WebhookDiscord, IProps } from "./WebhookDiscord.component";

interface IConnectedProps
  extends IWithCurrentProjectProp,
    IWithSetProjectProp,
    IProps {}

export default compose<IProps, {}>(
  withCurrentProject,
  withSetProject,
  withState(
    "webhookUrl",
    "onChangeWebhookUrl",
    (props: IConnectedProps) => props.project.discordWebHookUrl || ""
  ),
  lifecycle<IConnectedProps, {}>({
    componentDidUpdate(prevProps) {
      if (
        prevProps.webhookUrl === "" &&
        this.props.project.discordWebHookUrl !== undefined
      )
        this.props.onChangeWebhookUrl(this.props.project.discordWebHookUrl!);
    }
  }),
  withProps((props: IConnectedProps) => ({
    onChangeWebhookUrl: (discordWebHookUrl: string) => {
      props.onChangeWebhookUrl(discordWebHookUrl);
      props.setProject({ ...props.project, discordWebHookUrl });
    }
  }))
)(WebhookDiscord);
