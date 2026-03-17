import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { PayloadMedia } from '../../types/payload';

export interface TeamMember {
  name: string;
  role: string;
  photo?: string | PayloadMedia;
  bio?: string;
  socials?: { label: string; href: string; icon: ReactNode }[];
}

export interface TeamGridProps {
  members: TeamMember[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const colClasses = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' };

export function TeamGrid({ members, columns = 3, className }: TeamGridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-8', colClasses[columns], className)}>
      {members.map((member, i) => {
        const photoUrl = typeof member.photo === 'string' ? member.photo : member.photo?.url;
        return (
          <div key={i} className="text-center">
            {photoUrl && (
              <img src={photoUrl} alt={member.name} className="mx-auto h-32 w-32 rounded-full object-cover mb-4" loading="lazy" />
            )}
            <h3 className="text-heading-sm font-heading font-semibold text-foreground">{member.name}</h3>
            <p className="text-body-sm text-primary">{member.role}</p>
            {member.bio && <p className="mt-2 text-body-sm text-muted-foreground max-w-xs mx-auto">{member.bio}</p>}
            {member.socials && member.socials.length > 0 && (
              <div className="mt-3 flex justify-center gap-2">
                {member.socials.map((s, si) => (
                  <a key={si} href={s.href} aria-label={s.label} className="text-muted-foreground hover:text-foreground transition-colors">
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
