import React from 'react';
import { BsBellFill, BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { signOut } from 'next-auth/react';

import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: 'Início',
      href: '/',
      icons: BsHouseFill,
    },
    {
      label: 'Notificações',
      href: '/notifications',
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: 'Perfil',
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {/* {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={BiLogOut}
              auth={item.auth}
              alert={item.alert}
            />
          ))} */}
          <SidebarItem 
            href='/'
            label='Início'
            icon={BsHouseFill}
          />
          <SidebarItem 
            href='/notifications'
            label='Notificações'
            icon={BsBellFill}
            auth={true}
            alert={currentUser?.hasNotification}
          />
          <SidebarItem 
            href={`/users/${currentUser?.id}`}
            label='Perfil'
            icon={FaUser}
            auth={true}
          />
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label='Sair'
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
