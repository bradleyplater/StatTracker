import { ChevronRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

type ProfileSidebarLinkProps = {
    statsToShow: string;
    label: string;
    isActive: boolean;
};

export default function ProfileSidebarLink(
    props: ProfileSidebarLinkProps,
    searchParams: ReadonlyURLSearchParams
) {
    return (
        <>
            <Link
                href={`Profile?Stats=${props.statsToShow}`}
                passHref
                legacyBehavior
            >
                <a
                    className={`flex flex-row justify-between w-full p-2 rounded-md cursor-pointer hover:bg-teal-500 hover:font-bold ${
                        props.isActive ? 'bg-teal-500 font-bold' : 'bg-teal-100'
                    }`}
                >
                    {props.label}
                    <ChevronRightIcon className="w-6 h-6" />
                </a>
            </Link>
        </>
    );
}
