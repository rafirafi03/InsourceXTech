import { useState } from "react";
import { motion } from "framer-motion";
import { useSendMailMutation } from "../../../store/slices/apiSlices";
import { toast } from "react-toastify";
import { Reveal } from "../Motion/Reveal";

const ContactComponent = () => {
  const [sendMail] = useSendMailMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("sending...");
    try {
      const res = await sendMail(formData).unwrap();
      toast.dismiss(loadingToast);
      if (res.success) {
        toast.success("mail send successfully");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("something went wrong");
      console.error("Failed to send mail", error);
    }
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="section-block">
      <div className="page-shell">
        <Reveal
          variant="blur"
          className="section-head mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow">Contact</p>
          <h2 className="display-title">
            GET IN <span className="accent-text">TOUCH</span>
          </h2>
          <p className="section-copy mx-auto">
            Have questions or want to work with us? Reach out today and our team
            will get back to you as soon as possible.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.08}>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.35 }}
            className="mx-auto max-w-2xl rounded-[1.75rem] bg-[var(--color-muted)] p-6 sm:rounded-[2rem] sm:p-8 md:p-10"
          >
            <h3 className="font-display text-3xl uppercase leading-none text-[var(--color-ink)]">
              Send Us A Message
            </h3>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-sm text-[var(--color-text-muted)]"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm text-[var(--color-text-muted)]"
                    htmlFor="email"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm text-[var(--color-text-muted)]"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-dark"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm text-[var(--color-text-muted)]"
                  htmlFor="message"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="input-dark min-h-[8rem] resize-none"
                  placeholder="Tell us about your project or inquiry..."
                  required
                />
              </div>

              <div className="pt-1">
                <p className="mb-4 text-center text-sm text-[var(--color-text-muted)]">
                  We'll get back to you within 24 hours
                </p>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  type="submit"
                  className="btn-accent w-full"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactComponent;
