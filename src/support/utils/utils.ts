export function coerceToBoolean(value: unknown): boolean {
    return value != null && `${value}` !== 'false';
}

export async function skipOn(flag: boolean, callback: () => Promise<void>): Promise<void> {
    if (!flag) {
        return callback();
    }
    return;
}

export async function onlyOn(flag: boolean, callback: () => Promise<void>): Promise<void> {
    if (flag) {
        return callback();
    }
    return;
}