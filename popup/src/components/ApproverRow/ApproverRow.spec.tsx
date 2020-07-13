import React from 'react';
import renderer from 'react-test-renderer';

import { ApproverRow } from './ApproverRow.component';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// @ts-ignore
jest.mock('react-navigation', () => ({ withNavigation: component => component }));

describe('ApproverRow', () => {
  it('snapshot test', async () => {
    const tree = renderer.create(<ApproverRow />).toJSON();
    await sleep(1);
    expect(tree).toMatchSnapshot();
  });
});
