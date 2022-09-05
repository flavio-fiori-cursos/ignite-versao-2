import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  amount: number
  category: string
  createdAt: string
}

interface CreateTransactionData {
  description: string
  amount: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionData) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const { data } = await api.get('/transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'Desc',
      },
    })

    setTransactions(data)
  }

  async function createTransaction(data: CreateTransactionData) {
    const { description, amount, category, type } = data

    const response = await api.post('/transactions', {
      description,
      amount,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  return useContext(TransactionsContext)
}
