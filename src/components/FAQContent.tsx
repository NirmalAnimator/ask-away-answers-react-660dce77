import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, ThumbsUp, ThumbsDown, Share, BookOpen, ArrowLeft } from "lucide-react";

interface FAQAnswer {
  id: string;
  question: string;
  answer: string;
  category: string;
  images?: string[];
  lastUpdated: string;
}

interface FAQContentProps {
  faq: FAQAnswer | null;
}

export function FAQContent({ faq }: FAQContentProps) {
  if (!faq) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-8 max-w-lg px-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
              <BookOpen className="w-12 h-12 text-blue-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">Browse Our Help Articles</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Select any question from the sidebar to get detailed answers, step-by-step guides, and helpful resources.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">💡</span>
              </div>
              <span className="font-medium">Tip: Use the search bar to quickly find specific topics</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header with breadcrumb and actions */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 p-6 z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <span>Help Center</span>
                <span>/</span>
                <Badge variant="outline" className="text-xs">
                  {faq.category}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                {faq.question}
              </h1>
              <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Updated {faq.lastUpdated}</span>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors" title="Share article">
                <Share className="w-4 h-4 text-slate-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors" title="Open in new tab">
                <ExternalLink className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-6 animate-fade-in">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-slate-700 leading-relaxed space-y-6 [&_h3]:text-slate-900 [&_h3]:font-bold [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-4 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_li]:text-slate-600 [&_strong]:text-slate-900 [&_strong]:font-semibold [&_p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>

              {/* Visual Guide Section */}
              {faq.images && faq.images.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Visual Guide</h3>
                  </div>
                  <div className="grid gap-6">
                    {faq.images.map((image, index) => (
                      <div key={index} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <img
                          src={image}
                          alt={`Step ${index + 1} for ${faq.question}`}
                          className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Article feedback */}
            <div className="border-t border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Was this article helpful?</h4>
                  <p className="text-sm text-slate-600">Let us know how we can improve our help docs.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors border border-green-200">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="font-medium">Yes</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors border border-red-200">
                    <ThumbsDown className="w-4 h-4" />
                    <span className="font-medium">No</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support Card */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Need more help?</h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Can't find what you're looking for? Our support team is ready to help you solve any issues.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Start Live Chat
                  </button>
                  <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                    Email Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}