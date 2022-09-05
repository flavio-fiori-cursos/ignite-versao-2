import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'

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

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const { data } = await api.get('/transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'Desc',
      },
    })

    setTransactions(data)
  }, [])

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    const { description, amount, category, type } = data

    const response = await api.post('/transactions', {
      description,
      amount,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

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
