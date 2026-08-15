interface Connection {

    Connected: boolean;


    Disconnect(): void;
    disconnect(): void;
    Reconnect(): void;
    reconnect(): void;
}


type SignalCallback = (...args: any[]) => any;

type SignalGeneric = SignalCallback | defined[] | defined;


type GetSignalCallback<T extends SignalGeneric> = T extends SignalCallback

    ? T

    : T extends defined[]

    ? (...args: T) => void

    : T extends defined

    ? (arg: T) => void

    : () => void;


type SignalParams<T extends SignalCallback> = T extends (...args: infer U) => any ? U : never;


interface Signal<T extends SignalGeneric = () => void> {

    Connect(callback: GetSignalCallback<T>): Connection;
    connect(callback: GetSignalCallback<T>): Connection;
    Once(callback: GetSignalCallback<T>): Connection;
    once(callback: GetSignalCallback<T>): Connection;
    Wait(): SignalParams<GetSignalCallback<T>>;
    wait(): SignalParams<GetSignalCallback<T>>;
    Fire(...args: SignalParams<GetSignalCallback<T>>): void;
    fire(...args: SignalParams<GetSignalCallback<T>>): void;
    DisconnectAll(): void;
    disconnectAll(): void;
    Destroy(): void;
    destroy(): void;
}


interface SignalConstructor {

    is: <T extends SignalGeneric = (...args: any[]) => void>(val: unknown) => val is Signal<T>;

    wrap: <T extends Callback>(signal: RBXScriptSignal<T>) => Signal<T>;

    new <T extends SignalGeneric = () => void>(): Signal<T>;

}


declare const Signal: SignalConstructor;


export default Signal;

export { Signal, Connection, GetSignalCallback };