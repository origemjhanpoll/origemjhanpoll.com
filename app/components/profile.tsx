import React from 'react';
import localImage from '../assets/jeanpaul.jpeg';

interface ProfileProps {
	username: string;
	name: string;
	role: string;
	description: string;
	tags: string[];
	photoUrl: string;
	buttons: { text: string; url: string }[];
}


const Profile: React.FC<ProfileProps> = ({
	username,
	name,
	role,
	description,
	tags,
	photoUrl,
	buttons
}) => {
	return (
		<section className="relative flex flex-1 flex-col bg-[var(--color-card-bg)] rounded-3xl overflow-hidden">
			<div className="absolute top-0 w-full h-[45%] sm:h-[60%]">
				<img
					src={photoUrl || localImage}
					alt={`${name}'s profile`}
					className="w-full h-full object-cover object-bottom"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card-bg)] via-[var(--color-card-bg)]/50 to-[var(--color-card-bg)]/10">
				</div>
			</div>
			<div className='relative z-10 flex flex-1 flex-col md:items-start items-center justify-end text-[var(--color-text-primary)] font-sans md:text-start text-start overflow-y-auto p-4 md:p-6 pt-40 md:pt-48'>
				<div className="flex flex-col justify-center items-center md:items-start mt-4">
					<span className="text-sm font-medium text-[var(--color-text-secondary)]">@{username}</span>
					<h1 className="text-4xl md:text-6xl font-bold my-1 text-[var(--color-text-primary)] md:text-start text-center">{name}</h1>
					<h2 className="text-xl text-[var(--color-text-secondary)]">{role}</h2>
				</div>
				<p className="my-4 leading-relaxed break-words md:text-start text-center text-[var(--color-text-primary)]">{description}</p>
				<div className="flex flex-wrap gap-2 justify-center md:justify-start">
					{tags.map((tag, index) => (
						<span key={index} className="border border-[var(--color-text-secondary)]/30  px-4 py-1.5 rounded-full text-sm backdrop-blur-sm text-[var(--color-text-secondary)]">{tag}</span>
					))}
				</div>
				<div className="flex md:hidden w-full flex-row justify-center items-center gap-4 mt-6 mb-2">
					{buttons.map((button, index) => (
						<a
							key={index}
							href={button.url}
							className={`font-semibold px-8 py-3 rounded-full transition text-center ${index === 0
								? "w-full bg-[var(--color-primary)] text-[var(--color-card-bg)]"
								: "bg-[var(--color-primary)]/20	 text-[var(--color-text-primary)] font-medium"
								}`}
						>
							{button.text}
						</a>
					))}
				</div>
			</div>
		</section>
	);
};

export default Profile;