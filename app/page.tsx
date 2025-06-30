"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  Home,
  Building,
  Star,
  Users,
  Briefcase,
  Code,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const carouselData = [
  {
    id: 0,
    title: "One of the Mega Diamond Clients",
    subtitle: "Recognized for exceptional value and strategic importance.",
    image:
      "https://plus.unsplash.com/premium_photo-1664049362569-e65216ceb8ba?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Star, // Use any relevant icon
  },
  {
    id: -1,
    title: "20 Years of Client Partnership",
    subtitle: "Building long-term, trusted relationships.",
    image:
      "https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Users, // Use any relevant icon
  },
  {
    id: -2,
    title: "170+ Years of Trust",
    subtitle: "Delivering end-to-end solutions that drive transformation.",
    image:
      "https://images.unsplash.com/photo-1531417666976-ed2bdbeb043b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Briefcase, // Use any relevant icon
  },
  {
    id: -3,
    title: "Modern Tech Stack Coverage",
    subtitle: "Skilled across modern enterprise tech stacks.",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Code, // Use any relevant icon
  },
  {
    id: 2,
    title: "Comprehensive Coverage",
    subtitle: "Home, auto, business, and specialty insurance solutions",
    image:
      "https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Home,
  },
  {
    id: 4,
    title: "Industry Leadership",
    subtitle:
      "The only property casualty company in the Dow Jones Industrial Average",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Building,
  },
];

export default function LandingPage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-scroll functionality
    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000); // 10 seconds delay

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main>
        {/* Hero Section with Carousel */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {carouselData.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <Card className="border-0 bg-transparent shadow-none">
                      <CardContent className="p-0">
                        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                          {/* Content */}
                          <div className="space-y-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-2xl">
                              <slide.icon className="w-8 h-8 text-red-600" />
                            </div>
                            <div className="space-y-6">
                              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
                                {slide.title}
                              </h1>
                              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                {slide.subtitle}
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                              <Button
                                size="lg"
                                className="bg-red-600 hover:bg-red-700 text-white px-8"
                              >
                                Get Started
                              </Button>
                              <Button
                                size="lg"
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                              >
                                Learn More
                              </Button>
                            </div>
                          </div>

                          {/* Image */}
                          <div className="relative">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100">
                              <Image
                                src={slide.image || "/placeholder.svg"}
                                alt={slide.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Buttons */}
              <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 bg-white border-gray-200 text-red-700 hover:bg-red-500 hover:text-white shadow-lg" />
              <CarouselNext className="absolute top-1/2 -translate-y-1/2 bg-white border-gray-200 text-red-700 hover:bg-red-500 hover:text-white shadow-lg" />
            </Carousel>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-12 space-x-3">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-red-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-10">
                One of the largest insurance providers & trusted for exceptional
                services across all Lines of Business
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                We have a strong partnership spanning more than a decade,
                providing a variety of solutions and services across product
                development, large complex integration programs, and customer
                experience. We leverage advanced industry practices such as
                Modern Software Development and Engineering, DevOps, Quality
                Engineering, and Lean Architecture while helping modernize the
                platform.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-25">
                <div className="text-center">
                  <div className="text-4xl font-light text-red-600 mb-2">7</div>
                  <div className="text-sm text-gray-600">
                    Delivery Locations
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-red-600 mb-2">
                    1700+
                  </div>
                  <div className="text-sm text-gray-600">
                    Resources On The Ground
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-red-600 mb-2">
                    15K+
                  </div>
                  <div className="text-sm text-gray-600">
                    Independent Agents
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-red-600 mb-2">
                    170+
                  </div>
                  <div className="text-sm text-gray-600">Years of Trust</div>
                </div>
              </div>

              {/* Key Objectives */}
              <div className="mb-25">
                <h3 className="text-2xl font-light text-gray-900 mb-8">
                  Key Objectives
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div className="text-center p-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Increased
                    </div>
                    <div className="text-xs text-gray-600">
                      Customer Satisfaction & Retention
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl mb-3">
                      <Code className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Length and Breadth of
                    </div>
                    <div className="text-xs text-gray-600">Co-Innovation</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-50 rounded-xl mb-3">
                      <Star className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Faster
                    </div>
                    <div className="text-xs text-gray-600">Time to Market</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-50 rounded-xl mb-3">
                      <Briefcase className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Operational
                    </div>
                    <div className="text-xs text-gray-600">Excellence</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-xl mb-3">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Platform
                    </div>
                    <div className="text-xs text-gray-600">Modernization</div>
                  </div>
                </div>
              </div>

              {/* Services and Business Functions */}
              <div className="grid md:grid-cols-2 gap-12">
                {/* Services Supported */}
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-8">
                    Services Supported
                  </h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700">
                        Modern Software Development
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700">
                        DevOps + SRE + Technology + Release
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700">
                        Packaged SW Implementation
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700">
                        Cloud Migration & Modernization
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700">Production Services</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700">
                        Intelligent Automation
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700">Business Analysis</span>
                    </div>
                  </div>
                </div>

                {/* Supported Business Functions */}
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-6">
                    Supported Business Functions
                  </h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Personal Insurance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Business Insurance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Digital Enablement</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Corp Tech</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Bond</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">
                        Infrastructure Cloud Services
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Claims</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">International</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Strategic Themes Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Strategic Themes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our comprehensive approach integrates key strategic themes to
                deliver exceptional value and innovation.
              </p>
            </div>


            {/* Theme Descriptions */}
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
              
                <h4 className="font-semibold text-gray-900 mb-2">
                  Customer Experience
                </h4>
                <p className="text-sm text-gray-600">
                  Delivering exceptional user experiences across all touchpoints
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-300">
               
                <h4 className="font-semibold text-gray-900 mb-2">
                  Agile Enterprise
                </h4>
                <p className="text-sm text-gray-600">
                  Flexible and responsive organizational capabilities
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors duration-300">
                
                <h4 className="font-semibold text-gray-900 mb-2">
                  Lightweight Decoupled Systems
                </h4>
                <p className="text-sm text-gray-600">
                  Modular and scalable architecture solutions
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors duration-300">
               
                <h4 className="font-semibold text-gray-900 mb-2">
                  Intelligent Automation
                </h4>
                <p className="text-sm text-gray-600">
                  AI-powered process optimization and efficiency
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300">
               
                <h4 className="font-semibold text-gray-900 mb-2">
                  Intelligent Cloud Infrastructure
                </h4>
                <p className="text-sm text-gray-600">
                  Smart cloud solutions for modern enterprises
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-red-50 hover:bg-red-100 transition-colors duration-300">
               
                <h4 className="font-semibold text-gray-900 mb-2">
                  Data and Analytics
                </h4>
                <p className="text-sm text-gray-600">
                  Insights-driven decision making and intelligence
                </p>
              </div>
            </div>
          </div>


        </section>
        {/* Coverage Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Comprehensive Protection
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From personal to business insurance, we provide the coverage you
                need with the care you deserve.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-6">
                  <Home className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Personal Insurance
                </h3>
                <p className="text-gray-600">
                  Protect your home, auto, and personal belongings with
                  comprehensive coverage.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mb-6">
                  <Building className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Business Insurance
                </h3>
                <p className="text-gray-600">
                  Safeguard your business with tailored commercial insurance
                  solutions.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-2xl mb-6">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Specialty Insurance
                </h3>
                <p className="text-gray-600">
                  Specialized coverage for unique risks and high-value assets.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
