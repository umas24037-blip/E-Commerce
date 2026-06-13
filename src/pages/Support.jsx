import { useState } from 'react'
import { ChevronDown, MessageCircle, Phone, Mail, CheckCircle } from 'lucide-react'

const faqs = [
  { q: 'What is your return policy?',       a: 'We offer a 30-day hassle-free return policy. Items must be in original condition with packaging intact.' },
  { q: 'How long does shipping take?',      a: 'Standard shipping takes 3–5 business days. Express options (1–2 days) are available at checkout.' },
  { q: 'Do products come with a warranty?', a: 'All electronics include a minimum 1-year manufacturer warranty. Extended 2-year coverage is available.' },
  { q: 'Can I track my order?',             a: 'Yes! Once shipped, you will receive a tracking link via email and in your Order History dashboard.' },
  { q: 'Is my payment information secure?', a: 'Absolutely. We use 256-bit SSL encryption and never store card details on our servers.' },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-brand-600 transition-colors"
      >
        <span className="font-medium text-sm sm:text-base">{faq.q}</span>
        <ChevronDown size={16} className={`shrink-0 transition-transform ${open ? 'rotate-180 text-brand-600' : 'text-slate-400'}`} />
      </button>
      {open && (
        <p className="pb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed animate-fade-in">
          {faq.a}
        </p>
      )}
    </div>
  )
}

export default function Support() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  const contacts = [
    { icon: MessageCircle, label: 'Live Chat',    sub: 'Available 9am–9pm EST', href: '#' },
    { icon: Phone,         label: '+1 800-TECHVAULT', sub: 'Mon–Fri 9am–6pm',  href: 'tel:+18008324285' },
    { icon: Mail,          label: 'support@techvault.io', sub: 'Reply within 24h', href: 'mailto:support@techvault.io' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">We're here to help — 24/7</p>
      </div>

      {/* Contact channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {contacts.map(({ icon: Icon, label, sub, href }) => (
          <a
            key={label}
            href={href}
            className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-600/10 flex items-center justify-center group-hover:bg-brand-600 transition-colors">
              <Icon size={22} className="text-brand-600 group-hover:text-white transition-colors" />
            </div>
            <p className="font-semibold text-sm">{label}</p>
            <p className="text-xs text-slate-400">{sub}</p>
          </a>
        ))}
      </div>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 divide-y divide-slate-200 dark:divide-slate-800">
          {faqs.map(f => <FAQItem key={f.q} faq={f} />)}
        </div>
      </section>

      {/* Contact form */}
      <section>
        <h2 className="text-xl font-bold mb-6">Send a Message</h2>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center animate-fade-in">
              <CheckCircle size={48} className="text-green-500" strokeWidth={1.5} />
              <p className="font-semibold text-lg">Message sent!</p>
              <p className="text-sm text-slate-400">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
                  <input
                    id="name" type="text" required
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/30 text-sm"
                    placeholder="<your name>"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                  <input
                    id="email" type="email" required
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/30 text-sm"
                    placeholder="<your@email.com>"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  id="message" rows={5} required
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/30 text-sm resize-none"
                  placeholder="Describe your issue…"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
