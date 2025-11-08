import { motion } from 'motion/react';
import { MessageCircle, Shield, Clock, Sparkles, Activity, Pill, Heart } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface HomePageProps {
  setCurrentPage: (page: any) => void;
}

export function HomePage({ setCurrentPage }: HomePageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 600;

    let animationFrameId: number;
    let time = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

      ctx.fillStyle = gradient;

      // Draw multiple waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * 0.01 + time + i) * 30 + 
                   Math.sin(x * 0.02 + time * 0.5 + i) * 20 + 
                   canvas.height / 2;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      time += 0.03;
      animationFrameId = requestAnimationFrame(drawWave);
    };

    drawWave();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 600;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const features = [
    {
      icon: MessageCircle,
      title: '24/7 AI Support',
      description: 'Get instant medical guidance anytime, anywhere'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and protected'
    },
    {
      icon: Pill,
      title: 'Medication Guidance',
      description: 'Smart reminders and drug interaction checks'
    },
    {
      icon: Activity,
      title: 'Health Tracking',
      description: 'Monitor your vitals and wellness metrics'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="w-32 h-32 mx-auto mb-8 relative"
          >
            <motion.div
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500 via-green-400 to-blue-500 rounded-full blur-xl opacity-50"
            />
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <Heart className="w-16 h-16 text-blue-500" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"
          >
            Your AI Health Companion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Get personalized medical advice, medication guidance, and health insights 
            powered by advanced AI technology. Available 24/7 for your wellbeing.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('chat')}
            className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full shadow-lg overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Start Chat Now
            </span>
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Why Choose HealthAI?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of healthcare with our AI-powered platform 
              designed to support your health journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="h-full p-8 rounded-3xl bg-white/50 backdrop-blur-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-green-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-blue-500 to-green-400 text-white text-center relative overflow-hidden"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 bg-white rounded-full blur-3xl"
          />
          
          <div className="relative z-10">
            <h2 className="mb-4 text-white">Ready to Transform Your Health?</h2>
            <p className="mb-8 text-blue-50 max-w-2xl mx-auto">
              Join thousands of users who trust HealthAI for their daily health needs. 
              Start your journey to better health today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('login')}
              className="px-8 py-4 bg-white text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Free
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
