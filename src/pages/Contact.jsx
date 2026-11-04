
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Building2,
  Handshake,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "";

const contactDetails = [
  {
    icon: MapPin,
    title: "Our Location",
    text: "Plot 47 & 48, Dwarkamai Enclave, Cheeriyal, Medchal-Malkajgiri, Telangana - 501301, India",
  },
  {
    icon: Mail,
    title: "Email Enquiries",
    text: "Send your enquiry using the form",
  },
  {
    icon: Handshake,
    title: "Dealer & Distributor",
    text: "Contact us for business partnership opportunities",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  location: "",
  message: "",
};

export default function Contact() {
  const [searchParams] = useSearchParams();

  const initialType =
    searchParams.get("type") === "dealer"
      ? "dealer"
      : "general";

  const [enquiryType, setEnquiryType] = useState(initialType);
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  // Update enquiry type when URL query changes
  React.useEffect(() => {
    setEnquiryType(
      searchParams.get("type") === "dealer"
        ? "dealer"
        : "general"
    );
  }, [searchParams]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setFeedback(
        "The enquiry form is not configured yet. Please add your Web3Forms access key."
      );
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject:
              enquiryType === "dealer"
                ? "SFIE - New Dealer Enquiry"
                : "SFIE - New Contact Enquiry",
            from_name: "SFIE Website",
            enquiry_type:
              enquiryType === "dealer"
                ? "Dealer / Distributor"
                : "General Enquiry",
            ...formData,
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFeedback(
          "Thank you! Your enquiry has been submitted successfully."
        );
        setFormData(initialForm);
      } else {
        throw new Error(
          result.message || "Unable to send enquiry."
        );
      }
    } catch (error) {
      setStatus("error");
      setFeedback(
        error.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#052D67] via-[#07559C] to-[#087BD2] px-6 py-20 text-white md:py-24">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-200">
            Get in Touch
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Contact <span className="text-[#9AEE7A]">SFIE</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
            Have questions about our home cleaning products,
            bulk orders, or dealership opportunities?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section className="relative z-10 mx-auto -mt-9 max-w-7xl px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {contactDetails.map((detail) => {
            const Icon = detail.icon;

            return (
              <div
                key={detail.title}
                className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_12px_35px_rgba(7,55,127,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
                  <Icon size={26} className="text-[#087BD2]" />
                </div>

                <h3 className="text-lg font-extrabold text-[#07377F]">
                  {detail.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {detail.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FORM AND BUSINESS INFO */}
      <section className="px-6 py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_0.85fr]">

          {/* FORM */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_12px_50px_rgba(7,55,127,0.06)] sm:p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#31AD14]">
                Send an Enquiry
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#07377F]">
                Let's Connect
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Fill out the form and our team can follow up
                about your enquiry.
              </p>
            </div>

            {/* ENQUIRY TYPE */}
            <div className="mb-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEnquiryType("general")}
                aria-pressed={enquiryType === "general"}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-4 text-sm font-bold transition ${
                  enquiryType === "general"
                    ? "border-[#087BD2] bg-blue-50 text-[#07377F]"
                    : "border-slate-200 text-slate-500 hover:border-blue-200"
                }`}
              >
                <Mail size={18} />
                General Enquiry
              </button>

              <button
                type="button"
                onClick={() => setEnquiryType("dealer")}
                aria-pressed={enquiryType === "dealer"}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-4 text-sm font-bold transition ${
                  enquiryType === "dealer"
                    ? "border-[#31AD14] bg-green-50 text-[#218E13]"
                    : "border-slate-200 text-slate-500 hover:border-green-200"
                }`}
              >
                <Handshake size={18} />
                Dealer Enquiry
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-semibold text-[#07377F]"
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-[#087BD2] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-semibold text-[#07377F]"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-[#087BD2] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm font-semibold text-[#07377F]"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-[#087BD2] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-location"
                    className="mb-2 block text-sm font-semibold text-[#07377F]"
                  >
                    City / Location *
                  </label>
                  <input
                    id="contact-location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Your city or location"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-[#087BD2] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {enquiryType === "dealer" && (
                <div>
                  <label
                    htmlFor="contact-company"
                    className="mb-2 block text-sm font-semibold text-[#07377F]"
                  >
                    Business / Company Name
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your business name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-[#087BD2] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-[#07377F]"
                >
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={
                    enquiryType === "dealer"
                      ? "Tell us about your business and dealership requirements..."
                      : "How can we help you?"
                  }
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-[#087BD2] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* SUBMISSION FEEDBACK */}
              {feedback && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
                    status === "success"
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {status === "success" ? (
                    <CheckCircle2 size={20} className="shrink-0" />
                  ) : (
                    <AlertCircle size={20} className="shrink-0" />
                  )}
                  <p>{feedback}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#31AD14] to-[#218E13] px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-green-100 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading"
                  ? "Sending Enquiry..."
                  : "Submit Enquiry"}
                <Send size={18} />
              </button>

              <p className="text-center text-xs leading-5 text-slate-400">
                Please share only the information needed
                for us to respond to your enquiry.
              </p>
            </form>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-7">

            {/* DEALER CARD */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#07377F] to-[#087BD2] p-8 text-white sm:p-10">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border-[30px] border-white/10" />

              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <Handshake size={27} />
                </div>

                <h3 className="text-2xl font-extrabold">
                  Become an SFIE Dealer
                </h3>

                <p className="mt-4 text-sm leading-7 text-blue-100">
                  Interested in distributing our home
                  cleaning products? Share your business
                  details and explore partnership
                  opportunities with SFIE.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setEnquiryType("dealer");
                    document
                      .getElementById("contact-name")
                      ?.focus();
                  }}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#31AD14] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#269512]"
                >
                  Enquire Now
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

            {/* COMPANY CARD */}
            <div className="rounded-3xl border border-slate-100 bg-[#F6FAFF] p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                <Building2 size={26} className="text-[#087BD2]" />
              </div>

              <h3 className="text-xl font-extrabold text-[#07377F]">
                Shine Forge India Enterprises
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Home cleaning products for kitchen,
                bathroom, floor, laundry and other
                household care needs.
              </p>

              <div className="mt-6 flex items-center gap-2 border-t border-blue-100 pt-5 text-sm font-semibold text-[#07377F]">
                <MapPin size={18} className="text-[#31AD14]" />
                Telangana, India
              </div>
            </div>

            {/* RESPONSE INFORMATION */}
            <div className="flex items-start gap-4 rounded-2xl border border-green-100 bg-green-50 p-6">
              <Clock3
                size={24}
                className="mt-1 shrink-0 text-[#31AD14]"
              />
              <div>
                <h4 className="font-bold text-[#07377F]">
                  Enquiry Support
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Submit your details and our team can
                  get back to you regarding products,
                  bulk orders or dealership information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE MAP */}
      <section className="bg-[#F5FAFF] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#31AD14]">
              Find Us
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-[#07377F]">
              Our Location
            </h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg">
            <iframe
              title="SFIE Location Map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                "Plot 47 & 48, Dwarkamai Enclave, Cheeriyal, Medchal-Malkajgiri, Telangana 501301"
              )}&output=embed`}
              width="100%"
              height="390"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
            />
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Plot%2047%20%26%2048%20Dwarkamai%20Enclave%20Cheeriyal%20Telangana%20501301"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-[#087BD2] hover:text-[#31AD14]"
            >
              Open in Google Maps
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
