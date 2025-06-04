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
    <div className="w-80 border-r border-slate-200/60 bg-gradient-to-b from-slate-50 to-white flex flex-col h-screen shadow-sm">
      <div className="p-6 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
          Product FAQ
        </h1>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-blue-500 transition-colors" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-50/80 border-slate-200/60 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder:text-slate-400"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {categories.map(category => {
            const categoryFaqs = filteredFaqs.filter(faq => faq.category === category);
            return (
              <div key={category} className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-1 bg-slate-100/50 rounded-md inline-block">
                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryFaqs.map(faq => (
                    <button
                      key={faq.id}
                      onClick={() => onSelectFaq(faq.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 text-sm leading-relaxed group relative overflow-hidden ${
                        selectedFaqId === faq.id
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-900 border border-blue-200/60 shadow-md transform scale-[1.02]'
                          : 'text-slate-700 hover:bg-white hover:shadow-lg hover:scale-[1.01] border border-slate-100/60 hover:border-slate-200/60'
                      }`}
                    >
                      <div className={`absolute inset-0 transition-opacity duration-300 ${
                        selectedFaqId === faq.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'
                      } bg-gradient-to-r from-blue-500/5 to-purple-500/5`} />
                      <span className="relative z-10 font-medium">{faq.question}</span>
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