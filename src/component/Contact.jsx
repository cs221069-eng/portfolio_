import { useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const emptyForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus('Please fill in all fields before sending your message.')
      return
    }

    try {
      setIsSubmitting(true)
      setStatus('')

      const response = await fetch(`${API_BASE_URL}/api/message/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus(data.message || 'Unable to send your message.')
        return
      }

      setStatus('Your message has been sent successfully. I will get back to you soon.')
      setForm(emptyForm)
    } catch (error) {
      console.error('Failed to send message:', error)
      setStatus('Your message could not be sent because of a network issue.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-black tracking-tight">
              Let&apos;s build something <span className="text-primary">extraordinary</span> together.
            </h2>
            <p className="mb-8 text-lg text-slate-400">
              I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll
              try my best to get back to you!
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <i className="fa-solid fa-envelope text-lg" aria-hidden="true"></i>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-500">Email Me</p>
                  <p className="text-lg font-medium">mmoizsid@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <i className="fa-solid fa-location-dot text-lg" aria-hidden="true"></i>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-500">Location</p>
                  <p className="text-lg font-medium">Karachi, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/5 bg-slate-800/50 p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    className="w-full rounded-xl border-slate-700 bg-slate-900/50 p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="John Doe"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    className="w-full rounded-xl border-slate-700 bg-slate-900/50 p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="john@example.com"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400" htmlFor="contact-subject">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  className="w-full rounded-xl border-slate-700 bg-slate-900/50 p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Project Inquiry"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="w-full rounded-xl border-slate-700 bg-slate-900/50 p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Tell me about your project..."
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {status ? <p className="text-sm text-slate-300">{status}</p> : null}

              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-background-dark transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <i className="fa-solid fa-paper-plane text-sm" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
