import React, { useEffect, useState } from 'react';
import localImage from '../assets/local_image_1.png';

interface LocalProps {
	address?: string;
}

export const Local: React.FC<LocalProps> = ({ address }) => {
	const [timeString, setTimeString] = useState<string>("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

			const offset = -now.getTimezoneOffset() / 60;
			const sign = offset >= 0 ? '+' : '-';
			const gmt = `GMT${sign}${Math.abs(offset)}`;

			setTimeString(`${time} ${gmt} Horario Local`);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative overflow-hidden bg-[var(--color-card-bg)] rounded-3xl">
			<div className="relative z-10 flex flex-col justify-center text-[var(--color-text-primary)] p-6">
				{address && <h1 className='text-lg font-semibold'>{address}</h1>}
				<p className='text-[var(--color-text-secondary)] text-sm font-sans'>
					{timeString}
				</p>
			</div>
			<img
				src={localImage}
				alt="Image local"
				className="absolute right-0 top-0 w-[80%] h-full object-cover opacity-50 invert dark:invert-0"
			/>
			<div className="absolute top-1/2 right-[20%] -translate-y-1/2 flex items-center justify-center">
				<span className="relative flex size-8 items-center justify-center">
					<span className="animate-ping absolute inline-flex size-8 rounded-full bg-[var(--color-primary)] opacity-75"></span>
					<span className="absolute inline-flex size-16 rounded-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_80%)] opacity-20"></span>
					<span className="relative inline-flex rounded-full size-4 bg-[var(--color-primary)]"></span>
				</span>
			</div>
		</section >
	);
};

export default Local;