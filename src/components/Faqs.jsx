import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'How many emails can I dub into social media posts?',
      answer:
        'There are no limits to the amount of emails you can generate a social media post for. We like the limitless potential.',
    },
    {
      question: 'Can I pay for my subscription via purchase order?',
      answer: 'Absolutely, we are happy to take your money in all forms.',
    },
    {
      question: 'How do I apply for a job at MailDub?',
      answer:
        'Reach out to the founder directly on Twitter for such inquiries.',
    },
  ],
  [
    {
      question: 'Is this extention free to use?',
      answer:
        'No this is a paid extention however we provide our users with a 7-day free trial.',
    },
    {
      question:
        'Can I use this service with other email providers?',
      answer:
        'The extention is exclusively built for Gmail and can not be used on other sites!',
    },
    {
      question:
        'How secure is using your extention?',
      answer:
        'We do not store any data related to your email. All data is immediately deleted, so pretty safe ;)',
    },
  ],
  [
    {
      question: 'Would it automatically post on my social media platforms?',
      answer:
        'The extention provides you with the text and images to post for different socials. You must post these yourself.',
    },
    {
      question: 'Do you offer customer support if I encounter any issues while using your extension?',
      answer: 'Yes, follow the founder on Twitter and message anytime. Will get back to you in a couple minutes ;)',
    },
    {
      question: 'What social media platforms does your extention support?',
      answer:
        'Currently the extension supports writing copy for Twitter, LinkedIn, Instagram and Facebook.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and someone will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
