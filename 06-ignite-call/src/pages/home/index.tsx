import Image from 'next/image'
import { Heading, Text } from '@ignite-ui/react'
import { NextSeo } from 'next-seo'

import { Container, Hero, Preview } from './styles'
import previewImage from './../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Ignite Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />

      <Container>
        <Hero>
          <Heading size="4xl" as="h1">
            Agendamento descomplicado
          </Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            alt="Calendário simbolizando alicação em funcionamento"
            height={400}
            quality={100}
            priority
          />
        </Preview>
      </Container>
    </>
  )
}
