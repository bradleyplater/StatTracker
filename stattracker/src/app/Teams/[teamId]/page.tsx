import TeamService from '@/services/teamService';
import '@/extensions/stringExtensions';

export default async function Page({ params }: { params: { teamId: string } }) {
    const team = await TeamService.FindTeamById(params.teamId);

    return (
        <>
            <div className="flex flex-col justify-center pt-2 text-gray-900 border-b">
                <h1 className="text-2xl font-bold text-center pb-2">
                    {team?.name.toTitleCase()}
                </h1>
            </div>
        </>
    );
}
