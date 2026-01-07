"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Link from "next/link";
import CountUp from "@/components/ui/CountUp";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.body.style.cursor = "none";
    return () => (document.body.style.cursor = "auto");
  }, []);

  const [cursor, setCursor] = useState({
    active: false,
    text: "",
    x: 0,
    y: 0,
  });

  const [activeReview, setActiveReview] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);
  const [activePlatform, setActivePlatform] = useState(null);

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });

  const f1Y = useTransform(scrollYProgress, [0.2, 0.3], [60, 0]);
  const f1Opacity = useTransform(scrollYProgress, [0.2, 0.25], [0, 1]);
  const f1Scale = useTransform(scrollYProgress, [0.2, 0.3], [0.96, 1]);

  const f2Y = useTransform(scrollYProgress, [0.3, 0.4], [60, 0]);
  const f2Opacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);
  const f2Scale = useTransform(scrollYProgress, [0.3, 0.4], [0.96, 1]);

  const f3Y = useTransform(scrollYProgress, [0.4, 0.5], [80, 0]);
  const f3Opacity = useTransform(scrollYProgress, [0.4, 0.45], [0, 1]);
  const f3Scale = useTransform(scrollYProgress, [0.4, 0.5], [0.94, 1]);

  return (
    <main
      ref={mainRef}
      className="relative bg-white text-gray-900 overflow-hidden"
      onMouseMove={(e) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }))
      }
    >
      <motion.div
        className="fixed z-[9999] pointer-events-none flex items-center justify-center"
        animate={{
          x: cursor.x,
          y: cursor.y,
          width: cursor.active ? 120 : 14,
          height: cursor.active ? 44 : 14,
          borderRadius: cursor.active ? 999 : "50%",
          backgroundColor: cursor.active ? "#16a34a" : "#111827",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ translateX: "-50%", translateY: "-50%", color: "white" }}
      >
        {cursor.active && (
          <span className="text-sm font-medium">{cursor.text}</span>
        )}
      </motion.div>

      <section
        className="h-screen flex items-center justify-center"
        onMouseEnter={() => setCursor({ ...cursor, active: true, text: "Launch" })}
        onMouseLeave={() => setCursor({ ...cursor, active: false, text: "" })}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src="/images/Impact Blog_ Entrepreneurship and Self-Reliance.jpeg"
              alt="Community health awareness session"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="text-left">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-4">
              Healthcare Access <br />
              <span className="text-green-600">for Rural Communities</span>
            </h1>
            <p className="text-lg text-gray-500 mb-6 font-tamil font-bold">
              கிராமப்புற சமூகங்களுக்கான சுகாதார அணுகல்
            </p>
            <p className="text-xl text-gray-600 mb-4">
              Maruthuvan - AI-powered healthcare platform designed for rural accessibility.
            </p>
            <p className="text-base text-gray-500 mb-10 font-tamil font-bold">
              கிராமப்புற அணுகலுக்காக வடிவமைக்கப்பட்ட AI-இயங்கும் சுகாதார தளம்.
            </p>
            <Link href="/auth">
              <Button>Launch Platform</Button>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-gray-50"
        onMouseEnter={() => setCursor({ ...cursor, active: true, text: "View" })}
        onMouseLeave={() => setCursor({ ...cursor, active: false, text: "" })}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Platform Does</h2>
            <p className="text-lg text-gray-500 font-tamil font-bold">எங்கள் தளம் என்ன செய்கிறது</p>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Bridging the healthcare gap in rural areas through innovative technology solutions
            </p>
            <p className="text-base text-gray-500 mt-2 font-tamil font-bold">
              புதுமையான தொழில்நுட்ப தீர்வுகள் மூலம் கிராமப்புறங்களில் சுகாதார இடைவெளியை நிரப்புதல்
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              animate={{
                scale: activePlatform === 1 ? 1.08 : 1,
                opacity: activePlatform && activePlatform !== 1 ? 0.3 : 1,
                filter: activePlatform && activePlatform !== 1 ? "blur(3px)" : "blur(0px)",
              }}
              transition={{
                scale: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, ease: "easeOut" },
                filter: { duration: 0.3, ease: "easeOut" }
              }}
              onMouseEnter={() => setActivePlatform(1)}
              onMouseLeave={() => setActivePlatform(null)}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl border-2 border-green-100 cursor-pointer"
              style={{
                boxShadow: activePlatform === 1 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
              }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Remote Healthcare Access</h3>
              <p className="text-sm text-gray-500 mb-3 font-tamil font-bold">தொலைநிலை சுகாதார அணுகல்</p>
              <p className="text-gray-600">
                Connect rural patients with qualified doctors through secure video consultations
              </p>
              <p className="text-sm text-gray-500 mt-2 font-tamil font-bold">
                பாதுகாப்பான வீடியோ ஆலோசனைகள் மூலம் கிராமப்புற நோயாளிகளை தகுதிவாய்ந்த மருத்துவர்களுடன் இணைக்கவும்
              </p>
            </motion.div>

            <motion.div
              animate={{
                scale: activePlatform === 2 ? 1.08 : 1,
                opacity: activePlatform && activePlatform !== 2 ? 0.3 : 1,
                filter: activePlatform && activePlatform !== 2 ? "blur(3px)" : "blur(0px)",
              }}
              transition={{
                scale: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, ease: "easeOut" },
                filter: { duration: 0.3, ease: "easeOut" }
              }}
              onMouseEnter={() => setActivePlatform(2)}
              onMouseLeave={() => setActivePlatform(null)}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl border-2 border-green-100 cursor-pointer"
              style={{
                boxShadow: activePlatform === 2 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
              }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Health Assistant</h3>
              <p className="text-sm text-gray-500 mb-3 font-tamil font-bold">AI சுகாதார உதவியாளர்</p>
              <p className="text-gray-600">
                Intelligent symptom checker providing preliminary health assessments
              </p>
              <p className="text-sm text-gray-500 mt-2 font-tamil font-bold">
                முதன்மை சுகாதார மதிப்பீடுகளை வழங்கும் அறிவார்ந்த அறிகுறி சரிபார்ப்பாளர்
              </p>
            </motion.div>

            <motion.div
              animate={{
                scale: activePlatform === 3 ? 1.08 : 1,
                opacity: activePlatform && activePlatform !== 3 ? 0.3 : 1,
                filter: activePlatform && activePlatform !== 3 ? "blur(3px)" : "blur(0px)",
              }}
              transition={{
                scale: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, ease: "easeOut" },
                filter: { duration: 0.3, ease: "easeOut" }
              }}
              onMouseEnter={() => setActivePlatform(3)}
              onMouseLeave={() => setActivePlatform(null)}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl border-2 border-green-100 cursor-pointer"
              style={{
                boxShadow: activePlatform === 3 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
              }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Mobile Health Records</h3>
              <p className="text-sm text-gray-500 mb-3 font-tamil font-bold">மொபைல் சுகாதார பதிவுகள்</p>
              <p className="text-gray-600">
                Digital health records accessible anytime, anywhere on mobile devices
              </p>
              <p className="text-sm text-gray-500 mt-2 font-tamil font-bold">
                மொபைல் சாதனங்களில் எப்போது வேண்டுமானாலும், எங்கு வேண்டுமானாலும் அணுகக்கூடிய டிஜிட்டல் சுகாதார பதிவுகள்
              </p>
            </motion.div>

            <motion.div
              animate={{
                scale: activePlatform === 4 ? 1.08 : 1,
                opacity: activePlatform && activePlatform !== 4 ? 0.3 : 1,
                filter: activePlatform && activePlatform !== 4 ? "blur(3px)" : "blur(0px)",
              }}
              transition={{
                scale: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, ease: "easeOut" },
                filter: { duration: 0.3, ease: "easeOut" }
              }}
              onMouseEnter={() => setActivePlatform(4)}
              onMouseLeave={() => setActivePlatform(null)}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl border-2 border-green-100 cursor-pointer"
              style={{
                boxShadow: activePlatform === 4 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
              }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Emergency Response</h3>
              <p className="text-sm text-gray-500 mb-3 font-tamil font-bold">அவசர கால பதில்</p>
              <p className="text-gray-600">Instant emergency alerts with GPS location sharing for rapid response</p>
              <p className="text-sm text-gray-500 mt-2 font-tamil font-bold">விரைவான பதிலுக்காக GPS இருப்பிட பகிர்வுடன் உடனடி அவசர எச்சரிக்கைகள்</p>
            </motion.div>

            <motion.div
              animate={{
                scale: activePlatform === 5 ? 1.08 : 1,
                opacity: activePlatform && activePlatform !== 5 ? 0.3 : 1,
                filter: activePlatform && activePlatform !== 5 ? "blur(3px)" : "blur(0px)",
              }}
              transition={{
                scale: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, ease: "easeOut" },
                filter: { duration: 0.3, ease: "easeOut" }
              }}
              onMouseEnter={() => setActivePlatform(5)}
              onMouseLeave={() => setActivePlatform(null)}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl border-2 border-green-100 cursor-pointer"
              style={{
                boxShadow: activePlatform === 5 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
              }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Education</h3>
              <p className="text-sm text-gray-500 mb-3 font-tamil font-bold">சுகாதார கல்வி</p>
              <p className="text-gray-600">Educational resources and preventive care information in local languages</p>
              <p className="text-sm text-gray-500 mt-2 font-tamil font-bold">உள்ளூர் மொழிகளில் கல்வி வளங்கள் மற்றும் தடுப்பு பராமரிப்பு தகவல்கள்</p>
            </motion.div>

            <motion.div
              animate={{
                scale: activePlatform === 6 ? 1.08 : 1,
                opacity: activePlatform && activePlatform !== 6 ? 0.3 : 1,
                filter: activePlatform && activePlatform !== 6 ? "blur(3px)" : "blur(0px)",
              }}
              transition={{
                scale: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, ease: "easeOut" },
                filter: { duration: 0.3, ease: "easeOut" }
              }}
              onMouseEnter={() => setActivePlatform(6)}
              onMouseLeave={() => setActivePlatform(null)}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl border-2 border-green-100 cursor-pointer"
              style={{
                boxShadow: activePlatform === 6 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
              }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Medicine Management</h3>
              <p className="text-sm text-gray-500 mb-3 font-tamil font-bold">மருந்து மேலாண்மை</p>
              <p className="text-gray-600">Digital prescriptions and medication reminders for better adherence</p>
              <p className="text-sm text-gray-500 mt-2 font-tamil font-bold">சிறந்த கடைபிடிப்புக்காக டிஜிட்டல் மருந்து பரிந்துரைகள் மற்றும் மருந்து நினைவூட்டல்கள்</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="relative h-[150vh] bg-white"
        onMouseEnter={() => setCursor({ ...cursor, active: true, text: "View" })}
        onMouseLeave={() => setCursor({ ...cursor, active: false, text: "" })}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-4">Core Platform Features</h2>
              <p className="text-lg text-gray-500 font-tamil font-bold">முக்கிய தள அம்சங்கள்</p>
            </div>

            <div className="relative h-[420px]">
              <motion.div
                style={{ y: f1Y, opacity: f1Opacity, scale: f1Scale }}
                animate={{
                  scale: activeFeature === 1 ? 1.08 : 1,
                  opacity: activeFeature && activeFeature !== 1 ? 0.3 : 1,
                  filter: activeFeature && activeFeature !== 1 ? "blur(3px)" : "blur(0px)",
                }}
                transition={{
                  scale: { duration: 0.3, ease: "easeOut" },
                  opacity: { duration: 0.3, ease: "easeOut" },
                  filter: { duration: 0.3, ease: "easeOut" }
                }}
                onMouseEnter={() => setActiveFeature(1)}
                onMouseLeave={() => setActiveFeature(null)}
                className="absolute left-0 top-0 w-[340px] bg-white rounded-2xl border-2 border-green-200 shadow-xl p-6 hover:shadow-2xl transition-shadow cursor-pointer"
                style={{
                  boxShadow: activeFeature === 1 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
                }}
              >
                <h3 className="text-xl font-semibold mb-2">AI Symptom Checker</h3>
                <p className="text-sm text-gray-500 mb-3 font-tamil font-bold">AI அறிகுறி சரிபார்ப்பாளர்</p>
                <p className="text-gray-600 mb-3">Intelligent symptom analysis for early medical guidance.</p>
                <p className="text-sm text-gray-500 font-tamil font-bold">ஆரம்ப மருத்துவ வழிகாட்டுதலுக்கான அறிவார்ந்த அறிகுறி பகுப்பாய்வு.</p>
              </motion.div>

              <motion.div
                style={{ y: f2Y, opacity: f2Opacity, scale: f2Scale }}
                animate={{
                  scale: activeFeature === 2 ? 1.08 : 1,
                  opacity: activeFeature && activeFeature !== 2 ? 0.3 : 1,
                  filter: activeFeature && activeFeature !== 2 ? "blur(3px)" : "blur(0px)",
                }}
                transition={{
                  scale: { duration: 0.3, ease: "easeOut" },
                  opacity: { duration: 0.3, ease: "easeOut" },
                  filter: { duration: 0.3, ease: "easeOut" }
                }}
                onMouseEnter={() => setActiveFeature(2)}
                onMouseLeave={() => setActiveFeature(null)}
                className="absolute right-0 top-0 w-[340px] bg-white rounded-2xl border-2 border-green-200 shadow-xl p-6 hover:shadow-2xl transition-shadow cursor-pointer"
                style={{
                  boxShadow: activeFeature === 2 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
                }}
              >
                <h3 className="text-xl font-semibold mb-2">Doctor Consultations</h3>
                <p className="text-sm text-gray-500 mb-3 font-tamil font-bold">மருத்துவர் ஆலோசனைகள்</p>
                <p className="text-gray-600 mb-3">Secure telemedicine access to certified professionals.</p>
                <p className="text-sm text-gray-500 font-tamil font-bold">சான்றிதழ் பெற்ற நிபுணர்களுக்கு பாதுகாப்பான தொலைமருத்துவ அணுகல்.</p>
              </motion.div>

              <motion.div
                style={{ y: f3Y, opacity: f3Opacity, scale: f3Scale }}
                animate={{
                  scale: activeFeature === 3 ? 1.08 : 1,
                  opacity: activeFeature && activeFeature !== 3 ? 0.3 : 1,
                  filter: activeFeature && activeFeature !== 3 ? "blur(3px)" : "blur(0px)",
                }}
                transition={{
                  scale: { duration: 0.3, ease: "easeOut" },
                  opacity: { duration: 0.3, ease: "easeOut" },
                  filter: { duration: 0.3, ease: "easeOut" }
                }}
                onMouseEnter={() => setActiveFeature(3)}
                onMouseLeave={() => setActiveFeature(null)}
                className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[380px] bg-white rounded-2xl border-2 border-green-300 shadow-xl p-8 z-10 hover:shadow-2xl transition-shadow cursor-pointer"
                style={{
                  boxShadow: activeFeature === 3 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
                }}
              >
                <h3 className="text-2xl font-semibold mb-2">Emergency SOS</h3>
                <p className="text-base text-gray-500 mb-3 font-tamil font-bold">அவசர கால SOS</p>
                <p className="text-gray-600 mb-3">Real-time emergency alerts connecting patients to help instantly.</p>
                <p className="text-sm text-gray-500 font-tamil font-bold">நோயாளிகளை உடனடியாக உதவிக்கு இணைக்கும் நிகழ்நேர அவசர எச்சரிக்கைகள்.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* User Count Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Millions Who Trust Maruthuvan</h2>
          <p className="text-lg mb-8 font-tamil font-bold opacity-90">
            மருத்துவனை நம்பும் மில்லியன் கணக்கான மக்களுடன் சேரவும்
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                <CountUp to={2500000} separator="," duration={2.5} />+
              </div>
              <p className="text-xl opacity-90">Active Users</p>
              <p className="text-sm font-tamil font-bold opacity-75">செயலில் உள்ள பயனர்கள்</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                <CountUp to={15000} separator="," duration={2} />+
              </div>
              <p className="text-xl opacity-90">Doctors</p>
              <p className="text-sm font-tamil font-bold opacity-75">மருத்துவர்கள்</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                <CountUp to={500000} separator="," duration={3} />+
              </div>
              <p className="text-xl opacity-90">Lives Impacted</p>
              <p className="text-sm font-tamil font-bold opacity-75">பாதிக்கப்பட்ட வாழ்க்கைகள்</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-32 bg-white"
        onMouseEnter={() => setCursor({ ...cursor, active: true, text: "View" })}
        onMouseLeave={() => setCursor({ ...cursor, active: false, text: "" })}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Top Cards */}
          <div className="flex justify-between items-start mb-16">
            <motion.div
              animate={{
                y: [0, -8, 0],
                scale: activeReview === 1 ? 1.08 : 1,
                opacity: activeReview && activeReview !== 1 ? 0.3 : 1,
                filter: activeReview && activeReview !== 1 ? "blur(3px)" : "blur(0px)",
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, ease: "easeOut" },
                filter: { duration: 0.3, ease: "easeOut" }
              }}
              onMouseEnter={() => setActiveReview(1)}
              onMouseLeave={() => setActiveReview(null)}
              className="w-[380px] bg-white rounded-3xl shadow-xl hover:shadow-2xl p-8 border-2 border-green-100 cursor-pointer"
              style={{
                boxShadow: activeReview === 1 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
              }}
            >
              <div className="mb-4 text-2xl">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-3 text-lg leading-relaxed">
                "This platform has revolutionized healthcare access in our rural district."
              </p>
              <p className="text-sm text-gray-500 mb-6 font-tamil font-bold">
                "இந்த தளம் எங்கள் கிராமப்புற மாவட்டத்தில் சுகாதார அணுகலை புரட்சிகரமாக மாற்றியுள்ளது."
              </p>
              <p className="font-semibold text-gray-900 text-lg">Dr. Sarah Johnson</p>
              <p className="text-sm text-gray-500">Rural Health Director</p>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -12, 0],
                scale: activeReview === 2 ? 1.08 : 1,
                opacity: activeReview && activeReview !== 2 ? 0.3 : 1,
                filter: activeReview && activeReview !== 2 ? "blur(3px)" : "blur(0px)",
              }}
              transition={{ 
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, ease: "easeOut" },
                filter: { duration: 0.3, ease: "easeOut" }
              }}
              onMouseEnter={() => setActiveReview(2)}
              onMouseLeave={() => setActiveReview(null)}
              className="w-[380px] bg-white rounded-3xl shadow-xl hover:shadow-2xl p-8 border-2 border-green-100 cursor-pointer"
              style={{
                boxShadow: activeReview === 2 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
              }}
            >
              <div className="mb-4 text-2xl">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-3 text-lg leading-relaxed">
                "The telemedicine feature has been a game-changer for our patients."
              </p>
              <p className="text-sm text-gray-500 mb-6 font-tamil font-bold">
                "தொலைமருத்துவ அம்சம் எங்கள் நோயாளிகளுக்கு ஒரு விளையாட்டு மாற்றியாக இருந்துள்ளது."
              </p>
              <p className="font-semibold text-gray-900 text-lg">Dr. Michael Chen</p>
              <p className="text-sm text-gray-500">Telemedicine Specialist</p>
            </motion.div>
          </div>

          {/* Center Title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Trusted by Medical Professionals</h2>
            <p className="text-xl text-gray-500 font-tamil font-bold">மருத்துவ நிபுணர்களால் நம்பப்படுகிறது</p>
          </div>

          {/* Bottom Cards */}
          <div className="flex justify-between items-end">
            <motion.div
              animate={{
                y: [0, -10, 0],
                scale: activeReview === 3 ? 1.08 : 1,
                opacity: activeReview && activeReview !== 3 ? 0.3 : 1,
                filter: activeReview && activeReview !== 3 ? "blur(3px)" : "blur(0px)",
              }}
              transition={{ 
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, ease: "easeOut" },
                filter: { duration: 0.3, ease: "easeOut" }
              }}
              onMouseEnter={() => setActiveReview(3)}
              onMouseLeave={() => setActiveReview(null)}
              className="w-[380px] bg-white rounded-3xl shadow-xl hover:shadow-2xl p-8 border-2 border-green-100 cursor-pointer"
              style={{
                boxShadow: activeReview === 3 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
              }}
            >
              <div className="mb-4 text-2xl">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-3 text-lg leading-relaxed">
                "The emergency SOS feature has already saved lives in our community."
              </p>
              <p className="text-sm text-gray-500 mb-6 font-tamil font-bold">
                "அவசர கால SOS அம்சம் ஏற்கனவே எங்கள் சமூகத்தில் உயிர்களை காப்பாற்றியுள்ளது."
              </p>
              <p className="font-semibold text-gray-900 text-lg">Dr. Emily Rodriguez</p>
              <p className="text-sm text-gray-500">Emergency Medicine</p>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -6, 0],
                scale: activeReview === 4 ? 1.08 : 1,
                opacity: activeReview && activeReview !== 4 ? 0.3 : 1,
                filter: activeReview && activeReview !== 4 ? "blur(3px)" : "blur(0px)",
              }}
              transition={{ 
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, ease: "easeOut" },
                filter: { duration: 0.3, ease: "easeOut" }
              }}
              onMouseEnter={() => setActiveReview(4)}
              onMouseLeave={() => setActiveReview(null)}
              className="w-[380px] bg-white rounded-3xl shadow-xl hover:shadow-2xl p-8 border-2 border-green-100 cursor-pointer"
              style={{
                boxShadow: activeReview === 4 ? "0 25px 50px rgba(34, 197, 94, 0.2)" : "0 8px 30px rgba(0, 0, 0, 0.12)"
              }}
            >
              <div className="mb-4 text-2xl">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-3 text-lg leading-relaxed">
                "Digital health records have streamlined our patient management significantly."
              </p>
              <p className="text-sm text-gray-500 mb-6 font-tamil font-bold">
                "டிஜிட்டல் சுகாதார பதிவுகள் எங்கள் நோயாளி மேலாண்மையை கணிசமாக எளிதாக்கியுள்ளன."
              </p>
              <p className="font-semibold text-gray-900 text-lg">Dr. Priya Sharma</p>
              <p className="text-sm text-gray-500">Community Health Officer</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="py-32 bg-green-50"
        onMouseEnter={() => setCursor({ ...cursor, active: true, text: "Launch" })}
        onMouseLeave={() => setCursor({ ...cursor, active: false, text: "" })}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src="/images/Our Impact.jpeg"
              alt="Rural healthcare impact"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="text-left">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Rural Healthcare?</h2>
            <p className="text-lg text-gray-500 mb-6 font-tamil font-bold">கிராமப்புற சுகாதாரத்தை மாற்ற தயாரா?</p>
            <p className="text-xl text-gray-600 mb-4">Join thousands of healthcare providers already using our platform.</p>
            <p className="text-base text-gray-500 mb-10 font-tamil font-bold">எங்கள் தளத்தை ஏற்கனவே பயன்படுத்தும் ஆயிரக்கணக்கான சுகாதார வழங்குநர்களுடன் சேரவும்.</p>
            <Link href="/auth">
              <Button>Get Started Today</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}