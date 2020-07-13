import { Comments } from "./Comments";
import { App } from "./App";
import { Approvers } from "./Approvers";
import config from "./config";
import { TProjects } from "./types";
import { DiscordNotifications } from "./DiscordNotifications";
import { Thumbs } from "./Thumbs";

const MERGE_BAR_BUTTONS_SELECTOR = ".mr-widget-section .btn-group";
const MERGE_BUTTON_SELECTOR = ".qa-merge-button";
const COMMENT_TEXTAREA_SELECTOR = "#note-body";
const COMMENT_BUTTON_SELECTOR = ".qa-comment-button";
const COMMENTS_PAYLOAD_URL_SELECTOR = ".js-notes-data";
const COMMENTS_CONTAINER_SELECTOR = ".js-notes-data";
const COMMENT_ITEM_SELECTOR = ".note-body";
const USER_MENU_SELECTOR = ".current-user";
const AUTHOR_LINK_SELECTOR = ".author-link";
const MR_TITLE_SELECTOR = ".mb-0.qa-title.title";
const THUMBS_UP_SELECTOR = "[data-name='thumbsup']";
const THUMBS_DOWN_SELECTOR = "[data-name='thumbsdown']";
const THUMBS_COUNTER_SELECTOR = ".js-counter";

const init = async () => {
  const $mergeBarButtons = document.querySelector<HTMLSpanElement>(
    MERGE_BAR_BUTTONS_SELECTOR
  );

  if ($mergeBarButtons === null) {
    setTimeout(init, 100);
    return;
  }
  const $mergeButton = document.querySelector<HTMLButtonElement>(
    MERGE_BUTTON_SELECTOR
  );

  const $commentArea = document.querySelector<HTMLTextAreaElement>(
    COMMENT_TEXTAREA_SELECTOR
  );

  const $commentButton = document.querySelector<HTMLButtonElement>(
    COMMENT_BUTTON_SELECTOR
  );

  const $commentsPayloadUrl = document.querySelector<HTMLScriptElement>(
    COMMENTS_PAYLOAD_URL_SELECTOR
  );

  const $commentsContainer = document.querySelector<HTMLDivElement>(
    COMMENTS_CONTAINER_SELECTOR
  );

  const $userMenu = document.querySelector<HTMLLIElement>(USER_MENU_SELECTOR);

  const $authorLink = document.querySelector<HTMLAnchorElement>(
    AUTHOR_LINK_SELECTOR
  );

  const $thumbsUpButton = document.querySelector<HTMLSpanElement>(
    THUMBS_UP_SELECTOR
  ).parentElement as HTMLButtonElement;

  const $thumbsDownButton = document.querySelector<HTMLSpanElement>(
    THUMBS_DOWN_SELECTOR
  ).parentElement as HTMLButtonElement;

  const mrTitle = document.querySelector<HTMLTitleElement>(MR_TITLE_SELECTOR)
    .innerText;

  const projectId: string = window.location.href.split("/")[4];

  chrome.storage.local.get(
    [config.LOCAL_STORAGE_KEY],
    async (projects: { [storageKey: string]: TProjects }) => {
      const currentProject = projects[config.LOCAL_STORAGE_KEY][projectId];

      if (!currentProject || !currentProject.activated) return;

      const comments = new Comments(
        $commentArea,
        $commentButton,
        $commentsPayloadUrl,
        $commentsContainer,
        COMMENT_ITEM_SELECTOR
      );
      await comments.fetchComments();

      const approvers = new Approvers(
        $userMenu,
        $authorLink,
        currentProject.approvers
      );
      const discordNotifications = new DiscordNotifications(
        mrTitle,
        currentProject.discordWebHookUrl,
        approvers.getMe()
      );
      const thumbs = new Thumbs(
        $thumbsUpButton,
        $thumbsDownButton,
        THUMBS_COUNTER_SELECTOR
      );

      const app = new App(
        $mergeBarButtons,
        $mergeButton,
        comments,
        approvers,
        discordNotifications,
        thumbs
      );
      app.run();
    }
  );
};

init();
