import type { Meta, StoryObj } from '@storybook/vue3'
import GuestChatLib from './App.vue'

const meta = {
  title: 'GuestChat',
  component: GuestChatLib,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `<GuestChatLib appId="test" />`
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
            :appId="args.appId"
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
    appId: "test",
    isOpen: true,
    primaryColor: '#158DE8',
    secondaryColor: '#BBDEFB',
    waitingDisplayMessage: 'Please be aware that it might take a while to connect with support as there may be a queue. We appreciate your patience.',
    appHeader: 'Chat Support'
  },
}