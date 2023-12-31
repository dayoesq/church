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
    cilAvTimer,
    cilSpeaker,
    cilMicrophone,
    cilBook,
    cilFilterPhoto
} from '@coreui/icons';
import { CNavGroup, CNavItem } from '@coreui/react';

// Admin navigation
export const adminNavigation = [
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
        icon: <CIcon icon={cilAvTimer} customClassName='nav-icon' />,
        items: [
            {
                component: CNavItem,
                name: 'All Events',
                to: '/dashboard/events',
                icon: <CIcon icon={cilAvTimer} customClassName='nav-icon' />
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
        name: 'Podcasts',
        icon: <CIcon icon={cilSpeaker} customClassName='nav-icon' />,
        items: [
            {
                component: CNavItem,
                name: 'Podcasts',
                to: '/dashboard/podcasts',
                icon: <CIcon icon={cilMicrophone} customClassName='nav-icon' />
            },
            {
                component: CNavItem,
                name: 'New Podcast',
                to: '/dashboard/podcasts/new',
                icon: <CIcon icon={cilPenAlt} customClassName='nav-icon' />
            }
        ]
    },
    {
        component: CNavGroup,
        name: 'Galleries',
        icon: <CIcon icon={cilFilterPhoto} customClassName='nav-icon' />,
        items: [
            {
                component: CNavItem,
                name: 'Galleries',
                to: '/dashboard/galleries',
                icon: <CIcon icon={cilBook} customClassName='nav-icon' />
            },
            {
                component: CNavItem,
                name: 'New Gallery',
                to: '/dashboard/galleries/new',
                icon: <CIcon icon={cilPencil} customClassName='nav-icon' />
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
    },
    {
        component: CNavGroup,
        name: 'Testimonials',
        icon: <CIcon icon={cilSpeaker} customClassName='nav-icon' />,
        items: [
            {
                component: CNavItem,
                name: 'Testimonials',
                to: '/dashboard/testimonials',
                icon: <CIcon icon={cilMicrophone} customClassName='nav-icon' />
            },
            {
                component: CNavItem,
                name: 'New Testimonial',
                to: '/dashboard/testimonials/new',
                icon: <CIcon icon={cilMicrophone} customClassName='nav-icon' />
            }
        ]
    },
    {
        component: CNavGroup,
        name: 'Blog Posts',
        icon: <CIcon icon={cilBook} customClassName='nav-icon' />,
        items: [
            {
                component: CNavItem,
                name: 'Blog Posts',
                to: '/dashboard/blog-posts',
                icon: <CIcon icon={cilBook} customClassName='nav-icon' />
            },
            {
                component: CNavItem,
                name: 'New Post',
                to: '/dashboard/blog-posts/new',
                icon: <CIcon icon={cilPencil} customClassName='nav-icon' />
            }
        ]
    }
];

// User navigation
const generalNavigation = [
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

export default generalNavigation;
