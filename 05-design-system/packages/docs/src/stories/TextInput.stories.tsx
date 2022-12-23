import type { StoryObj, Meta } from '@storybook/react'

import { Box, Text, TextInput, TextInputProps } from '@flaviofiori-ignite-ui/react'

export default {
  title: 'Form/Text Input',
  component: TextInput,
  decorators: [
    (Story) => {
      return (
        <Box
          as="label"
          css={{ display: 'flex', flexDirection: 'column', gap: '$3' }}
        >
          <Text size="sm">Email address</Text>
          {Story()}
        </Box>
      )
    },
  ],
} as Meta<TextInputProps>

export const Primary: StoryObj = {
  args: {
    placeholder: 'Type your name',
  },
}

export const Disabled: StoryObj = {
  args: {
    disabled: true,
  },
}

export const WithPrefix: StoryObj = {
  args: {
    prefix: 'Custom',
  },
}
