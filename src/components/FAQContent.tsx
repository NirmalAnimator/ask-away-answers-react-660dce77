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
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Select a question</h3>
          <p className="text-gray-600">Choose a question from the sidebar to see the detailed answer and helpful resources.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white overflow-auto">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-6">
          <Badge variant="secondary" className="mb-3">
            {faq.category}
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {faq.question}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {faq.lastUpdated}
          </p>
        </div>

        <Card className="p-8 shadow-sm border-gray-200">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </div>

          {faq.images && faq.images.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Visual Guide</h3>
              <div className="grid gap-4">
                {faq.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
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

        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Still need help?</h3>
          <p className="text-blue-800 mb-4">
            If this article didn't answer your question, our support team is here to help.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}