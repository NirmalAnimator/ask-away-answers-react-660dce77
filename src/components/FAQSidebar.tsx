import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface FAQ {
  id: string;
  question: string;
  category: string;
}

interface FAQSidebarProps {
  faqs: FAQ[];
  selectedFaqId: string | null;
  onSelectFaq: (faqId: string) => void;
}

export function FAQSidebar({ faqs, selectedFaqId, onSelectFaq }: FAQSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(filteredFaqs.map(faq => faq.category)));

  return (
    <div className="w-80 border-r border-gray-200 bg-gray-50/50 flex flex-col h-screen">
      <div className="p-6 border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product FAQ</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {categories.map(category => {
            const categoryFaqs = filteredFaqs.filter(faq => faq.category === category);
            return (
              <div key={category} className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  {category}
                </h3>
                <div className="space-y-1">
                  {categoryFaqs.map(faq => (
                    <button
                      key={faq.id}
                      onClick={() => onSelectFaq(faq.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-sm leading-relaxed ${
                        selectedFaqId === faq.id
                          ? 'bg-blue-50 text-blue-900 border border-blue-200 shadow-sm'
                          : 'text-gray-700 hover:bg-white hover:shadow-sm border border-transparent'
                      }`}
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}