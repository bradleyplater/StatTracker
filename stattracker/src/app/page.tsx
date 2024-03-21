import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { Ceviche_One } from 'next/font/google';

const cevicheOne = Ceviche_One({ weight: '400', subsets: ['latin'] });

export default async function Home() {
    const session = await getSession();

    return (
        <>
            <div className="text-slate-900 flex justify-center p-5">
                <div className="flex flex-col justify-center mt-5">
                    <div></div>
                    <p className="text-xl">Welcome to</p>
                    <div className="bg-teal-900 p-5 rounded-lg text-center">
                        <span
                            className={`${cevicheOne.className} text-teal-100 text-5xl`}
                        >
                            Stat Tracker
                        </span>
                    </div>
                    <p className="pt-3 text-base">
                        The not so elite prospects for recreational hockey
                        players!
                    </p>
                    <p className="pt-3 text-base">
                        To get started, login and create an account. Then get
                        your manager to add you to the team!
                    </p>
                    <p className="pt-3 text-base">
                        From there you will be able to see all of your stats and
                        games for the teams your added too!
                    </p>
                </div>
            </div>
        </>
    );
}
