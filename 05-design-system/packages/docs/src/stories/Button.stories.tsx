import type { StoryObj, Meta } from '@storybook/react'
import { ArrowRight } from 'phosphor-react'

import { Button, ButtonProps } from '@ignite-ui/react'

export default {
  title: 'Form/Button',
  component: Button,
  args: {
    children: 'Send',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    variant: {
      options: ['primary', 'seconday', 'tertiary'],
      control: {
        type: 'inline-radio',
      },
    },
    size: {
      options: ['sm', 'md'],
      control: {
        type: 'inline-radio',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      action: 'click',
    },
  },
} as Meta<ButtonProps>

export const Primary: StoryObj = {}

export const Secondary: StoryObj = {
  args: {
    variant: 'secondary',
    children: 'Back',
  },
}

export const Tertiary: StoryObj = {
  args: {
    variant: 'tertiary',
    children: 'Cancel',
  },
}

export const Small: StoryObj = {
  args: {
    size: 'sm',
  },
}

export const WithIcon: StoryObj = {
  args: {
    children: (
      <>
        Next
        <ArrowRight weight="bold" />
      </>
    ),
  },
}

export const Disabled: StoryObj = {
  args: {
    disabled: true,
  },
}
