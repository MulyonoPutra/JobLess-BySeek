import { Menu } from '../domain/entities/menu-item';

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
            label: 'Saved Jobs',
            route: '/activity/saved-jobs',
        },
        {
            label: 'Applied Jobs',
            route: '/activity/applied-jobs',
        },
        {
            label: 'Settings',
            route: '/settings',
        },
    ],
};
