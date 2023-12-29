'use client';

import EnumSelect from '@/Components/EnumSelect';
import LoginTextInput from '@/Components/LoginTextInput';
import SubmitButton from '@/Components/SubmitButton';
import { createPlayerInDb } from '@/actions/playerActions';
import { ShootingSide } from '@/enums/ShootingSide';
import { useFormState } from 'react-dom';

export default function CreatePlayer() {
    const [state, formAction] = useFormState(createPlayerInDb, null);

    return (
        <>
            <div className="col-span-8 h-screen flex justify-center items-center bg-[url('/hockeyPlayers.jpg')] bg-center bg-cover">
                <div className="bg-gray-700 bg-opacity-90 text-gray-200 p-10 rounded-xl flex flex-col gap-8">
                    <div>
                        <p className="text-2xl font-bold">
                            Looks like its your first time...
                        </p>
                        <p className="text-lg">Lets complete your profile!</p>
                    </div>

                    <form action={formAction} className="flex flex-col gap-4">
                        <LoginTextInput
                            id="firstname"
                            label="First Name"
                            errors={state?.errors.firstName}
                        />
                        <LoginTextInput
                            id="surname"
                            label="Surname"
                            errors={state?.errors.surname}
                        />
                        <EnumSelect
                            name="shootingSide"
                            enum={ShootingSide}
                            errors={state?.errors.shootingSide}
                        />
                        <SubmitButton />
                    </form>
                </div>
            </div>
        </>
    );
}
