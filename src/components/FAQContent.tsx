import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-sm border border-blue-100/50">
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-slate-800">Select a question</h3>
            <p className="text-slate-600 leading-relaxed">Choose a question from the sidebar to see the detailed answer and helpful resources.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 overflow-auto">
      <div className="max-w-4xl mx-auto p-8 animate-fade-in">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4 bg-blue-50 text-blue-700 border-blue-200/60 hover:bg-blue-100 transition-colors">
            {faq.category}
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent leading-tight mb-3">
            {faq.question}
          </h1>
          <p className="text-sm text-slate-500 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last updated: {faq.lastUpdated}
          </p>
        </div>

        <Card className="p-10 shadow-lg border-slate-200/60 bg-white/80 backdrop-blur-sm rounded-2xl">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-slate-700 leading-relaxed space-y-6 [&_h3]:text-slate-800 [&_h3]:font-bold [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-4 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_li]:text-slate-600 [&_strong]:text-slate-800 [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </div>

          {faq.images && faq.images.length > 0 && (
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                Visual Guide
              </h3>
              <div className="grid gap-6">
                {faq.images.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden border border-slate-200/60 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={image}
                      alt={`Visual guide ${index + 1} for ${faq.question}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        <div className="mt-8 p-8 bg-gradient-to-r from-blue-50 via-blue-50/80 to-indigo-50/60 rounded-2xl border border-blue-200/60 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Still need help?</h3>
              <p className="text-blue-800 mb-6 leading-relaxed">
                If this article didn't answer your question, our support team is here to help you get back on track.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}