'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

type Feature = {
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  subtitle?: string;
};

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      badge: "REAL-TIME",
      title: "Instant Messages",
      description: "Messages show up right away. No waiting.",
      highlights: ["Super fast", "Always synced"]
    },
    {
      badge: "SECURE",
      title: "Private & Safe",
      description: "Your chats stay private. We don't read them.",
      highlights: ["Secure", "Private"]
    },
    {
      badge: "GROUPS",
      title: "Group Chats",
      description: "Make groups with friends. Add custom photos and manage who's in.",
      highlights: ["Easy setup", "Custom photos"]
    },
    {
      badge: "MEDIA",
      title: "Share Photos",
      description: "Drop in photos and they just work. No weird compression.",
      highlights: ["Drag & drop", "High quality"]
    },
    {
      badge: "SEARCH",
      title: "Find Messages",
      description: "Search for old messages and actually find them.",
      highlights: ["Fast search", "Find anything"]
    },
    {
      badge: "SYNC",
      title: "Works Everywhere",
      description: "Use on your phone, computer, whatever. Same chats everywhere.",
      highlights: ["All devices", "Stay synced"]
    }
  ];

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto mt-16 md:mt-32 px-4">
      {/* Header Section */}
      <div className="relative mb-12 md:mb-20">
        <div className="text-left max-w-2xl">
          <h2 className="text-2xl md:text-3xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Built for{' '}
            <span className="text-indigo-500/90 font-playwrite">
              real conversations.
            </span>
          </h2>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="relative group">
            <Badge 
              variant="default" 
              className="absolute -top-2 left-3 bg-indigo-600/70 border border-indigo-500 text-indigo-200 px-2 text-xs font-medium z-10"
            >
              {feature.badge}
            </Badge>
            
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 h-full group-hover:border-indigo-500/50 transition-all duration-300">
              <div className="mb-3">
                <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                {feature.subtitle && (
                  <span className="text-indigo-400 text-xs font-medium">{feature.subtitle}</span>
                )}
              </div>
              
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                {feature.description}
              </p>
              
              <div className="flex flex-wrap gap-3 text-xs">
                {feature.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                    <span className="text-zinc-400">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;