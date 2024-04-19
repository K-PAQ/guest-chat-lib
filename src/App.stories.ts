import type { Meta, StoryObj } from '@storybook/vue3'
import GuestChatLib from './App.vue'

const meta = {
  title: 'GuestChat',
  component: GuestChatLib,
  render: (args: any) => ({
    components: { GuestChatLib },
    setup() {
      return { args }
    },
    template: `
        <GuestChatLib 
            :appId="args.appId"
            :primaryColor="args.primaryColor"
            :secondaryColor="args.secondaryColor"
            :waitingDisplayMessage="args.waitingDisplayMessage"
            :appHeader="args.appHeader"
            :isOpen="args.isOpen"
        />
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GuestChatLib>

export default meta
type Story = StoryObj<typeof meta>

export const Chat: Story = {
    args: {
        appId: "test",
        isOpen: true,
        primaryColor: '#158DE8',
        secondaryColor: '#BBDEFB',
        waitingDisplayMessage: 'Please be aware that it might take a while to connect with support as there may be a queue. We appreciate your patience.',
        appHeader: 'Chat Support'
    },
}