import { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './sidebar';

const meta = {
    title: 'Navigation/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'dark',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        isAuthenticated: {
            control: 'boolean',
            description: 'Controls whether to show all navigation items or only public ones',
            defaultValue: false,
        },
    },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const LoggedOut: Story = {
    args: {
        isAuthenticated: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows only public navigation items (Home and Search)',
            },
        },
    },
};

export const LoggedIn: Story = {
    args: {
        isAuthenticated: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows all navigation items for authenticated users',
            },
        },
    },
};

export const Mobile: Story = {
    args: {
        isAuthenticated: true,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
        docs: {
            description: {
                story: 'Mobile version of the sidebar with icons only',
            },
        },
    },
};


