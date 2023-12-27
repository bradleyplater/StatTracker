import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { ReadonlyURLSearchParams, redirect } from 'next/navigation';
import PlayerService from '@/services/playerService';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import ProfileSidebarLink from '@/Components/ProfileSidebarLink';
import { PageProps } from '@/types/GenericTypes';
import StatsPanel from '@/Components/StatsPanel';

// TRYING TO GET QUERY PARAMS TO MAKE ACTIVE STATES ON BUTTONS

export default async function Profile(pageProps: PageProps) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    var response = await PlayerService.GetPlayerByUserId(session.user.id);

    if (response === null) {
        redirect('/CreatePlayer');
    }

    return (
        <>
            <div className="flex flex-1">
                <div className="flex flex-col px-5 text-gray-900 border-r-2">
                    <h1 className="mb-4 text-3xl font-bold">
                        4 {response.firstName} {response.surname}
                    </h1>
                    <br></br>
                    <div className="flex flex-col place-content-center gap-4">
                        <div className="bg-teal-100 p-3 rounded-xl flex flex-col">
                            <h2 className="text-xl self-center font-bold">
                                About
                            </h2>
                            <p>
                                <strong>Nationality: </strong>England
                            </p>
                            <p>
                                <strong>Shoots: </strong>
                                {response.shootingSide.toString()}
                            </p>
                            <p>
                                <strong>Age</strong>: 23
                            </p>
                        </div>
                        <div className="flex flex-col justify-center gap-4">
                            <ProfileSidebarLink
                                statsToShow="overall"
                                label="Overall"
                                isActive={
                                    pageProps.searchParams &&
                                    pageProps.searchParams != undefined &&
                                    pageProps.searchParams.Stats == 'overall'
                                        ? true
                                        : false
                                }
                            ></ProfileSidebarLink>
                            <ProfileSidebarLink
                                statsToShow="warriors"
                                label="Warriors"
                                isActive={
                                    pageProps.searchParams &&
                                    pageProps.searchParams != undefined &&
                                    pageProps.searchParams.Stats == 'warriors'
                                        ? true
                                        : false
                                }
                            ></ProfileSidebarLink>
                            <ProfileSidebarLink
                                statsToShow="preds"
                                label="Pred"
                                isActive={
                                    pageProps.searchParams &&
                                    pageProps.searchParams != undefined &&
                                    pageProps.searchParams.Stats == 'preds'
                                        ? true
                                        : false
                                }
                            ></ProfileSidebarLink>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-5 text-gray-900 overflow-y-auto">
                    <StatsPanel />
                </div>
            </div>
        </>
    );
}
