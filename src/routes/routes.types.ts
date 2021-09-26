export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    HomeTabs: undefined;
    ForgotPWD: undefined;
    ChangePWD: {id: string, token: string};
    Safeplace: {id: string};
};