import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      
      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '28px', height: '28px', backgroundColor: 'var(--accent-primary)', borderRadius: '6px', transform: 'rotate(45deg)' }}></div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Lead Synch</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Features</a>
          <a href="#pricing" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Pricing</a>
          <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600 }}>Log In</Link>
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: 600 }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '0.35rem 1rem', borderRadius: '20px', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1.5rem', border: '1px solid rgba(16,185,129,0.2)' }}>
            ✨ The easiest way to capture leads
          </div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: '1.5rem', color: '#111827' }}>
            Capture Leads <br /> <span style={{ color: 'var(--accent-primary)' }}>Without Coding.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
            Build stunning lead capture forms in minutes and embed them anywhere. Start turning your website traffic into paying customers today.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)' }}>Start for Free</Link>
            <a href="#how-it-works" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '8px', backgroundColor: '#fff', border: '1px solid #e5e7eb' }}>See How it Works</a>
          </div>
        </div>

        {/* Hero Image Mockup */}
        <div style={{ marginTop: '5rem', position: 'relative', zIndex: 1, perspective: '1000px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '12px', padding: '0.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', border: '1px solid #e5e7eb', transform: 'rotateX(5deg)' }}>
            <div style={{ width: '100%', height: '400px', backgroundColor: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
               <img src="/dashboard_preview.jpg" alt="Lead Synch Dashboard Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '6rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Everything you need to grow</h2>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>Stop wasting time building custom forms for every client.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🎨', title: 'No-Code Builder', desc: 'Drag, drop, and customize your forms in a live preview environment without writing a single line of code.' },
              { icon: '⚡', title: 'Embed Anywhere', desc: 'Generate a tiny, lightweight script tag that works perfectly on WordPress, Webflow, Squarespace, and custom sites.' },
              { icon: '📊', title: 'Centralized Leads', desc: 'All your submissions arrive instantly in one clean dashboard. Export them to CSV or connect your favorite CRM.' }
            ].map((feature, i) => (
              <div key={i} style={{ padding: '2.5rem', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #f3f4f6', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>{feature.title}</h3>
                <p style={{ color: '#4b5563', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" style={{ padding: '6rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '4rem' }}>How it works</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {[
              { step: '1', title: 'Create your form', desc: 'Use our intuitive dashboard to name your fields, write your copy, and style your widget.' },
              { step: '2', title: 'Copy the code', desc: 'Grab the single line of JavaScript and paste it right before the closing </body> tag of your site.' },
              { step: '3', title: 'Watch leads roll in', desc: 'Sit back and watch your leads populate in real-time in your Lead Synch dashboard.' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '2rem', textAlign: 'left', backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--accent-primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, flexShrink: 0 }}>
                  {item.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: '#4b5563' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '6rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Simple, transparent pricing</h2>
          <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '4rem' }}>Start for free, upgrade when you need more power.</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            
            {/* Free Tier */}
            <div style={{ width: '100%', maxWidth: '350px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'left', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Starter</h3>
              <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>$0<span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: 400 }}>/mo</span></div>
              <p style={{ color: '#4b5563', marginBottom: '2rem' }}>Perfect for individuals just getting started.</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}>✅ <span>1 Lead Widget</span></li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>✅ <span>Unlimited Leads</span></li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>✅ <span>Basic Support</span></li>
              </ul>
              
              <Link to="/login" className="btn btn-secondary" style={{ width: '100%', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e5e7eb' }}>Get Started</Link>
            </div>

            {/* Pro Tier */}
            <div style={{ width: '100%', maxWidth: '350px', backgroundColor: '#0f172a', color: '#fff', border: '2px solid var(--accent-primary)', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'left', boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.2)', position: 'relative', transform: 'scale(1.05)' }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--accent-primary)', color: '#fff', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Most Popular</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Pro</h3>
              <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>$19<span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 400 }}>/mo</span></div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>For agencies and growing businesses.</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}>⭐ <span>Unlimited Widgets</span></li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>⭐ <span>Custom Styling (Soon)</span></li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>⭐ <span>Priority Support</span></li>
              </ul>
              
              <Link to="/login" className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '8px', textAlign: 'center', display: 'block' }}>Upgrade to Pro</Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 2rem', backgroundColor: '#f8fafc', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--accent-primary)', borderRadius: '4px', transform: 'rotate(45deg)' }}></div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Lead Synch</span>
        </div>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>© 2026 Lead Synch. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Twitter</a>
          <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>GitHub</a>
          <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms</a>
          <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy</a>
        </div>
      </footer>
    </div>
  );
}
