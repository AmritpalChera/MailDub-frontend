import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { useEffect } from 'react'
import { BaseModal } from '../components/Modal'

export default function Home() {

  return (
    <>
      <Head>
        <title>MailDub - Explosive Marketing For Professionals</title>
        <meta
          name="description"
          content="Save hours writing social media posts from your emails. Now it's easy as a single click!"
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <BaseModal />
        <PrimaryFeatures />
        {/* <SecondaryFeatures /> */}
        <CallToAction />
        {/* <Testimonials /> */}
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
