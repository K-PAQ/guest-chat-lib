import type { Meta, StoryObj } from '@storybook/vue3'
import GuestChatLib from './App.vue'

const meta = {
  title: 'GuestChat',
  component: GuestChatLib,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `<GuestChatLib apikey="397c58a3-1f79-404b-8168-3affea25a985" />`
      }
    }
  },
  tags: ['autodocs'],
  render: (args: any) => ({
    components: { GuestChatLib },
    setup() {
      return { args }
    },
    template: `
      <div style="min-height:450px">
        <GuestChatLib 
            :apikey="args.apikey"
            :primaryColor="args.primaryColor"
            :secondaryColor="args.secondaryColor"
            :waitingDisplayMessage="args.waitingDisplayMessage"
            :appHeader="args.appHeader"
            :isOpen="args.isOpen"
        />
      </div>
    `,
  }),
} satisfies Meta<typeof GuestChatLib>

export default meta
type Story = StoryObj<typeof meta>

export const Chat: Story = {
  args: {
    apikey: "397c58a3-1f79-404b-8168-3affea25a985",
    isOpen: true,
    primaryColor: '#158DE8',
    secondaryColor: '#BBDEFB',
    waitingDisplayMessage: 'Please be aware that it might take a while to connect with support as there may be a queue. We appreciate your patience.',
    appHeader: 'Chat Support'
  },
}