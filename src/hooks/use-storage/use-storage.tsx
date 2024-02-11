import {createContext, FunctionComponent, useCallback, useContext, useMemo, useState,} from 'preact/compat';
import {h} from 'preact'
import {ReturnType, StorageContextType} from './use-storage-interface';

export const useStorage = <Storage, StorageDefault>(
    storageKey: string,
    defaultValue: Storage | StorageDefault,
) => {
    const {set, get} = useContext(StorageContext);

    const storage = useMemo(() => {
        const res = get(storageKey);
        if (res) {
            return JSON.parse(res) as Storage;
        }
        return defaultValue;
    }, [get, defaultValue, storageKey]);

    const onChange = useCallback(
        (newStorageValue: Storage) => {
            set(storageKey, JSON.stringify(newStorageValue));
        },
        [set, storageKey],
    );

    const onRemove = useCallback(() => {
        localStorage.removeItem(storageKey);
        set(
            storageKey,
            defaultValue === undefined ? undefined : JSON.stringify(defaultValue),
        );
    }, [defaultValue, set, storageKey]);

    return [storage, onChange, onRemove] as ReturnType<
        Storage,
        Storage | typeof defaultValue
    >;
};

const StorageContext = createContext<StorageContextType>({} as StorageContextType);
const StorageWrapper: FunctionComponent = ({children}) => {
    const [storage, setStorage] = useState<Record<string, string>>({});

    const get = useCallback(
        (key: string) => {
            if (storage[key]) {
                return storage[key];
            }
            const value = localStorage.getItem(key);
            if (value) {
                setStorage({...storage, [key]: value});
                return value;
            }
            return undefined;
        },
        [storage],
    );

    const set = useCallback(
        (key: string, value?: string) => {
            if (storage[key] === value) return;

            if (value === undefined) localStorage.removeItem(key);
            else localStorage.setItem(key, value);

            setStorage((storageData) => {
                const newStorageData = {...storageData};
                if (value === undefined) delete newStorageData[key];
                else newStorageData[key] = value;
                return {...newStorageData};
            });
        },
        [storage],
    );

    const value = useMemo(
        () => ({
            set,
            get,
        }),
        [set, get],
    );

    return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
};
export default StorageWrapper;
