import type { StoryObj, Meta } from '@storybook/react'

import { Avatar, AvatarProps } from '@flaviofiori-ignite-ui/react'

export default {
  title: 'Data display/Avatar',
  component: Avatar,
  argTypes: {
    src: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    src: 'https://github.com/flaviofiori.png',
    alt: 'Flávio Fiori',
  },
} as Meta<AvatarProps>

export const Primary: StoryObj = {}

export const WithFallback: StoryObj = {
  args: {
    src: undefined,
  },
}
