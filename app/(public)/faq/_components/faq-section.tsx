"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_DATA } from "@/constants/faq";

// Define strict TypeScript interface for FAQ items

export function FAQSection() {
  return (
    <section className="w-full py-12 min-h-screen flex flex-col justify-center items-center md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have questions about BlackTree.TV? Find quick answers to our most
            common inquiries below.
          </p>
        </div>

        {/* Shadcn Accordion Implementation */}
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQ_DATA.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-muted rounded-xl px-4 md:px-6 bg-card/50 transition-colors data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="text-left text-sm md:text-base font-medium py-4 hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
