import React from 'react';
import { Button } from "~/components";

interface ListActionsProps {
  title: string;
  url: string;
  icon: React.ReactNode;
  isFull?: boolean;
  color?: string;
}

interface ActionsProps {
  listActions: ListActionsProps[];

}

export const Actions: React.FC<ActionsProps> = ({ listActions }) => {
  return (
    <section className="flex flex-row gap-4 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl font-sans p-6 2xl:p-8">
      {listActions.map((action, index) => (
        <Button
          key={index}
          onClick={() => window.open(action.url, '_blank')}
          isFull={action.isFull}
          color={action.color}
          icon={action.icon}
          label={action.title}
        />
      ))}
    </section>
  );
}

export default Actions;