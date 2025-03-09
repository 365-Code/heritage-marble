"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type UserDetailType = {
  name: string;
  phone?: number;
  email: string;
  body: string;
};

const ContactUs = () => {
  const [userDetails, setUserDetails] = useState<UserDetailType>({
    name: "",
    email: "",
    body: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-marbleWhite dark:bg-charcoalBlack px-6 py-20"
    >
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold text-charcoalBlack dark:text-marbleWhite sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-slateGray">
          Have a question or a custom order request? We&apos;d love to hear from
          you.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-6xl mx-auto">
        {/* Contact Form */}
        <Card className="p-8 rounded-lg shadow-lg bg-transparent border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-charcoalBlack dark:text-champagneGold">
              Send Us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="bg-white dark:bg-charcoalBlack text-charcoalBlack dark:text-marbleWhite p-6 border border-slateGray focus:border-burntUmber transition-all duration-300"
                />
                <Input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="bg-white dark:bg-charcoalBlack text-charcoalBlack dark:text-marbleWhite p-6 border border-slateGray focus:border-burntUmber transition-all duration-300"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Input
                  type="tel"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone"
                  className="bg-white dark:bg-charcoalBlack text-charcoalBlack dark:text-marbleWhite p-6 border border-slateGray focus:border-burntUmber transition-all duration-300"
                />
                <Input
                  type="text"
                  name="body"
                  value={userDetails.body}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  className="bg-white dark:bg-charcoalBlack text-charcoalBlack dark:text-marbleWhite p-6 border border-slateGray focus:border-burntUmber transition-all duration-300"
                />
              </div>
              <Textarea
                placeholder="Your Message"
                className="resize-none bg-white dark:bg-charcoalBlack text-charcoalBlack dark:text-marbleWhite px-6 py-4 border border-slateGray focus:border-burntUmber transition-all duration-300"
              />
              <Button
                type="submit"
                size={"lg"}
                className="w-full bg-burntUmber hover:bg-opacity-80 text-marbleWhite"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <MapPin className="text-burntUmber" />
            <p className="text-lg text-charcoalBlack dark:text-marbleWhite">
              By pass road, Makrana - 341505, India
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-burntUmber" />
            <a
              href="tel:+918290542702"
              className="text-lg text-charcoalBlack dark:text-marbleWhite"
            >
              +91 82905 42702
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-burntUmber" />
            <a
              href="mailto:info@heritagemarblearts.com?subject=Inquiry&body=Hello, I have a question about..."
              className="text-lg text-charcoalBlack dark:text-marbleWhite hover:text-burntUmber transition"
            >
              info@heritagemarblearts.com
            </a>
          </div>

          {/* Google Map (Optional) */}
          <div className="mt-6">
            <iframe
              className="w-full h-64 rounded-lg"
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