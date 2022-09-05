import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'

import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import { useTransactions } from '../../../../contexts/TransactionsContext'

const SearchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof SearchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useTransactions()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(SearchFormSchema),
  })

  async function handleSearchTransition(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransition)}>
      <input
        type="text"
        placeholder="Busque por transaçãoes"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
