import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Search, UserCheck, User } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => (
  <motion.div
    className="flex flex-col items-center justify-start p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="rounded-full bg-red-100 p-3 mb-4">
      <Icon className="w-8 h-8 text-red-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-red-600">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </motion.div>
);

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

const HowBachEatsWorks: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Create Invite",
      description: "Post an invite for a meal you're interested in sharing. Specify details like cuisine, location, and time.",
      icon: Utensils
    },
    {
      title: "View Invites",
      description: "Browse invites posted by other users and send them requests to join their meals.",
      icon: Search
    },
    {
      title: "Manage Requests",
      description: "Review requests sent to your invites and decide whether to approve or decline them.",
      icon: UserCheck
    },
    {
      title: "View Profile",
      description: "See information about yourself, your posted invites, and manage them as needed.",
      icon: User
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How Bach Eats Works
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowBachEatsWorks;