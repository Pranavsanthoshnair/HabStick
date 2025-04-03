import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { useAppContext } from '../context/AppContext';

const faqs = [
  {
    question: "How do I set up my HabStick for the first time?",
    answer: "Setting up your HabStick is simple. First, charge the device for 4 hours. Then, press and hold the power button for 3 seconds. Follow the voice prompts to connect to your WiFi network and complete the initial setup.",
  },
  {
    question: "How often should I charge my HabStick?",
    answer: "HabStick has a battery life of up to 12 hours. We recommend charging it overnight after each day's use. The device will provide audio alerts when the battery is running low.",
  },
  {
    question: "Can I use HabStick in the rain?",
    answer: "Yes! HabStick is IP67 rated, meaning it's water-resistant and can be used in light rain. However, we recommend avoiding heavy downpours or submerging the device in water.",
  },
  {
    question: "How do I update the software?",
    answer: "HabStick automatically checks for updates when connected to WiFi. When an update is available, you'll receive an audio notification. Follow the voice prompts to complete the update.",
  },
];

const supportResources = [
  {
    title: 'User Manual',
    description: 'Download the complete user manual for detailed instructions and tips.',
    href: '#',
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides on using HabStick features.',
    href: '#',
  },
  {
    title: 'Community Forum',
    description: 'Connect with other HabStick users and share experiences.',
    href: '#',
  },
];

export default function Support() {
  const { showNotification } = useAppContext();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Your message has been sent! Our team will contact you soon.');
    setContactForm({
      name: '',
      email: '',
      message: '',
    });
  };

  const handleResourceClick = (title: string) => {
    showNotification(`Loading ${title}...`);
  };

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  How can we help you?
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  We're here to support you every step of the way. Find answers to common questions, access helpful resources, or get in touch with our support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronUpIcon
                            className={`h-6 w-6 ${open ? 'rotate-180 transform' : ''}`}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>

      {/* Resources section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Support Resources</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Access helpful resources to get the most out of your HabStick.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {supportResources.map((resource) => (
            <div
              key={resource.title}
              className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
            >
              <div>
                <div className="flex items-center gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">{resource.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{resource.description}</p>
              </div>
              <a
                href={resource.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleResourceClick(resource.title);
                }}
                className="mt-8 text-sm font-semibold leading-6 text-primary-600"
              >
                Access resource <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Support</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Need additional help? Our support team is here for you.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 