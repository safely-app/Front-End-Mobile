export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    HomeTabs: {latitude: string, longitude: string, address: string};
    ForgotPWD: undefined;
    ChangePWD: {id: string, token: string};
    Safeplace: {id: string};
    InputAddress: { latitude: number, longitude: number };
};