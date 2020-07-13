import React from 'react';
import renderer from 'react-test-renderer';

import { ApproverFrom } from './ApproverFrom.component';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// @ts-ignore
jest.mock('react-navigation', () => ({ withNavigation: component => component }));

describe('ApproverFrom', () => {
  it('snapshot test', async () => {
    const tree = renderer.create(<ApproverFrom />).toJSON();
    await sleep(1);
    expect(tree).toMatchSnapshot();
  });
});
