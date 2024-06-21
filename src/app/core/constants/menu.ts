import { Menu } from "../domain/menu-item";

export const MENU_ITEM: Menu = {
  header: [
    {
      label: 'Job Search',
      route: '/job-search',
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
      route: '/saved-jobs',
    },
    {
      label: 'Applied Jobs',
      route: '/applied-jobs',
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

