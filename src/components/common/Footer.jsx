import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Send, 
  Globe,
  Share2,
  Mail,
  ShieldCheck, 
  Truck, 
  Award,
  CheckCircle2
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 mb-12 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Superfast 25-Min Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Heat-insulated packs keep your food sizzling fresh.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Hygiene & Safety Certified</h4>
              <p className="text-xs text-slate-400 mt-0.5">Strict multi-point kitchen cleanliness verification.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Top Rated Restaurants Only</h4>
              <p className="text-xs text-slate-400 mt-0.5">Handpicked culinary gems with verified 4.5+ star reviews.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg">
                <span className="text-xl">🍔</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Cravingo
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              From gourmet wood-fired pizza and triple-smashed wagyu burgers to artisan matcha and royal biryani — we bring the city's finest dining directly to your door.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="max-w-sm">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Get $10 Off Your First Order
              </label>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/60">
                  <CheckCircle2 className="w-4 h-4" />
                  Thanks for subscribing! Check your inbox for your code.
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0 shadow-lg shadow-orange-500/20"
                  >
                    <span>Claim</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Cuisines */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Popular Cuisines
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Smashed Burgers</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Neapolitan Pizza</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Sushi & Ramen</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Dum Biryani</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Birria Tacos</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Superfood Bowls</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Explore Cravingo
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Browse Restaurants</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Track Active Order</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Past Order Receipts</Link></li>
              <li><a href="#offers-section" className="hover:text-white transition-colors">Discount Vouchers</a></li>
              <li><a href="#partner" className="hover:text-white transition-colors">Partner With Us</a></li>
              <li><a href="#rider" className="hover:text-white transition-colors">Become a Delivery Hero</a></li>
            </ul>
          </div>

          {/* Cities & Apps */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Mobile App
            </h5>
            <p className="text-xs text-slate-400 mb-3">
              Order seamlessly with live GPS rider tracking on iOS & Android.
            </p>
            <div className="space-y-2">
              <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors cursor-pointer flex items-center gap-3">
                <span className="text-xl">🍏</span>
                <div className="text-left">
                  <div className="text-[9px] text-slate-400 uppercase leading-none">Download on the</div>
                  <div className="text-xs font-bold text-white leading-tight">Apple App Store</div>
                </div>
              </div>
              <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors cursor-pointer flex items-center gap-3">
                <span className="text-xl">🤖</span>
                <div className="text-left">
                  <div className="text-[9px] text-slate-400 uppercase leading-none">Get it on</div>
                  <div className="text-xs font-bold text-white leading-tight">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Cravingo Inc. All culinary rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Preferences</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="p-2 rounded-lg bg-slate-800 hover:text-white cursor-pointer transition-colors" title="Website"><Globe className="w-4 h-4" /></span>
            <span className="p-2 rounded-lg bg-slate-800 hover:text-white cursor-pointer transition-colors" title="Share"><Share2 className="w-4 h-4" /></span>
            <span className="p-2 rounded-lg bg-slate-800 hover:text-white cursor-pointer transition-colors" title="Newsletter"><Mail className="w-4 h-4" /></span>
          </div>
        </div>

      </div>
    </footer>
  );
}
