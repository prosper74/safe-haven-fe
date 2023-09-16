import React, { FC } from 'react';
import { timeSince } from '../../dateFunction';
import { userProps } from '../../interfaces';
import { VerifiedIcon } from '../../svgIcons';

interface IProps {
  agent: userProps;
  totalCount?: number;
}

const AgentSidebar: FC<IProps> = ({ agent, totalCount }) => {
  return (
    <div className="sticky top-24 mb-6">
      <div className="py-2 px-4 rounded-xl shadow-md bg-purple-100">
        <img
          src={agent.image ? agent.image.url : '/logoIcon.svg'}
          alt={agent.username}
          className="w-40 h-40 mt-6 rounded-full object-cover"
        />
        <div className="my-4 text-lg text-gray-700">
          <p className="my-2 capitalize">Name: {agent.username}</p>
          <p className="my-2">
            Number: <a href={`tel:+234${agent.phone}`}>+234 {agent.phone}</a>
          </p>
          <p className="my-2">
            Joined: {timeSince(new Date(agent.createdAt))} ago
          </p>
          <p className="my-2">
            Status:{' '}
            {agent.verified ? (
              <span>
                Verified
                <VerifiedIcon />
              </span>
            ) : (
              'Not verified'
            )}
          </p>
          <p className="my-2">Active Ads: {totalCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentSidebar;
