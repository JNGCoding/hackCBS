import { Heart, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-green-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-300 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-white">HealthAI</span>
            </div>
            <p className="text-blue-100 max-w-md mb-4">
              Your trusted AI-powered health companion. Get personalized medical advice, 
              medication guidance, and expert support 24/7.
            </p>
            <p className="text-blue-200 text-sm">
              ⚕️ Always consult with a licensed healthcare professional for medical decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-green-200">Quick Links</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="mb-4 text-green-200">Legal & Support</h3>
            <ul className="space-y-2 text-blue-100 mb-4">
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
            <div className="space-y-2 text-blue-100 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@healthai.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1-800-HEALTH-AI</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; 2025 HealthAI. All rights reserved. Made with ❤️ for better healthcare.</p>
        </div>
      </div>
    </footer>
  );
}
