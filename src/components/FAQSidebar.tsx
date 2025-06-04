import { Search, HelpCircle, ChevronRight, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
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
  const totalQuestions = faqs.length;
  const filteredCount = filteredFaqs.length;

  return (
    <div className="w-80 border-r border-slate-200 bg-white flex flex-col h-screen">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Help Center</h1>
            <p className="text-sm text-slate-500">{totalQuestions} articles</p>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 bg-white border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-slate-600">
              {filteredCount} result{filteredCount !== 1 ? 's' : ''} found
            </span>
            {filteredCount !== totalQuestions && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Show all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Categories and Questions */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No results found</h3>
              <p className="text-slate-500 text-sm">Try different keywords or browse all categories</p>
            </div>
          ) : (
            <div className="space-y-6">
              {categories.map(category => {
                const categoryFaqs = filteredFaqs.filter(faq => faq.category === category);
                return (
                  <div key={category} className="space-y-3">
                    {/* Category Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">
                          {category}
                        </h3>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {categoryFaqs.length}
                      </Badge>
                    </div>
                    
                    {/* Questions List */}
                    <div className="space-y-2">
                      {categoryFaqs.map(faq => (
                        <button
                          key={faq.id}
                          onClick={() => onSelectFaq(faq.id)}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-200 group relative ${
                            selectedFaqId === faq.id
                              ? 'bg-blue-50 border-2 border-blue-200 text-blue-900 shadow-sm'
                              : 'bg-slate-50 hover:bg-white border-2 border-transparent hover:border-slate-200 text-slate-700 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-sm font-medium leading-relaxed flex-1 text-left">
                              {faq.question}
                            </span>
                            <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-all duration-200 ${
                              selectedFaqId === faq.id 
                                ? 'text-blue-600 transform rotate-90' 
                                : 'text-slate-400 group-hover:text-slate-600 group-hover:transform group-hover:translate-x-1'
                            }`} />
                          </div>
                          
                          {/* Active indicator */}
                          {selectedFaqId === faq.id && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer CTA */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-3">Can't find what you're looking for?</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}