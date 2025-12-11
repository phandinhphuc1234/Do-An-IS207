import { Link } from "react-router-dom";
import { Phone, MessageCircle, Wrench, Package, FileText, HelpCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactUs() {
  const helpOptions = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Order Support",
      description: "Track, cancel or return an order",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Product Support",
      description: "Get help with your Samsung products",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      description: "1-800-SAMSUNG (726-7864)",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Chat with a Samsung representative",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Email Us",
      description: "Send us an email inquiry",
    },
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: "FAQ",
      description: "Find answers to common questions",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white w-screen">
      <Navbar isTransparent={false} />
      
      {/* Hero Section */}
      <section className="bg-sky-50 pt-24 pb-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-gray-600 text-sm mb-2">We're here to help</p>
          <h1 className="text-4xl md:text-5xl font-bold text-black">Contact Us</h1>
        </div>
      </section>

      {/* Sign In Banner */}
      <section className="px-4 md:px-8 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-100 rounded-full py-5 px-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-gray-800 text-sm md:text-base">
              Get quick access. Sign in to view your products.
            </p>
            <Link
              to="/login"
              className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors"
            >
              <p className="text-white">Sign in</p>
            </Link>
          </div>
        </div>
      </section>


      {/* How can we help you */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-16">
            How can we help you?
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {helpOptions.map((option, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer group min-h-[180px]"
              >
                <div className="text-gray-700 mb-6 group-hover:text-blue-500 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {option.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  {option.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-8">
            Send us a message
          </h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white">
                <option>Select a topic</option>
                <option>Order Support</option>
                <option>Product Support</option>
                <option>Returns & Refunds</option>
                <option>Technical Support</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="How can we help you?"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-10 h-10 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-gray-600">1-800-SAMSUNG</p>
              <p className="text-gray-500 text-sm">Mon-Sun: 8AM - 12AM EST</p>
            </div>
            <div>
              <MessageCircle className="w-10 h-10 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
              <p className="text-gray-600">Chat with us online</p>
              <p className="text-gray-500 text-sm">Available 24/7</p>
            </div>
            <div>
              <FileText className="w-10 h-10 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold text-lg mb-2">Support Center</h3>
              <p className="text-gray-600">Visit our help center</p>
              <p className="text-gray-500 text-sm">Find answers & guides</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactUs;
