import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycleId } = useContext(CyclesContext)
  const { register } = useFormContext()

  const isInputDisabled = !!activeCycleId

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        list="task-suggestions"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
        disabled={isInputDisabled}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 01" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={isInputDisabled}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
