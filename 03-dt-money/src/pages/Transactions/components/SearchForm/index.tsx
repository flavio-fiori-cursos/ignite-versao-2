import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'

import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'

const SearchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof SearchFormSchema>

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

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

export const SearchForm = memo(SearchFormComponent)

/**
 * Utilizar o "memo" apenas quando o HTML retornado sem grande e complexo:
 * Pois ele executa o deep comparison, e isso é mais lento do que a renderização comum do react
 */
