import Image from 'next/future/image'
import type { AppProps } from 'next/app'

import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/app';

import logoImg from '../assets/logo.svg'

globalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>    
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
