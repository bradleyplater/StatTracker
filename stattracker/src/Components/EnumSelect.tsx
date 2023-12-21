import { getNumericEnumKeys } from '@/Helpers/enumHelpers';
import { ShootingSide } from '@/enums/ShootingSide';

type EnumSelectProps<T extends string, TEnumValue extends string | number> = {
    name: string;
    enum: { [key in T]: TEnumValue };
    errors: string[] | undefined;
};

export default function EnumSelect<
    T extends string,
    TEnumValue extends string | number
>(props: EnumSelectProps<T, TEnumValue>) {
    return (
        <>
            <div className="flex flex-col">
                <label htmlFor={props.name}>Shoots</label>
                <select
                    name={props.name}
                    className="bg-gray-900 bg-opacity-0 p-1 border-b-2 cursor-pointer"
                >
                    {getNumericEnumKeys(props.enum).map((key, index) => {
                        return (
                            <option
                                className="bg-gray-900 cursor-pointer"
                                key={index}
                                value={props.enum[key] as number}
                            >
                                {key}
                            </option>
                        );
                    })}
                </select>
                {props.errors ? (
                    props.errors.map((error, key) => {
                        return (
                            <p
                                className="text-red-500 text-opacity-100"
                                key={key}
                            >
                                {error}
                            </p>
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
