/* global it */
/* eslint-disable no-undef */

import React from 'react';
import { shallow } from 'enzyme';
import App, { shuffle } from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('should update contestant state when text is inputted', () => {
  const wrapper = shallow(<App />);
  const input = wrapper.find('input');
  input.simulate('change', { target: { value: 'Bob' } });

  expect(wrapper).toHaveState('contestant', 'Bob');
});

it('should add the the contestants state when "Add" button is pressed', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ contestant: 'Bob' });

  const addButton = wrapper.find('#addBtn');
  addButton.simulate('click');

  expect(wrapper).toHaveState('contestants', ['Bob']);
});

it("shouldn't add a contestant if the input is blank", () => {
  const wrapper = shallow(<App />);
  const addButton = wrapper.find('#addBtn');

  addButton.simulate('click');

  expect(wrapper).toHaveState('contestants', []);
});

it("shouldn't be able to add the same contestant twice", () => {
  const wrapper = shallow(<App />);
  const addButton = wrapper.find('#addBtn');

  wrapper.setState({ contestants: ['Bob'], contestant: 'Bob' });
  addButton.simulate('click');
  
  expect(wrapper).toHaveState('contestants', ['Bob']);

  wrapper.setState({ contestants: ['Bob'], contestant: 'bob' });
  addButton.simulate('click');
  
  expect(wrapper).toHaveState('contestants', ['Bob']);
});

it('should render all of the added contestants', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ contestants: ['Bob', 'Bill', 'Ben'] });

  expect(wrapper.find('li')).toHaveLength(3);
});

it('should choose 3 random winners on Draw button click', () => {
  const wrapper = shallow(<App />);
  const drawBtn = wrapper.find('#drawBtn');
  const contestants = ['Bob', 'Bill', 'Ben', 'Jackie', 'Jill', 'Guy', 'Frank', 'Dude'];
  
  wrapper.setState({
    contestants,
  });

  drawBtn.simulate('click');

  const winners = wrapper.state().winners;
  
  expect(winners.length).toEqual(3);
  expect(winners).not.toEqual(contestants.slice(0, 3));
});

it('should display 3 winners on Draw button click', () => {
  const wrapper = shallow(<App />);
  const drawBtn = wrapper.find('#drawBtn');
  const contestants = ['Bob', 'Bill', 'Ben', 'Jackie', 'Jill', 'Guy', 'Frank', 'Dude'];
  
  wrapper.setState({
    contestants,
  });

  drawBtn.simulate('click');

  expect(wrapper.find('.winner')).toHaveLength(3);
});

/* Test for Fisher-Yates shuffle algo */
it('should shuffle a list', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffledArr = shuffle(arr);

  expect(shuffledArr).not.toEqual(arr);
});
