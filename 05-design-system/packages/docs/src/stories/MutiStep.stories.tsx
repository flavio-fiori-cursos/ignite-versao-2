import type { StoryObj, Meta } from '@storybook/react'

import { Box, MultiStep, MultiStepProps } from '@flaviofiori-ignite-ui/react'

export default {
  title: 'Form/Multi Step',
  component: MultiStep,
  decorators: [
    (Story) => {
      return (
        <Box
          as="label"
          css={{ display: 'flex', flexDirection: 'column', gap: '$3' }}
        >
          {Story()}
        </Box>
      )
    },
  ],
  args: {
    size: 4,
    currentStep: 1,
  },
} as Meta<MultiStepProps>

export const Primary: StoryObj = {}

export const Full: StoryObj = {
  args: {
    size: 4,
    currentStep: 4,
  },
}
