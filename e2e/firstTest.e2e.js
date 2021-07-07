describe('SafelyMobileApp', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have login screen', async () => {
    await expect(element(by.id('title'))).toBeVisible();
  });

  it('should login successfully', async () => {
    await element(by.id('inputUsername')).typeText('ios@test.fr');
    await element(by.id('inputPassword')).typeText('1234');
    await element(by.text('Login')).tap();
    await expect(element(by.id('welcomeTitle'))).toBeVisible();
  });

  it('should logout succesfully', async () => {
    await element(by.id('buttonLogout')).tap();
    await expect(element(by.id('title'))).toBeVisible();
  });
});

// import React from 'react';
// import {fireEvent, render} from '@testing-library/react-native';
// import App from '../';

// test('render login container properly', () => {
//   const {debug, getByTestId, getByText} = render(<App />);
//   // const input = getByTestId('inputUsername');
//   // const title = getByTestId('title')

//   // fireEvent.changeText(input, 'testsafelymobile@gmail.com');
//   // expect(title).toBeVisible();
// });
