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

  it('should edit my informations', async () => {
    await element(by.id('ProfilePage')).tap();
    await element(by.id('inputEmail')).clearText();
    await element(by.id('inputEmail')).typeText('ios2@test.fr');
    await element(by.id('inputPassword')).clearText();
    await element(by.id('inputPassword')).typeText('12345');
    await element(by.id('inputConfirmPassword')).clearText();
    await element(by.id('inputConfirmPassword')).typeText('12345');
    await element(by.id('buttonSubmit')).tap();
    await element(by.id('HomePage')).tap();
    await element(by.id('buttonLogout')).tap();
    await expect(element(by.id('title'))).toBeVisible();
    await element(by.id('inputUsername')).typeText('ios2@test.fr');
    await element(by.id('inputPassword')).typeText('12345');
    await element(by.text('Login')).tap();
    await expect(element(by.id('welcomeTitle'))).toBeVisible();
  });

  it('should reverse my previous edit of my informations', async () => {
    await element(by.id('ProfilePage')).tap();
    await element(by.id('inputEmail')).clearText();
    await element(by.id('inputEmail')).typeText('ios@test.fr');
    await element(by.id('inputPassword')).clearText();
    await element(by.id('inputPassword')).typeText('1234');
    await element(by.id('inputConfirmPassword')).clearText();
    await element(by.id('inputConfirmPassword')).typeText('1234');
    await element(by.id('buttonSubmit')).tap();
    await element(by.id('HomePage')).tap();
    await element(by.id('buttonLogout')).tap();
    await expect(element(by.id('title'))).toBeVisible();
    await element(by.id('inputUsername')).typeText('ios@test.fr');
    await element(by.id('inputPassword')).typeText('1234');
    await element(by.text('Login')).tap();
    await expect(element(by.id('welcomeTitle'))).toBeVisible();
  });

  it('should logout succesfully', async () => {
    await element(by.id('HomePage')).tap();
    await element(by.id('buttonLogout')).tap();
    await expect(element(by.id('title'))).toBeVisible();
  });

  it('should register succesfully and delete the account', async () => {
    await element(by.id('buttonRegister')).tap();

    await element(by.id('inputUsername')).clearText();
    await element(by.id('inputUsername')).typeText('barbie');
    await element(by.id('inputEmail')).clearText();
    await element(by.id('inputEmail')).typeText('barbie@ken.fr');
    await element(by.id('inputPassword')).clearText();
    await element(by.id('inputPassword')).typeText('1234');
    await element(by.id('inputConfirmPassword')).clearText();
    await element(by.id('inputConfirmPassword')).typeText('1234');
    await element(by.id('buttonRegister')).tap();

    await expect(element(by.id('welcomeTitle'))).toBeVisible();
    await element(by.id('ProfilePage')).tap();
    await element(by.id('buttonDeleteAccount')).tap();
    await expect(element(by.id('title'))).toBeVisible();

    await element(by.id('inputUsername')).typeText('barbie@ken.fr');
    await element(by.id('inputPassword')).typeText('1234');
    await element(by.text('Login')).tap();
    await expect(element(by.id('title'))).toBeVisible();
  })
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
