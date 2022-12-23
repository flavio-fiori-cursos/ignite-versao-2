import type { StoryObj, Meta } from '@storybook/react'

import { Box, BoxProps, Text } from '@flaviofiori-ignite-ui/react'

export default {
  title: 'Surfaces/Box',
  component: Box,
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
  },
  args: {
    children: <Text>Testando o elemento Box</Text>,
  },
} as Meta<BoxProps>

export const Primary: StoryObj = {}
