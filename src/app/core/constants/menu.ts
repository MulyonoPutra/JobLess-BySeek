import { Menu } from "../domain/menu-item";

export const MENU_ITEM: Menu = {
  header: [
    {
      label: 'Jobs',
      route: '/jobs',
    },
    {
      label: 'Profile',
      route: '/profile',
    },
    {
      label: 'Explore Companies',
      route: '/company',
    },
  ],
  profile: [
    {
      label: 'Profile',
      route: '/profile',
    },
    {
      label: 'Saved Searches',
      route: '/saved-search',
    },
    {
      label: 'Saved Jobs',
      route: '/activity/saved-jobs',
    },
    {
      label: 'Applied Jobs',
      route: '/activity/applied-jobs',
    },
    {
      label: 'Recommended Jobs',
      route: '/recommended-jobs',
    },
    {
      label: 'Settings',
      route: '/settings',
    },
  ],
};

