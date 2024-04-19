import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

addons.setConfig({
    theme: create({
        base: 'dark',
        brandTitle: 'Guest Chat Lib',
        brandUrl: '#'
    }),
    rightPanelWidth: 800,
    panelPosition: 'right',
    initialActive: 'sidebar',
})