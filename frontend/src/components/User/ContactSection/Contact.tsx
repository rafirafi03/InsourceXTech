import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { toast } from "react-toastify";
import { Reveal } from "../Motion/Reveal";
import ScrollWords from "../Motion/ScrollWords";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const ContactComponent = () => {
  const [isSending, setIsSending] = useState(false);
  const [botcheck, setBotcheck] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ["start end", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 0.5], ["-25%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], ["25%", "0%"]);

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
    if (isSending) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
      toast.error("Contact form is not configured");
      return;
    }

    setIsSending(true);
    const loadingToast = toast.loading("Sending...");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New contact from ${formData.name}`,
          message: formData.message,
          from_name: "Insource Bridge Technologies Website",
          botcheck,
        }),
      });
      const result = await res.json();
      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success("Message sent successfully");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
      console.error("Failed to send message", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--bg)] py-14 sm:py-20 lg:py-24 xl:py-32">
      <div className="glow-orb left-1/2 top-40 h-[34rem] w-[34rem] -translate-x-1/2 opacity-50" />

      {/* Giant title that slides together as it enters */}
      <div ref={titleRef} className="relative mb-10 overflow-hidden sm:mb-14 lg:mb-16 xl:mb-24">
        <motion.p
          style={{ x: leftX }}
          className="font-display whitespace-nowrap text-center text-[clamp(2.6rem,11vw,11rem)] leading-[0.95] text-white"
        >
          Get in
        </motion.p>
        <motion.p
          style={{ x: rightX, WebkitTextStroke: "1.5px var(--blue)" }}
          className="font-display whitespace-nowrap text-center text-[clamp(2.6rem,11vw,11rem)] leading-[0.95] text-transparent"
        >
          Touch
        </motion.p>
      </div>

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Contact</p>
            <ScrollWords
              text="Have questions or want to work with us? Reach out today and our team will get back to you as soon as possible."
              className="text-2xl font-semibold leading-snug sm:text-3xl"
            />
          </div>

          <Reveal variant="up" className="lg:col-span-7">
            <div className="rounded-[2rem] border border-white/10 bg-[var(--bg-elev)]/80 p-6 backdrop-blur-sm sm:p-10">
              <h3 className="font-display text-lg text-white sm:text-xl">Send Us A Message</h3>

              <form onSubmit={handleSubmit} className="mt-8 space-y-7">
                <input
                  type="checkbox"
                  name="botcheck"
                  checked={botcheck}
                  onChange={(e) => setBotcheck(e.target.checked)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="field"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="email">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="field"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="field"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div>
                  <label className="field-label" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="field min-h-[8rem] resize-none"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  />
                </div>

                <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2.5 text-sm text-[var(--text-dim)]">
                    <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--blue)] shadow-[0_0_10px_var(--blue)]" />
                    We'll get back to you within 24 hours
                  </p>
                  <button type="submit" disabled={isSending} className="btn-primary">
                    {isSending ? "Sending..." : "Send Message"}
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;
