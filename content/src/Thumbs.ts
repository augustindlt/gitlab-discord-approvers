export class Thumbs {
  $thumbsUpButton: HTMLButtonElement;
  $thumbsDownButton: HTMLButtonElement;
  counterSelector: string;

  public constructor(
    $thumbsUpButton: HTMLButtonElement,
    $thumbsDownButton: HTMLButtonElement,
    counterSelector: string
  ) {
    this.$thumbsUpButton = $thumbsUpButton;
    this.$thumbsDownButton = $thumbsDownButton;
    this.counterSelector = counterSelector;
  }

  public setApprove = (approved: boolean) => {
    if (approved && !this.isThumbActive(this.$thumbsUpButton)) {
      return this.$thumbsUpButton.click();
    }
    if (this.isThumbActive(this.$thumbsDownButton)) return;
    this.$thumbsDownButton.click();
  };

  private isThumbActive = ($button: HTMLButtonElement) => {
    const $thumbsCount = $button.querySelector<HTMLSpanElement>(
      this.counterSelector
    );
    return $thumbsCount && parseInt($thumbsCount.innerText) > 0;
  };
}
