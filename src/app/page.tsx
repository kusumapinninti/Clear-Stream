"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Shield,
  Upload,
  BarChart3,
  Lock,
  CheckCircle2,
  Play,
  Sparkles,
  Zap,
  Globe,
  Users,
  Award,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial visibility for cards to prevent them from being permanently hidden
    gsap.set(".feature-card", { opacity: 1, y: 0 });
    gsap.set(".stat-card", { opacity: 1, y: 0 });
    gsap.set(".cta-content", { opacity: 1, scale: 1 });

    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from(".hero-badge", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });

      gsap.from(".hero-description", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out"
      });

      gsap.from(".hero-buttons", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out"
      });

      gsap.from(".hero-preview", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out"
      });

      // Stats Counter Animation with ScrollTrigger
      if (statsRef.current) {
        gsap.fromTo(".stat-card",
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
          }
        );
      }

      // Features Animation with ScrollTrigger
      if (featuresRef.current) {
        gsap.fromTo(".feature-card",
          { opacity: 0, y: 60 },
          {
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
          }
        );
      }

      // CTA Section Animation with ScrollTrigger
      if (ctaRef.current) {
        gsap.fromTo(".cta-content",
          { opacity: 0, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out"
          }
        );
      }

      // Floating Animation for Icons
      gsap.to(".float-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.3
      });

      // Refresh ScrollTrigger after a short delay to ensure DOM is ready
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

    }, heroRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const stats = [
    { icon: Users, value: "500+", label: "Global Enterprises" },
    { icon: Shield, value: "99.9%", label: "Detection Accuracy" },
    { icon: TrendingUp, value: "10M+", label: "Videos Processed" },
    { icon: Award, value: "24/7", label: "Support Available" }
  ];

  const features = [
    {
      icon: Shield,
      title: "AI-Powered Sensitivity Analysis",
      description: "Advanced machine learning algorithms detect and classify sensitive content with industry-leading accuracy.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500"
    },
    {
      icon: Lock,
      title: "Military-Grade Security",
      description: "End-to-end encryption with AES-256 and secure streaming infrastructure for complete data protection.",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Comprehensive insights and reporting with customizable dashboards and compliance tracking.",
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-500"
    },
    {
      icon: Globe,
      title: "Global CDN Delivery",
      description: "Lightning-fast video delivery worldwide with adaptive bitrate streaming and edge caching.",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Granular role-based access control with seamless workflow integration and audit logs.",
      gradient: "from-indigo-500/20 to-blue-500/20",
      iconColor: "text-indigo-500"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Real-time video analysis and automated workflows with minimal latency and maximum efficiency.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-500"
    }
  ];

  return (
    <div ref={heroRef} className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              SensiStream
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#security" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Security
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Button variant="ghost" className="text-sm font-medium">
                Log in
                <ChevronRight className="ml-1 h-3 w-3 rotate-90 transition-transform group-hover:rotate-90" />
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2 space-y-1">
                  <Link href="/auth/login/admin" className="block">
                    <Button variant="ghost" className="w-full justify-start text-left hover:bg-purple-50 dark:hover:bg-purple-950">
                      <span className="text-purple-600 mr-2">👑</span> Admin Login
                    </Button>
                  </Link>
                  <Link href="/auth/login/editor" className="block">
                    <Button variant="ghost" className="w-full justify-start text-left hover:bg-blue-50 dark:hover:bg-blue-950">
                      <span className="text-blue-600 mr-2">✏️</span> Editor Login
                    </Button>
                  </Link>
                  <Link href="/auth/login/viewer" className="block">
                    <Button variant="ghost" className="w-full justify-start text-left hover:bg-green-50 dark:hover:bg-green-950">
                      <span className="text-green-600 mr-2">👁️</span> Viewer Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <Button variant="ghost" className="text-sm font-medium">
                Sign up
                <ChevronRight className="ml-1 h-3 w-3 rotate-90 transition-transform group-hover:rotate-90" />
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2 space-y-1">
                  <Link href="/auth/register/editor" className="block">
                    <Button variant="ghost" className="w-full justify-start text-left hover:bg-blue-50 dark:hover:bg-blue-950">
                      <span className="text-blue-600 mr-2">✏️</span> Register as Editor
                    </Button>
                  </Link>
                  <Link href="/auth/register/viewer" className="block">
                    <Button variant="ghost" className="w-full justify-start text-left hover:bg-green-50 dark:hover:bg-green-950">
                      <span className="text-green-600 mr-2">👁️</span> Register as Viewer
                    </Button>
                  </Link>
                  <div className="px-3 py-2 text-xs text-muted-foreground border-t mt-2">
                    Admin access by invitation only
                  </div>
                </div>
              </div>
            </div>
            <Link href="/dashboard">
              <Button className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Go to Dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-20 float-icon" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-20 float-icon" />

          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="flex flex-col items-center text-center">
              <Badge className="hero-badge mb-6 px-4 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                <Sparkles className="mr-2 h-3.5 w-3.5 inline" />
                Trusted by 500+ global enterprises
              </Badge>

              <h1 className="hero-title mb-6 max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
                Enterprise Video{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Intelligence & Safety
                </span>
              </h1>

              <p className="hero-description mb-10 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                Advanced AI-powered sensitivity detection, military-grade secure streaming, and real-time compliance monitoring for professional video workflows.
              </p>

              <div className="hero-buttons flex flex-col gap-4 sm:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 rounded-full px-8 text-base shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all group">
                    Get Started Free
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 rounded-full px-8 text-base border-2 group hover:border-primary/50">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Hero Preview Card - Impressive Dashboard Mockup */}
            <div className="hero-preview mt-20 overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-card to-card/50 p-3 shadow-2xl backdrop-blur">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted">
                <div className="absolute inset-0 bg-grid-white/[0.02]" />

                {/* Realistic Dashboard UI */}
                <div className="absolute inset-0 p-8">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Video Analytics</h3>
                      <p className="text-sm text-muted-foreground">Real-time compliance monitoring</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm font-medium">
                        ● Live
                      </div>
                      <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 text-sm font-medium">
                        99.9% Accuracy
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards Row */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Upload className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-muted-foreground font-medium">Total Videos</span>
                      </div>
                      <div className="text-2xl font-bold">2,847</div>
                      <div className="text-xs text-green-600 mt-1">+12% this month</div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-purple-500" />
                        <span className="text-xs text-muted-foreground font-medium">Flagged</span>
                      </div>
                      <div className="text-2xl font-bold">47</div>
                      <div className="text-xs text-orange-600 mt-1">3 need review</div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-muted-foreground font-medium">Approved</span>
                      </div>
                      <div className="text-2xl font-bold">2,800</div>
                      <div className="text-xs text-green-600 mt-1">98.4% rate</div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-4 w-4 text-orange-500" />
                        <span className="text-xs text-muted-foreground font-medium">Processing</span>
                      </div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs text-muted-foreground mt-1">In queue</div>
                    </div>
                  </div>

                  {/* Recent Videos Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Video Card 1 */}
                    <div className="rounded-xl bg-card border border-border overflow-hidden group hover:border-primary/50 transition-all">
                      <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative flex items-center justify-center">
                        <Play className="h-8 w-8 text-white/80" />
                        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-green-500 text-white text-xs font-medium">
                          Safe
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="h-2 w-3/4 bg-primary/20 rounded mb-2" />
                        <div className="h-2 w-1/2 bg-muted-foreground/10 rounded" />
                      </div>
                    </div>

                    {/* Video Card 2 */}
                    <div className="rounded-xl bg-card border border-border overflow-hidden group hover:border-primary/50 transition-all">
                      <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative flex items-center justify-center">
                        <Play className="h-8 w-8 text-white/80" />
                        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-orange-500 text-white text-xs font-medium">
                          Review
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="h-2 w-3/4 bg-primary/20 rounded mb-2" />
                        <div className="h-2 w-1/2 bg-muted-foreground/10 rounded" />
                      </div>
                    </div>

                    {/* Video Card 3 */}
                    <div className="rounded-xl bg-card border border-border overflow-hidden group hover:border-primary/50 transition-all">
                      <div className="aspect-video bg-gradient-to-br from-green-500/20 to-cyan-500/20 relative flex items-center justify-center">
                        <Play className="h-8 w-8 text-white/80" />
                        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-green-500 text-white text-xs font-medium">
                          Safe
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="h-2 w-3/4 bg-primary/20 rounded mb-2" />
                        <div className="h-2 w-1/2 bg-muted-foreground/10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-primary/90 backdrop-blur text-primary-foreground text-sm font-medium shadow-xl">
                  Live Dashboard Preview
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-20 border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg float-icon">
                      <stat.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section ref={featuresRef} id="features" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
                Platform Features
              </Badge>
              <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Built for compliance.{" "}
                <span className="text-muted-foreground/70">Designed for scale.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Comprehensive toolset for modern video operations and sensitivity management.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`feature-card group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardContent className="relative p-8">
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
                Enterprise Security
              </Badge>
              <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Bank-grade security.{" "}
                <span className="text-muted-foreground/70">Built for compliance.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Your data security is our top priority with industry-leading encryption and compliance standards.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-2 hover:border-primary/30 transition-all">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                    <Lock className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">End-to-End Encryption</h3>
                  <p className="text-muted-foreground mb-4">
                    AES-256 encryption for data at rest and TLS 1.3 for data in transit. Your videos are encrypted from upload to playback.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Military-grade AES-256 encryption
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Secure key management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Zero-knowledge architecture
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/30 transition-all">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                    <Shield className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Compliance Ready</h3>
                  <p className="text-muted-foreground mb-4">
                    Meet regulatory requirements with SOC 2, GDPR, and HIPAA compliance built into every layer.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      SOC 2 Type II certified
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      GDPR & CCPA compliant
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      HIPAA ready infrastructure
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/30 transition-all">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                    <BarChart3 className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Audit Logs</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete visibility with comprehensive audit trails for every action taken on your content.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Real-time activity monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Detailed access logs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Exportable compliance reports
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/30 transition-all">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                    <Users className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Access Control</h3>
                  <p className="text-muted-foreground mb-4">
                    Granular permissions with role-based access control to ensure only authorized users access sensitive content.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      RBAC with custom roles
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      SSO integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Multi-factor authentication
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
                Simple Pricing
              </Badge>
              <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Choose your plan
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Transparent pricing that scales with your business. No hidden fees.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Starter Plan */}
              <Card className="border-2 hover:border-primary/30 transition-all">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold">Starter</h3>
                    <p className="text-muted-foreground">Perfect for small teams</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-5xl font-bold">$49</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Up to 100 videos
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      5 team members
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Basic analytics
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Email support
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full h-12 rounded-full">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="border-2 border-primary shadow-2xl shadow-primary/20 scale-105">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <Badge className="mb-2 bg-primary text-primary-foreground">Most Popular</Badge>
                    <h3 className="text-2xl font-bold">Professional</h3>
                    <p className="text-muted-foreground">For growing businesses</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-5xl font-bold">$149</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Up to 1,000 videos
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Unlimited team members
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Advanced analytics
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      API access
                    </li>
                  </ul>
                  <Button className="w-full h-12 rounded-full shadow-xl">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="border-2 hover:border-primary/30 transition-all">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold">Enterprise</h3>
                    <p className="text-muted-foreground">Custom solutions</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-5xl font-bold">Custom</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Unlimited videos
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Unlimited team members
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Custom integrations
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      24/7 phone support
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Dedicated account manager
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full h-12 rounded-full">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Card className="cta-content relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
              <CardContent className="p-12 md:p-16 text-center">
                <div className="mx-auto max-w-3xl">
                  <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                    Ready to secure your video content?
                  </h2>
                  <p className="mb-10 text-lg text-muted-foreground">
                    Join 500+ enterprises protecting sensitive content with AI-powered intelligence.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Link href="/dashboard">
                      <Button size="lg" className="h-14 rounded-full px-10 text-base shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all">
                        Start Free Trial
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="h-14 rounded-full px-10 text-base border-2">
                      Schedule Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 md:flex-row">
          <div className="mb-4 flex items-center gap-2 md:mb-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">SensiStream</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
