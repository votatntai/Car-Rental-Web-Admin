/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'accounts',
        title: 'Accounts',
        subtitle: 'Account Management',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'accounts.managers',
                title: 'Manager',
                type: 'basic',
                icon: 'heroicons_outline:shield-exclamation',
                link: '/accounts/managers'
            },
            {
                id: 'accounts.car-owners',
                title: 'Car Owner',
                type: 'basic',
                icon: 'heroicons_outline:finger-print',
                link: '/accounts/car-owners'
            },
            {
                id: 'accounts.drivers',
                title: 'Drivers',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/accounts/drivers'
            },
            {
                id: 'accounts.customer',
                title: 'Customers',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/accounts/customers'
            },
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'accounts',
        title: 'Accounts',
        subtitle: 'Account Management',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'accounts.managers',
                title: 'Manager',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/managers'
            },
            {
                id: 'accounts.car-owners',
                title: 'Car Owner',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/car-owners'
            },
            {
                id: 'accounts.drivers',
                title: 'Drivers',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/drivers'
            },
            {
                id: 'accounts.customer',
                title: 'Customers',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/customers'
            },
        ]
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'accounts',
        title: 'Accounts',
        subtitle: 'Account Management',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'accounts.managers',
                title: 'Manager',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/managers'
            },
            {
                id: 'accounts.car-owners',
                title: 'Car Owner',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/car-owners'
            },
            {
                id: 'accounts.drivers',
                title: 'Drivers',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/drivers'
            },
            {
                id: 'accounts.customer',
                title: 'Customers',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/customers'
            },
        ]
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'accounts',
        title: 'Accounts',
        subtitle: 'Account Management',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'accounts.managers',
                title: 'Manager',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/managers'
            },
            {
                id: 'accounts.car-owners',
                title: 'Car Owner',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/car-owners'
            },
            {
                id: 'accounts.drivers',
                title: 'Drivers',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/drivers'
            },
            {
                id: 'accounts.customer',
                title: 'Customers',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/accounts/customers'
            },
        ]
    }
];
