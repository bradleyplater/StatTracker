import TeamService from '@/services/teamService';
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import '@/extensions/stringExtensions';

export default async function Teams() {
    const teams = await TeamService.GetAllTeams();

    return (
        <>
            <div className="flex flex-col justify-center pt-2 text-gray-900 divide-y border-b">
                <h1 className="text-2xl font-bold text-center pb-2">Teams</h1>
                <Link
                    href="/CreateTeam"
                    className="w-full p-2 flex justify-between items-center bg-emerald-400"
                >
                    Create New Team <PlusIcon className="w-6 h-6" />
                </Link>
                {teams.map((team) => {
                    return (
                        <Link
                            key={team.id}
                            href={`/Teams/${team.id}`}
                            className="w-full p-2 flex justify-between items-center"
                        >
                            {team.name.toTitleCase()}
                            <ChevronRightIcon className="w-6 h-6" />
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
