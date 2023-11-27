import React from 'react';
import CIcon from '@coreui/icons-react';
import {
    cilMoney,
    cilPenAlt,
    cilPencil,
    cilSpeedometer,
    cilUserPlus,
    cilCasino,
    cilNotes,
    cilCalen
} from '@coreui/icons';
import { CNavGroup, CNavItem } from '@coreui/react';

// Admin navigation
const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName='nav-icon' />
    },
    {
        component: CNavGroup,
        name: 'Users',
        icon: <CIcon icon={cilUserPlus} customClassName='nav-icon' />,
        items: [
            {
                component: CNavItem,
                name: 'Users',
                to: '/dashboard/users',
                icon: <CIcon icon={cilUserPlus} customClassName='nav-icon' />
            },
            {
                component: CNavItem,
                name: 'New User',
                to: '/dashboard/users/new',
                icon: <CIcon icon={cilPencil} customClassName='nav-icon' />
            }
        ]
    },
    {
        component: CNavGroup,
        name: 'Events',
        icon: <CIcon icon={cilCalen} customClassName='nav-icon' />,
        items: [
            {
                component: CNavItem,
                name: 'All Events',
                to: '/dashboard/events',
                icon: <CIcon icon={cilCalen} customClassName='nav-icon' />
            },
            {
                component: CNavItem,
                name: 'New Event',
                to: '/dashboard/events/new',
                icon: <CIcon icon={cilPenAlt} customClassName='nav-icon' />
            }
        ]
    },
    {
        component: CNavGroup,
        name: 'Podcast',
        icon: <CIcon icon={cilNotes} customClassName='nav-icon' />,
        items: [
            {
                component: CNavItem,
                name: 'Sermons',
                to: '/dashboard/sermons',
                icon: <CIcon icon={cilCasino} customClassName='nav-icon' />
            },
            {
                component: CNavItem,
                name: 'New Sermon',
                to: '/dashboard/sermons/new',
                icon: <CIcon icon={cilPenAlt} customClassName='nav-icon' />
            },
            {
                component: CNavItem,
                name: 'Messages',
                to: '/dashboard/messages',
                icon: <CIcon icon={cilPenAlt} customClassName='nav-icon' />
            },
            {
                component: CNavItem,
                name: 'New Message',
                to: '/dashboard/messages/new',
                icon: <CIcon icon={cilPenAlt} customClassName='nav-icon' />
            }
        ]
    },
    {
        component: CNavGroup,
        name: 'Gallery',
        icon: <CIcon icon={cilMoney} customClassName='nav-icon' />,
        items: [
            {
                component: CNavItem,
                name: 'Galleries',
                to: '/dashboard/galleries',
                icon: <CIcon icon={cilNotes} customClassName='nav-icon' />
            },
            {
                component: CNavItem,
                name: 'New Gallery',
                to: '/dashboard/galleries/new',
                icon: <CIcon icon={cilCasino} customClassName='nav-icon' />
            }
        ]
    },
    {
        component: CNavGroup,
        name: 'Projects',
        icon: <CIcon icon={cilMoney} customClassName='nav-icon' />,
        items: [
            {
                component: CNavItem,
                name: 'Projects',
                to: '/dashboard/projects',
                icon: <CIcon icon={cilNotes} customClassName='nav-icon' />
            },
            {
                component: CNavItem,
                name: 'New Project',
                to: '/dashboard/projects/new',
                icon: <CIcon icon={cilCasino} customClassName='nav-icon' />
            }
        ]
    }
];

// User navigation
export const _generalNav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName='nav-icon' />
    },
    {
        component: CNavGroup,
        name: 'Users',
        icon: <CIcon icon={cilUserPlus} customClassName='nav-icon' />,
        items: [
            {
                component: CNavItem,
                name: 'Users',
                to: '/dashboard/users',
                icon: <CIcon icon={cilUserPlus} customClassName='nav-icon' />
            }
        ]
    }
];

export default _nav;
