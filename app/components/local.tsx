import React from 'react';

interface LocalProps {
    address?: string;
    description?: string;
}

export const Local: React.FC<LocalProps> = ({ address, description }) => {
    return (
        <section className="flex flex-col justify-center bg-[var(--color-card-bg)] text-[var(--color-text-primary)] p-5 rounded-3xl font-sans">
            {address && <p>{address}</p>}
            {description && <p className='text-[var(--color-text-secondary)]'>{description}</p>}
        </section>
    );
};

export default Local;