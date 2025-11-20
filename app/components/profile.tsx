import React from 'react';

interface ProfileProps {
	username: string;
	name: string;
	role: string;
	description: string;
	tags: string[];
	photoUrl?: string;
}


const Profile: React.FC<ProfileProps> = ({
	username,
	name,
	role,
	description,
	tags,
	photoUrl
}) => {
	return (
		<section className="flex flex-1 flex-col md:items-start items-center bg-[var(--color-card-bg)] text-[var(--color-text-primary)] p-4 rounded-3xl font-sans md:text-start text-start overflow-y-auto">
			<div className="flex flex-shrink-0">
				{photoUrl ? (
					<img
						src={photoUrl}
						alt={`${name}'s profile`}
						className="w-30 h-30 rounded-full object-cover bg-[var(--color-tag-bg)]"
					/>
				) : (
					<div className="w-30 h-30 rounded-full bg-[var(--color-tag-bg)]" />
				)}
			</div>
			<div className="flex flex-col justify-center items-center md:items-start mt-4">
				<span className="text-sm text-[var(--color-text-secondary)]">@{username}</span>
				<h1 className="text-2xl my-1">Hello! I'm {name}</h1>
				<h2 className="text-xl text-[var(--color-text-secondary)]">{role}</h2>
			</div>
			<p className="my-4 leading-relaxed break-words md:text-start text-center">{description}</p>
			<div className="flex flex-wrap gap-2 justify-center md:justify-start">
				{tags.map((tag, index) => (
					<span key={index} className="bg-[var(--color-tag-bg)] px-4 py-2 rounded-full text-sm">{tag}</span>
				))}
			</div>
			<div className="flex md:hidden w-full flex-row justify-center items-center gap-4 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl font-sans h-14 mt-6 mb-2">
				<button className="w-full bg-white text-black font-semibold px-8 py-3 rounded-full transition hover:bg-neutral-200">
					Contact me
				</button>
				<button className="bg-neutral-700 text-white font-medium px-8 py-3 rounded-full transition hover:bg-neutral-600">
					CV
				</button>
			</div>
		</section>
	);
};

export default Profile;