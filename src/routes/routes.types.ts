import { State } from "../../types/general";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    HomeTabs: {latitude: string, longitude: string, address: string};
    ForgotPWD: undefined;
    ChangePWD: {id: string, token: string};
    Safeplace: {id: string};
    InputAddress: { 
        latitude: number,
        longitude: number,
        mapState: {setter: (val: State) => void},
        routingInputs: {
            origin: { value: string, setter: (input: string) => void },
            destination: { value: string, setter: (input: string) => void }
        },
        inputToModify: string
    };
};