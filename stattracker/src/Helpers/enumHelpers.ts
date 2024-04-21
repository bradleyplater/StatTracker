export function getNumericEnumKeys<
    T extends string,
    TEnumValue extends string | number
>(enumVariable: { [key in T]: TEnumValue }) {
    return Object.keys(enumVariable).filter((value) =>
        isNaN(Number(value))
    ) as Array<T>;
}

export function createEnumOptions<
    T extends string,
    TEnumValue extends string | number
>(enumVariable: { [key in T]: TEnumValue }): {
    value: string;
    label: string;
}[] {
    let options: { value: string; label: string }[] = [];

    getNumericEnumKeys(enumVariable).map((key, index) => {
        options.push({
            value: key,
            label: (enumVariable[key] as string).toTitleCase(),
        });
    });

    return options;
}
