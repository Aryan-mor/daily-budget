export type ReturnType<StorageValueType, StorageDefaultValueType> = [
        StorageValueType | StorageDefaultValueType,
    (newStorageValue: StorageValueType) => void,
    () => void,
];

export type StorageContextType = {
    set: (key: string, value?: string) => void;
    get: (key: string) => string | undefined;
};
