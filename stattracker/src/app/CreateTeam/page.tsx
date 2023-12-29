'use client';
import SubmitButton from '@/Components/SubmitButton';
import { createTeamInDb } from '@/actions/teamActions';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export default function CreateTeam() {
    const [state, formAction] = useFormState(createTeamInDb, null);

    return (
        <>
            <div className="flex flex-col gap-4 p-5 text-gray-900">
                <div>
                    <h1 className="text-2xl font-bold text-center">
                        Create Team
                    </h1>
                    <h2 className="text-sm text-gray-600 text-center">
                        All we need right now is a name, you can edit any other
                        details in the team portal
                    </h2>
                </div>

                <form
                    action={formAction}
                    className="flex flex-col gap-2 justify-center"
                >
                    <div className="flex justify-center gap-2">
                        <label className="text-base">Team Name:</label>
                        <input
                            type="text"
                            name="teamName"
                            className="border-b  border-slate-500"
                        ></input>
                        {state?.errors ? (
                            state.errors.name?.map((error, key) => {
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
                    <div className="text-slate-100 flex justify-center">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </>
    );
}
