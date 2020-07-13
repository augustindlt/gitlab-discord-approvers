import React from 'react';
import renderer from 'react-test-renderer';

import { WebhookDiscord } from './WebhookDiscord.component';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// @ts-ignore
jest.mock('react-navigation', () => ({ withNavigation: component => component }));

describe('WebhookDiscord', () => {
  it('snapshot test', async () => {
    const tree = renderer.create(<WebhookDiscord />).toJSON();
    await sleep(1);
    expect(tree).toMatchSnapshot();
  });
});
