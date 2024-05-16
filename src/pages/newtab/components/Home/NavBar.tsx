import React, { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { To } from 'react-router-dom';
// import { Trans } from '@lingui/macro';
import { ChatBubbleLeftEllipsisIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import ChatNavIcon from '@assets/img/chat/NavIcon.png';
// import LogoIcon from '@assets/img/Vote.svg';
import clsx from 'clsx';
interface NavBarItemProps {
  title: string;
  to: To;
  active?: boolean;
  icon?: JSX.Element;
}
export const NavBarItem: FC<NavBarItemProps> = ({
  // active,
  icon,
  title,
  to,
}) => {
  const location = useLocation();
  const hash = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);
  const active = useMemo(() => {
    return hash === to;
  }, [hash, to]);

  return (
    <Link
      className={clsx('flex flex-col items-center justify-center', {
        'zm-text-title': active,
        ' zm-text-title': !active,
      })}
      to={to}>
      <div
        className={clsx('w-16 h-8 flex items-center justify-center rounded-2xl', {
          'zm-bg-card': active,
        })}>
        {icon}
      </div>
      <div className=" text-xs text-center font-semibold mt-1">{title}</div>
    </Link>
  );
};

export const ChatBarItem: FC<NavBarItemProps> = ({
  // active,
  // icon,
  title,
  to,
}) => {
  const location = useLocation();
  const hash = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);
  const active = useMemo(() => {
    return hash === to;
  }, [hash, to]);

  return (
    <Link
      className={clsx('flex flex-col items-center justify-center', {
        'zm-text-title': active,
        'zm-text-description': !active,
      })}
      to={to}>
      <div
        className={clsx('w-16 h-8 flex items-center justify-center rounded-2xl', {
          'zm-bg-card': active,
        })}>
        <img className="w-8 h-8" src={ChatNavIcon} alt="" />
      </div>
      <div className=" text-xs text-center font-semibold mt-1 text-[#48736F]">{title}</div>
    </Link>
  );
};

export default function NavBar() {
  return (
    <div className="h-full flex flex-col items-center zm-bg-card">
      <div className="p-2 mt-4">{/* <img className="w-8 h-8" src={LogoIcon} alt="" /> */}</div>
      <div className="mt-20 flex-grow flex flex-col items-center">
        <ChatBarItem title="Chat" to={'/chat'} icon={<ChatBubbleLeftEllipsisIcon className="h-4 w-4" />} />
      </div>
      <div className="flex flex-col mb-4">
        <NavBarItem title="Setting" to={'/chat'} icon={<Cog6ToothIcon className="h-6 w-6" />} />
      </div>
    </div>
  );
}
