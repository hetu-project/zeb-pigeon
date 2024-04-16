import React, { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { To } from 'react-router-dom';
// import { Trans } from '@lingui/macro';
import { ChatBubbleLeftEllipsisIcon, IdentificationIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useMessageCount } from '@root/src/shared/hooks/accounts';
interface NavBarItemProps {
  title: string;
  to: To;
  active?: boolean;
  icon?: JSX.Element;
  markCount?: number;
}
export const NavBarItem: FC<NavBarItemProps> = ({
  // active,
  icon,
  title,
  to,
  markCount,
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
      replace
      to={to}>
      <div
        className={clsx('w-16 h-8 flex items-center justify-center rounded-2xl relative', {
          'zm-bg-card': active,
        })}>
        <div className="relative">
          {markCount > 0 ? (
            <div className="absolute bg-red-700 h-4 w-4 rounded-full -right-2 -top-1 flex items-center justify-center text-xs scale-75 text-white">
              {markCount}
            </div>
          ) : (
            <></>
          )}
          {icon}
        </div>
      </div>
      <div className=" text-xs text-center font-semibold mt-1">{title}</div>
    </Link>
  );
};

export default function NavBar() {
  const messageCount = useMessageCount();
  return (
    <div className="h-full grid grid-cols-4 items-center">
      <NavBarItem
        title="Message"
        to={'/home/message'}
        icon={<ChatBubbleLeftEllipsisIcon className="h-4 w-4" />}
        markCount={messageCount}
      />
      <NavBarItem title="Contacts" to={'/home/contact'} icon={<IdentificationIcon className="h-4 w-4" />} />
      <NavBarItem title="Dapps" to={'/home/dapps'} icon={<ShoppingCartIcon className="h-4 w-4" />} />
      <NavBarItem title="Account" to={'/home/account'} icon={<UserIcon className="h-4 w-4" />} />
    </div>
  );
}
