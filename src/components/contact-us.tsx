"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import React from "react";

const ContactUs = () => {
  return (
    <section
      id="contact"
      className="md:min-h-screen bg-marbleWhite dark:bg-charcoalBlack px-6 pt-20"
    >
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold text-charcoalBlack dark:text-marbleWhite sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-slateGray">
          Have a question or need directions? You can contact us using the
          details below.
        </p>
      </div>

      {/* <div className="mt-12 max-w-6xl mx-auto">
        <div className="md:grid-cols-3 grid">
          <div className="col-span-1 my-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl">Contact Us</h2>
            <p className="md:text-lg text-charcoalBlack dark:text-marbleWhite">
              <MapPin className="text-burntUmber inline-block mr-2" />
              By pass road, Makrana - 341505, India
            </p>
            <p>
              <a
                href="tel:+918290542702"
                className="md:text-lg text-nowrap text-charcoalBlack dark:text-marbleWhite"
              >
                <Phone className="text-burntUmber inline-block mr-2" />
                +91 82905 42702
              </a>
            </p>
            <p>
              <a
                href="mailto:info@heritagemarblearts.com?subject=Inquiry&body=Hello, I have a question about..."
                className="md:text-lg text-charcoalBlack dark:text-marbleWhite hover:text-burntUmber transition"
              >
                <Mail className="text-burntUmber mr-2 inline-block" />
                info@heritagemarblearts.com
              </a>
            </p>
          </div>

          <div className="col-span-2">
            <iframe
              className="w-full h-72 rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.0056025604276!2d74.71594120000002!3d27.029988900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396b9d800e789e41%3A0x727756655734462d!2sHeritage%20Marble%20Arts!5e0!3m2!1sen!2sin!4v1740747140385!5m2!1sen!2sin"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div> */}

      <div className="mt-12 max-w-6xl mx-auto">
        <div className="space-y-6">
          <div className="flex sm:flex-row flex-col gap-4 justify-around sm:items-center">
            <div className="flex items-center gap-4">
              <MapPin className="text-burntUmber" />
              <p className="md:text-lg text-charcoalBlack dark:text-marbleWhite">
                By pass road, Makrana - 341505, India
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-burntUmber" />
              <a
                href="tel:+918290542702"
                className="md:text-lg text-nowrap text-charcoalBlack dark:text-marbleWhite"
              >
                +91 82905 42702
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-burntUmber" />
              <a
                href="mailto:info@heritagemarblearts.com?subject=Inquiry&body=Hello, I have a question about..."
                className="md:text-lg text-charcoalBlack dark:text-marbleWhite hover:text-burntUmber transition"
              >
                info@heritagemarblearts.com
              </a>
            </div>
          </div>

          <div className="mt-6">
            <iframe
              className="w-full h-64 rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.0056025604276!2d74.71594120000002!3d27.029988900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396b9d800e789e41%3A0x727756655734462d!2sHeritage%20Marble%20Arts!5e0!3m2!1sen!2sin!4v1740747140385!5m2!1sen!2sin"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default ContactUs;
