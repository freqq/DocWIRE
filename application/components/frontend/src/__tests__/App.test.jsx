import React from 'react';
import App from 'App';
import { shallow } from 'enzyme';

describe('App', () => {
  it('should be rendered', () => {
    const component = shallow(<App />);
    expect(component).toBeDefined();
  });
});
