import { useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/assets/assets";

export default function Faqs() {
  const [query, setQuery] = useState("");

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.question.toLowerCase().includes(query.toLowerCase()) ||
        item.answer.toLowerCase().includes(query.toLowerCase())
    ),
  }));

  return (
    <section>
      <div className="fag-header">
        <h2 className="text-center mb-4 text-2xl md:text-4xl font-semibold">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-orange-400 py-2">
          Can’t find the answer you’re looking for? Reach out to our support
          team.
        </p>
        <div className="search-faqs md:w-2xl mx-auto my-10">
          <div className="flex items-center gap-2 w-full border px-3 py-2 rounded border-orange-400">
            <Search size={15} className="text-orange-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="flex-1 h-full outline-none placeholder:text-orange-400 text-orange-400 bg-transparent"
            />
          </div>
        </div>
      </div>

      <div className="faqs my-10 max-w-2xl mx-auto">
        {filteredFaqs.map(
          (faqCategory) =>
            faqCategory.items.length > 0 && (
              <div key={faqCategory.category} className="mb-6">
                <h3 className="text-xl font-medium mb-3 text-gray-700">
                  {faqCategory.category}
                </h3>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-2"
                >
                  {faqCategory.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={`item-${item.id}`}
                      className="border border-orange-400 bg-orange-50 rounded px-4"
                    >
                      <AccordionTrigger className="text-left font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-700">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )
        )}
      </div>
    </section>
  );
}
