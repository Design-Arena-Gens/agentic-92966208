'use client'

import { useState } from 'react'
import { Loader2, TrendingUp, Target, Users, DollarSign, Megaphone, BarChart3 } from 'lucide-react'

interface Analysis {
  swot: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
  pestle: {
    political: string
    economic: string
    social: string
    technological: string
    legal: string
    environmental: string
  }
  competitors: {
    name: string
    position: string
    keyStrength: string
  }[]
  pricing: {
    strategy: string
    approach: string
    recommendations: string[]
  }
  marketing: {
    channels: string[]
    targetAudience: string
    keyMessages: string[]
  }
  growth: {
    shortTerm: string[]
    longTerm: string[]
    keyFocusAreas: string[]
  }
}

export default function Home() {
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!company.trim()) {
      setError('Please enter a company name')
      return
    }

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: company.trim() }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      setError('Failed to generate analysis. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎯 AI Business Decision Support Tool
          </h1>
          <p className="text-xl text-gray-600">
            Generate comprehensive business analysis for any company
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="Enter company name (e.g., Amazon, Flipkart, Zomato, Tata...)"
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
              disabled={loading}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 size={20} />
                  Analyze
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
          )}
        </div>

        {analysis && (
          <div className="space-y-6">
            {/* SWOT Analysis */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="text-indigo-600" size={28} />
                <h2 className="text-3xl font-bold text-gray-900">SWOT Analysis</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">Strengths</h3>
                  <ul className="space-y-2">
                    {analysis.swot.strengths.map((item, idx) => (
                      <li key={idx} className="text-green-700 flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">Weaknesses</h3>
                  <ul className="space-y-2">
                    {analysis.swot.weaknesses.map((item, idx) => (
                      <li key={idx} className="text-red-700 flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Opportunities</h3>
                  <ul className="space-y-2">
                    {analysis.swot.opportunities.map((item, idx) => (
                      <li key={idx} className="text-blue-700 flex items-start gap-2">
                        <span className="text-blue-600 font-bold">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">Threats</h3>
                  <ul className="space-y-2">
                    {analysis.swot.threats.map((item, idx) => (
                      <li key={idx} className="text-orange-700 flex items-start gap-2">
                        <span className="text-orange-600 font-bold">⚠</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* PESTLE Analysis */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-purple-600" size={28} />
                <h2 className="text-3xl font-bold text-gray-900">PESTLE Analysis</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(analysis.pestle).map(([key, value]) => (
                  <div key={key} className="border-l-4 border-purple-500 pl-6 py-2">
                    <h3 className="text-lg font-bold text-gray-800 capitalize mb-2">{key}</h3>
                    <p className="text-gray-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Analysis */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-pink-600" size={28} />
                <h2 className="text-3xl font-bold text-gray-900">Competitor Analysis</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {analysis.competitors.map((comp, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{comp.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 font-medium">{comp.position}</p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Key Strength: </span>
                      {comp.keyStrength}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Strategy */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="text-green-600" size={28} />
                <h2 className="text-3xl font-bold text-gray-900">Pricing Strategy</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Strategy</h3>
                  <p className="text-gray-700">{analysis.pricing.strategy}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Approach</h3>
                  <p className="text-gray-700">{analysis.pricing.approach}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {analysis.pricing.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Marketing Strategy */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Megaphone className="text-orange-600" size={28} />
                <h2 className="text-3xl font-bold text-gray-900">Marketing Strategy</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Target Audience</h3>
                  <p className="text-gray-700">{analysis.marketing.targetAudience}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Marketing Channels</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.marketing.channels.map((channel, idx) => (
                      <span key={idx} className="px-4 py-2 bg-orange-200 text-orange-800 rounded-lg font-medium">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Key Messages</h3>
                  <ul className="space-y-2">
                    {analysis.marketing.keyMessages.map((msg, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-2">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>{msg}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Growth Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="text-blue-600" size={28} />
                <h2 className="text-3xl font-bold text-gray-900">Growth Plan Summary</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Short-Term Goals (6-12 months)</h3>
                  <ul className="space-y-2">
                    {analysis.growth.shortTerm.map((goal, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-2">
                        <span className="text-blue-600 font-bold">→</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Long-Term Goals (2-5 years)</h3>
                  <ul className="space-y-2">
                    {analysis.growth.longTerm.map((goal, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">→</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Key Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.growth.keyFocusAreas.map((area, idx) => (
                    <span key={idx} className="px-4 py-2 bg-purple-200 text-purple-800 rounded-lg font-medium">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
