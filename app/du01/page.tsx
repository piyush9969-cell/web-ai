"use client"
import {
  Code,
  Users,
  Globe,
  Cloud,
  Zap,
  Target,
  Layers,
  Palette,
  Settings,
  CheckCircle,
  TrendingUp,
  Lightbulb,
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const techStack = [
  { name: "AWS", category: "Cloud" },
  { name: ".NET", category: "Backend" },
  { name: "Angular", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Python", category: "Backend" },
  { name: "Kafka", category: "Messaging" },
  { name: "Java", category: "Backend" },
  { name: "Kubernetes", category: "Container" },
  { name: "OpenShift", category: "Platform" },
  { name: "Guidewire", category: "Insurance" },
  { name: "MuleSoft", category: "Integration" },
]

const collaborationAreas = [
  { name: "Architecture", icon: Layers, color: "bg-red-600" },
  { name: "Design", icon: Palette, color: "bg-red-600" },
  { name: "System Analysis", icon: Settings, color: "bg-red-600" },
  { name: "Development", icon: Code, color: "bg-red-600" },
  { name: "Quality Engineering", icon: CheckCircle, color: "bg-red-600" },
]

export default function ModernEngineeringPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl">
                <Code className="w-8 h-8 text-red-600" />
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
                  App Dev Modern Engineering & Platform Modernization
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  The App dev modern engineering journey involved
                  Re-platforming, Remediation & building microservices & micro
                  frontends across various LOBs leveraging Agile methodology.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8"
                >
                  Explore Team
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  Learn More
                </Button> */}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1639152201720-5e536d254d81?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Modern Engineering Infographic"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Key Highlights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Delivering exceptional results through modern engineering
              practices and innovative solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl font-light text-red-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Apps Supported</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl font-light text-red-600 mb-2">650</div>
              <div className="text-sm text-gray-600">Modern Engineers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl font-light text-red-600 mb-2">88%</div>
              <div className="text-sm text-gray-600">Offshore</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl font-light text-red-600 mb-2">75%</div>
              <div className="text-sm text-gray-600">Apps Cloud Migration</div>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-4">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Built-in Agile Culture
                </h3>
                <p className="text-gray-600 text-sm">
                  Enable modern engineering mindset to provide 360° customer
                  value
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-4">
                  <Cloud className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Scaled Modernization
                </h3>
                <p className="text-gray-600 text-sm">
                  Cloud-Native applications leveraging ACAM (Accenture Cloud
                  Application Mover)
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-4">
                  <Layers className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Lean Architecture
                </h3>
                <p className="text-gray-600 text-sm">
                  Enabled Continuous Integration & Delivery with DevSecOps
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-4">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  AI Infused Business Rules
                </h3>
                <p className="text-gray-600 text-sm">
                  Migration to achieve faster time to market, drive $10m Opex
                  reduction & simplify rules management
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-4">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Integrated Telemetrics
                </h3>
                <p className="text-gray-600 text-sm">
                  Solution to drive insights driven based on data
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-4">
                  <Globe className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Policy Admin Modernization
                </h3>
                <p className="text-gray-600 text-sm">
                  System on Guidewire platform driving innovative product
                  delivery & rapidly meeting changing customer demands
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Collaboration Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Collaboration Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              End-to-end collaboration across all phases of the development
              lifecycle
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {collaborationAreas.map((area, index) => (
              <div key={area.name} className="flex items-center">
                <div
                  className={`${area.color} text-white px-6 py-3 rounded-lg flex items-center space-x-3 transform hover:scale-105 transition-transform duration-200`}
                >
                  <area.icon className="w-5 h-5" />
                  <span className="font-medium">{area.name}</span>
                </div>
                {index < collaborationAreas.length - 1 && (
                  <div className="hidden md:block w-8 h-0.5 bg-red-300 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Technology Stack
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enhanced architecture maturity through adoption of AWS cloud
              services, document digitization & data capture
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="font-medium text-gray-900 mb-1">
                  {tech.name}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {tech.category}
                </Badge>
              </div>
            ))}
          </div>

          {/* Key Areas Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-6">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Talent & Skills
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    • Upskilled resources using training and certification
                    programs
                  </li>
                  <li>• 70% Certified</li>
                  <li>
                    • Enabled proficiency measurement with periodic evaluations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-6">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Co-Innovation
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    • Co-innovation workshops & design thinking sessions with
                    client & partners
                  </li>
                  <li>
                    • Building assets and accelerator solutions to boost time to
                    market
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-6">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Outcomes & Measurements
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 300+ microservices built to modernize applications</li>
                  <li>• 18% increase in digital customer base</li>
                  <li>• $8m savings in onboarding cost</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modern Software Engineering Spread */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Modern Software Engineering Spread Headcount
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Distribution across different lines of business and engineering
              practices
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-light text-red-600 mb-2">12%</div>
              <div className="text-sm text-gray-600">PI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-red-600 mb-2">10%</div>
              <div className="text-sm text-gray-600">BI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-red-600 mb-2">2%</div>
              <div className="text-sm text-gray-600">CSS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-red-600 mb-2">3%</div>
              <div className="text-sm text-gray-600">ICS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-red-600 mb-2">4%</div>
              <div className="text-sm text-gray-600">DE</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
