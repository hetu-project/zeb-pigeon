import React, { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { To } from 'react-router-dom';
// import { Trans } from '@lingui/macro';
import { ChatBubbleLeftEllipsisIcon, IdentificationIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/solid';
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
        'zm-text-description': !active,
      })}
      replace
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

export default function NavBar() {
  return (
    <div className="h-full grid grid-cols-4 items-center">
      <NavBarItem title="Message" to={'/home/message'} icon={<ChatBubbleLeftEllipsisIcon className="h-4 w-4" />} />
      <NavBarItem title="Contacts" to={'/home/contact'} icon={<IdentificationIcon className="h-4 w-4" />} />
      <NavBarItem title="Dapps" to={'/home/dapps'} icon={<ShoppingCartIcon className="h-4 w-4" />} />
      <NavBarItem title="Account" to={'/home/account'} icon={<UserIcon className="h-4 w-4" />} />
    </div>
  );
}
