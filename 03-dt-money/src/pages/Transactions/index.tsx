import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { useTransactions } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../helpers/formatter'
import { SearchForm } from './components/SearchForm'

import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const { transactions } = useTransactions()

  return (
    <div>
      <Header />

      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '-'}
                    {priceFormatter.format(transaction.amount)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
