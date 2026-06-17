import React from 'react';
import image from '../assets/image/origemjhanpoll.jpeg';
import GeometricBackground from './geometric-background';

interface ProfileProps {
	username: string;
	greeting: string;
	name: string;
	role: string;
	description: string;
	tags: string[];
	photoUrl: string;
	buttons: { text: string; url: string }[];
	flag: string;
	onClickFlag: () => void;
	children?: React.ReactNode;
}

const MOBILE_START_YEAR = 2019;

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
	const yearsOfExperience = new Date().getFullYear() - MOBILE_START_YEAR;
	const description = props.description.replace('{years}', String(yearsOfExperience));

	return (
		<section id='profile-section' className="relative flex flex-1 flex-col bg-[var(--color-card-bg)] rounded-3xl overflow-hidden">
			<div className="absolute z-0 top-0 w-full h-[45%] sm:h-[60%]">
				<img
					src={props.photoUrl || image}
					alt={`${props.name}'s profile`}
					className="w-full h-full object-cover object-bottom"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card-bg)] via-[var(--color-card-bg)]/50 to-[var(--color-card-bg)]/10"></div>
			</div>
			<GeometricBackground className="absolute inset-0 w-full h-full opacity-0 animate-[fadeIn_2s_ease-in_forwards]" />
			<div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-card-bg)] to-transparent pointer-events-none"></div>

			<div className='relative z-10 flex flex-1 flex-col md:items-start items-center justify-start text-[var(--color-text-primary)] font-sans md:text-start text-start md:overflow-y-auto p-4 md:p-6 2xl:p-8 sm:pt-48 pt-48'>
				<div className="flex flex-col justify-center items-center md:items-start mt-auto">
					<span className="text-md font-medium text-[var(--color-text-secondary)]">@{props.username}</span>
					<h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] md:text-start text-center">{props.greeting}</h2>
					<h1 className="text-3xl md:text-5xl font-bold mb-1 text-[var(--color-text-primary)] md:text-start text-center">{props.name}</h1>
				</div>
				<div className="my-4 break-words md:text-start text-center leading-tight">
					<span className="font-medium text-[var(--color-text-primary)] pr-1">
						{props.role}
					</span>
					<span className="font-light text-[var(--color-text-secondary)] leading-tight">
						{description}
					</span>
				</div>
				<div className="font-light flex flex-wrap gap-2 justify-center md:justify-start">
					{props.tags.map((tag, index) => (
						<span key={index} className="border border-[var(--color-text-secondary)]/30 font-light px-4 py-1.5 rounded-full text-sm backdrop-blur-sm text-[var(--color-text-secondary)]">{tag}</span>
					))}
				</div>
				{props.children && (
					<div className="flex md:hidden w-full flex-row items-center gap-4 pb-2 pt-10">
						{props.children}
					</div>
				)}
			</div>
			<div
				onClick={props.onClickFlag}
				className="absolute z-20 top-1 left-1 size-10 flex justify-center items-center p-0.5 border-[var(--color-card-bg)]/30 bg-[var(--color-text-secondary)]/30 rounded-full backdrop-blur-sm transition hover:scale-105 active:scale-95 cursor-pointer duration-300">
				<img
					src={props.flag}
					alt="flag"
					className="size-full rounded-full object-cover" />
			</div>

		</section>
	);
};

export default Profile;
