export function getNumericEnumKeys<
    T extends string,
    TEnumValue extends string | number
>(enumVariable: { [key in T]: TEnumValue }) {
    return Object.keys(enumVariable).filter((value) =>
        isNaN(Number(value))
    ) as Array<T>;
}
