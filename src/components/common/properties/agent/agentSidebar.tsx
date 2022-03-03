import React, { FC } from 'react';
import { timeSince } from '../../dateFunction';

interface IProps {
  agent: {
    username?: string;
    phone?: number;
    verified?: boolean;
    createdAt: number;
    image?: {
      url: string;
    };
  };
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
          <p className="my-2">Joined: {timeSince(new Date(agent.createdAt))}</p>
          <p className="my-2">
            Status:{' '}
            {agent.verified ? (
              <span>
                Verified
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="25"
                  height="25"
                  viewBox="0 0 172 172"
                  className="inline-block mb-1 ml-2"
                >
                  <g
                    fill="none"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                  >
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g>
                      <path
                        d="M86,7.16667l16.1465,18.02058l23.27017,-7.27058l5.24958,23.41708l23.41708,5.24958l-7.16667,23.27017l17.91667,16.1465l-17.91667,16.1465l7.16667,23.27017l-23.41708,5.24958l-5.24958,23.41708l-23.27017,-7.27058l-16.1465,18.02058l-16.1465,-18.02058l-23.27017,7.27058l-5.24958,-23.41708l-23.41708,-5.24958l7.16667,-23.27017l-17.91667,-16.1465l17.91667,-16.1465l-7.16667,-23.27017l23.41708,-5.24958l5.24958,-23.41708l23.27017,7.27058z"
                        fill="#2ecc71"
                      ></path>
                      <path
                        d="M123.9905,52.32383l-48.7405,48.72258l-20.07383,-20.0595l-10.02258,10.02258l30.09642,30.11075l58.7595,-58.77383z"
                        fill="#ffffff"
                      ></path>
                    </g>
                  </g>
                </svg>
              </span>
            ) : (
              'Not verified'
            )}
          </p>
          <p className="my-2">Total Ads: {totalCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentSidebar;
