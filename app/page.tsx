import { SendForm } from "./send-form";

export default function Home() {
  const number = process.env.TELNYX_PHONE_NUMBER;
  const configured = Boolean(process.env.TELNYX_API_KEY && number);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a href="#overview" className="brand">
          <span className="brand-mark">A</span>
          <span>
            <strong className="brand-name">ATL SMS</strong>
            <span className="brand-caption">BUSINESS MESSAGING</span>
          </span>
        </a>

        <p className="nav-label">WORKSPACE</p>
        <nav className="nav-list" aria-label="Main navigation">
          <a className="nav-link active" href="#overview">
            <span>▦</span> Overview
          </a>
          <a className="nav-link" href="#send-message">
            <span>✉</span> Send SMS
          </a>
          <a className="nav-link" href="#automations">
            <span>↻</span> Automations
          </a>
          <a className="nav-link" href="#setup">
            <span>⚙</span> Setup guide
          </a>
        </nav>

        <div className="sidebar-promo">
          <span className="promo-icon">✦</span>
          <strong>Built for Atlanta</strong>
          <p>
            Better customer conversations for local businesses, from first
            inquiry to follow-up.
          </p>
          <a href="#automations">Explore workflows →</a>
        </div>

        <div className="sidebar-footer">ATLANTA, GEORGIA · USA</div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>Overview</strong>
          </div>
          <div className="topbar-status">
            <span className="location-pill">⌖ Atlanta, GA</span>
            <span className={`status-pill ${configured ? "ready" : "pending"}`}>
              <span className="status-dot" />
              {configured ? "Telnyx configured" : "Setup required"}
            </span>
          </div>
        </header>

        <div className="page-content" id="overview">
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">ATLANTA BUSINESS MESSAGING</p>
              <h1>
                Every conversation
                <br />
                is an opportunity<span className="accent">.</span>
              </h1>
              <p className="hero-description">
                Connect with customers, respond to inquiries, and make every
                business text count—all from one simple workspace.
              </p>
              <a className="primary-button" href="#send-message">
                <span>＋</span> Compose a message
              </a>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="art-circle art-circle-one" />
              <div className="art-circle art-circle-two" />
              <div className="message-bubble bubble-one">
                <span className="bubble-avatar">A</span>
                <span>
                  <strong>New customer inquiry</strong>
                  <small>Hi, can I get a quote?</small>
                </span>
              </div>
              <div className="message-bubble bubble-two">
                <span className="bubble-check">✓</span>
                <span>
                  <strong>Message ready</strong>
                  <small>Stay connected.</small>
                </span>
              </div>
              <div className="art-center">
                <span>SMS</span>
                <strong>ATL</strong>
              </div>
            </div>
          </section>

          <section className="stats-grid" aria-label="Messaging status">
            <article className="stat-card">
              <div className="stat-card-top">
                <span className="stat-icon peach">✉</span>
                <span className="stat-caption">MESSAGING</span>
              </div>
              <p className="stat-value">
                {configured ? "Connected" : "Not connected"}
              </p>
              <p className="stat-note">
                {configured
                  ? "Required environment variables detected"
                  : "Configure your Telnyx integration to begin"}
              </p>
            </article>

            <article className="stat-card">
              <div className="stat-card-top">
                <span className="stat-icon blue">☎</span>
                <span className="stat-caption">SENDING NUMBER</span>
              </div>
              <p className="stat-value phone-value">
                {number || "Not configured"}
              </p>
              <p className="stat-note">
                {number ? "TELNYX_PHONE_NUMBER" : "Add your Telnyx number"}
              </p>
            </article>

            <article className="stat-card">
              <div className="stat-card-top">
                <span className="stat-icon green">↗</span>
                <span className="stat-caption">GROWTH TOOLKIT</span>
              </div>
              <p className="stat-value">Lead follow-up</p>
              <p className="stat-note">
                Prepare your next customer workflow
              </p>
            </article>
          </section>

          <section className="workspace-grid">
            <article className="panel send-panel" id="send-message">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">MESSAGING CENTER</p>
                  <h2>Send a text message</h2>
                  <p className="panel-description">
                    Send an individual SMS using your Telnyx number.
                  </p>
                </div>
                <span className="panel-heading-icon">✉</span>
              </div>

              {!configured && (
                <div className="notice notice-warning" role="status">
                  <strong>Finish your Telnyx setup</strong>
                  <p>
                    Add your Telnyx API key and sending number to your Vercel
                    environment variables, then redeploy.
                  </p>
                </div>
              )}

              <SendForm disabled={!configured} />

              <div className="compliance-note">
                <span>ⓘ</span>
                Only message people who have consented where required. Honor
                opt-outs and applicable messaging rules.
              </div>
            </article>

            <article className="panel setup-panel" id="setup">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">QUICK START</p>
                  <h2>Get up and running</h2>
                  <p className="panel-description">
                    Prepare your business messaging.
                  </p>
                </div>
              </div>

              <div className="checklist">
                <div className="checklist-item">
                  <span className={`step-number ${configured ? "complete" : ""}`}>
                    {configured ? "✓" : "01"}
                  </span>
                  <div>
                    <strong>Connect Telnyx</strong>
                    <p>
                      {configured
                        ? "Required credentials detected."
                        : "Configure your API key and sending number."}
                    </p>
                  </div>
                </div>

                <div className="checklist-item">
                  <span className="step-number">02</span>
                  <div>
                    <strong>Configure inbound SMS</strong>
                    <p>
                      Point your Telnyx webhook to your deployed inbound API
                      route and verify its signature configuration.
                    </p>
                  </div>
                </div>

                <div className="checklist-item">
                  <span className="step-number">03</span>
                  <div>
                    <strong>Verify registration</strong>
                    <p>
                      Complete applicable US A2P 10DLC registration before
                      sending messages that require it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="setup-footer">
                <span className="setup-footer-icon">✦</span>
                <div>
                  <strong>Ready to grow?</strong>
                  <p>Start with a reliable messaging foundation.</p>
                </div>
              </div>
            </article>
          </section>

          <section className="automation-section" id="automations">
            <div className="section-heading">
              <div>
                <p className="eyebrow">BUILT FOR LOCAL BUSINESS</p>
                <h2>Your customer growth toolkit</h2>
              </div>
              <span className="coming-soon">FEATURE ROADMAP</span>
            </div>

            <div className="feature-grid">
              <article className="feature-card">
                <span className="feature-icon peach">↗</span>
                <h3>Lead response</h3>
                <p>
                  Plan timely acknowledgments for customers who request
                  information about your services.
                </p>
                <span className="feature-link">Lead management</span>
              </article>

              <article className="feature-card">
                <span className="feature-icon blue">◷</span>
                <h3>Appointment reminders</h3>
                <p>
                  Prepare appointment confirmations and reminders for
                  service-based businesses.
                </p>
                <span className="feature-link">Scheduling workflows</span>
              </article>

              <article className="feature-card">
                <span className="feature-icon green">♡</span>
                <h3>Customer retention</h3>
                <p>
                  Design consent-aware review requests and rebooking
                  communications.
                </p>
                <span className="feature-link">Retention workflows</span>
              </article>
            </div>
          </section>

          <footer className="page-footer">
            <span>ATL SMS</span>
            <span>Built for Atlanta businesses.</span>
            <span>Powered by Telnyx</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
