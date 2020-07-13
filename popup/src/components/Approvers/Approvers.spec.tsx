import React from 'react';
import renderer from 'react-test-renderer';

import { Approvers } from './Approvers.component';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// @ts-ignore
jest.mock('react-navigation', () => ({ withNavigation: component => component }));

describe('Approvers', () => {
  it('snapshot test', async () => {
    const tree = renderer.create(<Approvers />).toJSON();
    await sleep(1);
    expect(tree).toMatchSnapshot();
  });
});
