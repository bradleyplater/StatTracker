type LoginTextInputProps = {
    id: string;
    label: string;
    errors: string[] | undefined;
};

export default function LoginTextInput(props: LoginTextInputProps) {
    return (
        <>
            <div className="flex flex-col">
                <label htmlFor={props.id} className="text-base">
                    {props.label}
                </label>
                <input
                    type="text"
                    name={props.id}
                    className="bg-teal-900 bg-opacity-0 p-1 border-b-2 focus:outline focus:outline-gray-200 focus:rounded-sm focus:border-none"
                ></input>
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
