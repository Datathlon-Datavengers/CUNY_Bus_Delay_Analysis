import React, { useState, useEffect } from 'react';

const BusAnalysisApp = () => {
  const [stats, setStats] = useState({
    delay: 'Loading...',
    violations: 'Loading...',
    hotspots: 'Loading...',
    reduction: 'Loading...'
  });

  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Animate stats after component mounts
    const timer = setTimeout(() => {
      setStats({
        delay: '279',
        violations: '12552.8 ',
        hotspots: '279',
        reduction: '279'
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const openImage = (src) => {
    // Open the image in a new tab/window for a closer view
    window.open(src, '_blank', 'noopener');
  };

  const cardStyle = (cardId) => ({
    transform: hoveredCard === cardId ? 'translateY(-10px) rotate(1deg)' : 'translateY(0) rotate(0deg)',
    transition: 'transform 0.3s ease'
  });

  const StatBox = ({ value, label }) => (
    <div className="stat-box">
      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );

  const DataCard = ({ id, title, children }) => (
    <div 
      className="data-card"
      style={cardStyle(id)}
      onMouseEnter={() => handleCardHover(id)}
      onMouseLeave={handleCardLeave}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );

  const ImagePlaceholder = ({ title, height = '200px' }) => (
    <div style={{
      height,
      background: '#f8f9fa',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#999',
      marginTop: '15px',
      border: '2px dashed #dee2e6'
    }}>
      {title}
    </div>
  );

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      lineHeight: 1.6,
      color: '#333',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      <style>
        {`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }

          header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
            border: 2px solid #ff6b35;
          }

          .bus-icon {
            font-size: 48px;
            margin-bottom: 20px;
            color: #ff6b35;
          }

          h1 {
            color: #1e3c72;
            margin-bottom: 15px;
            font-size: 2.5em;
            font-weight: bold;
          }

          .subtitle {
            color: #666;
            font-size: 1.2em;
            margin-bottom: 10px;
          }

          .research-question {
            background: linear-gradient(90deg, #ff6b35, #f7931e);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
            font-style: italic;
            font-size: 1.1em;
            box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
          }

          .section {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            border-left: 5px solid #ff6b35;
          }

          h2 {
            color: #1e3c72;
            margin-bottom: 20px;
            font-size: 1.8em;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          h3 {
            color: #2a5298;
            margin-bottom: 15px;
            font-size: 1.3em;
          }

          .data-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
          }

          .data-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 20px;
            border-radius: 12px;
            border: 2px solid #dee2e6;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .data-card:hover {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          }

          .insight-card {
            background: linear-gradient(135deg, #fff5f5 0%, #fee2e2 100%);
            border: 2px solid #ff6b35;
            padding: 20px;
            border-radius: 12px;
            margin: 15px 0;
          }

          .stat-box {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin: 10px 0;
          }

          .stat-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #ff6b35;
          }

          .stat-label {
            font-size: 0.9em;
            opacity: 0.9;
          }

          .btn {
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1em;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            margin: 10px 5px;
          }

          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
          }

          .nyc-accent {
            color: #ff6b35;
            font-weight: bold;
          }

          .bus-route {
            display: inline-block;
            background: #1e3c72;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-weight: bold;
            margin: 0 5px;
          }

          footer {
            text-align: center;
            padding: 30px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            margin-top: 30px;
            color: #666;
          }

          .methodology-list {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 15px 0;
          }

          .figure-img {
            width: 100%;
            height: 320px;
            object-fit: cover;
            border-radius: 10px;
            border: 2px solid #dee2e6;
            margin-top: 15px;
            background: #f8f9fa;
            display: block;
            box-shadow: 0 6px 18px rgba(0,0,0,0.08);
            cursor: pointer;
          }

          .figure-wrap {
            position: relative;
            border-radius: 10px;
            overflow: hidden;
          }

          .figure-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,0.25);
            backdrop-filter: blur(3px);
            opacity: 0;
            transition: opacity 180ms ease-in-out;
          }

          .figure-wrap:focus-within .figure-overlay,
          .figure-wrap:hover .figure-overlay {
            opacity: 1;
          }

          .figure-button {
            background: rgba(255,255,255,0.95);
            border: none;
            padding: 10px 16px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 6px 18px rgba(0,0,0,0.12);
          }

          .figure-button:focus {
            outline: 3px solid rgba(34, 144, 255, 0.35);
            outline-offset: 2px;
          }

          /* Survey-specific grid to give images more horizontal space */
          .survey-grid {
            grid-template-columns: repeat(2, minmax(420px, 1fr));
            gap: 24px;
          }

          .survey-caption {
            grid-column: 1 / -1; /* span all columns */
            margin-top: 12px;
            color: #444;
            font-size: 1rem;
            line-height: 1.6;
          }

          /* Visualizations: force a 2x2 grid on larger screens */
          .visual-grid {
            grid-template-columns: repeat(2, minmax(320px, 1fr));
            gap: 20px;
          }

          .methodology-list li {
            margin: 10px 0;
            padding-left: 10px;
          }

          @media (max-width: 768px) {
            .container {
              padding: 10px;
            }
            
            h1 {
              font-size: 2em;
            }
            
            .data-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="container">
        <header>
          
          <h1>MHC++ Datathon: Q44+ Bus Route Analysis</h1>
          <div className="subtitle">Reducing Queens College Student Delays With Data</div>
          <div className="subtitle">
            <span className="nyc-accent">Atiqa, Winnie, Joseph, Prionty</span> 
          </div>
        </header>

        <div className="research-question">
          <h3>Research Question</h3>
          "How do repeat exempt vehicle violations on the <span className="bus-route">Q44+</span> bus route near Queens College during peak commuting hours contribute to student delays, and what is the potential reduction in delays from installing AI cameras at identified hotspots?"
        </div>

                <div className="section">
    
          <div className="methodology-list">
            <h3>Data Collection & Analysis:</h3>
            <ul>
              <li>MTA bus delay data analysis for Q44+ route</li>
              <li>Exempt vehicle violation tracking near Queens College</li>
              <li>Student survey data on commuting experiences</li>
              <li>Geographic mapping of high-violation areas</li>
              <li>Correlation analysis between violations and delays</li>
            </ul>
          </div>
        </div>

        <div className="section">
          <h2>Key Findings</h2>
          <div className="data-grid">
            <StatBox value={stats.delay} label="Hours delayed from top 250 most repeated exempt vehicles" />
            <StatBox value={stats.violations} label="Number of student hours affected from top 250 most repeated exempt vehicles " />

          </div>
        </div>

        <div className="section">
          <h2>Data Analysis & Visualizations</h2>
          <div className="data-grid visual-grid">
            <div>
              <h3>Distribution of Exempt Vehicles Violation Types Near Queens College</h3>
              <div className="figure-wrap">
                <img
                  src="/pictures/whichviolation.png"
                  alt="Violation trends chart"
                  className="figure-img"
                />
                <div className="figure-overlay">
                  <button className="figure-button" onClick={() => openImage('/pictures/whichviolation.png')}>Click to view</button>
                </div>
              </div>
            </div>
            <div>
              <h3>Heatmap of Violation Hotspots Near Queens College (HTML Version with zoom on GitHub)</h3>
             
              <div className="figure-wrap">
                <img
                  src="/pictures/heatmap.png"
                  alt="Violation heatmap"
                  className="figure-img"
                />
                <div className="figure-overlay">
                  <button className="figure-button" onClick={() => openImage('/pictures/heatmap.png')}>Click to view</button>
                </div>
              </div>
            </div>
            <div>
              <h3>Histogram of Violation Counts for Top 250 Repeat Offenders</h3>
              
              <div className="figure-wrap">
                <img
                  src="/pictures/histogramofviolationcountsfortop250repeatoffenders.png"
                  alt="Repeat offender histogram"
                  className="figure-img"
                />
                <div className="figure-overlay">
                  <button className="figure-button" onClick={() => openImage('/pictures/histogramofviolationcountsfortop250repeatoffenders.png')}>Click to view</button>
                </div>
              </div>
            </div>
            <div>
              <h3>Density of Distance to Campus by Repeat Offender Status</h3>
          
              <div className="figure-wrap">
                <img
                  src="/pictures/Densityofdistancetocampusbyrepeatoffenderstatus.png"
                  alt="Distance density plot"
                  className="figure-img"
                />
                <div className="figure-overlay">
                  <button className="figure-button" onClick={() => openImage('/pictures/Densityofdistancetocampusbyrepeatoffenderstatus.png')}>Click to view</button>
                </div>
              </div>
            </div>
            <div>
              <h3>Time Series of Violations Over Time Near Queens College</h3>
              <div className="figure-wrap">
                <img
                  src="/pictures/dailyviolationacorsstheyears.png"
                  alt="Time Series"
                  className="figure-img"
                />
                <div className="figure-overlay">
                  <button className="figure-button" onClick={() => openImage('/pictures/dailyviolationacorsstheyears.png')}>Click to view</button>
                </div>
              </div>
            </div>
            <div>
              <h3>Regression: Factor Importance for Predicting Repeat Offenses</h3>
              <div className="figure-wrap">
                <img
                  src="/pictures/regressionresultforthemostimportantfactor.png"
                  alt="regression"
                  className="figure-img"
                />
                <div className="figure-overlay">
                  <button className="figure-button" onClick={() => openImage('/pictures/regressionresultforthemostimportantfactor.png')}>Click to view</button>
                </div>
              </div>
            </div>
            <div>
              <h3>How violations evolve over time based on distance to campus</h3>
              <div className="figure-wrap">
                <img
                  src="/pictures/howviolationsevolveovertimebasedondistancetocampus.png"
                  alt="distance"
                  className="figure-img"
                />
                <div className="figure-overlay">
                  <button className="figure-button" onClick={() => openImage('/pictures/howviolationsevolveovertimebasedondistancetocampus.png')}>Click to view</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Student Survey Results</h2>
          <div className="insight-card">
            <h3>Poll Data Insights</h3>
            <div className="data-grid survey-grid">
              <img
                src="/pictures/Low Income_.png"
                alt="Student survey results chart"
                className="figure-img"
              />
              <img
                src="/pictures/Reported time of delays.png"
                alt="Delay impact analysis"
                className="figure-img"
              />
              <p className="survey-caption">This data shows that most students leave for school around 7:00 - 7:30 AM, which is considered peak rush hour in New York City. For the 75% of students who identify as low-income, these seemingly small delays become major barriers. While some students can handle a 20-minute setback or turn to other transportation options, low-income students don’t have that option. For them, delays ranging from 20 minutes to nearly 2 hours mean walking into class late, missing lessons, and falling behind. For first-gen students, those setbacks make it even harder to break cycles and fully access the opportunities higher education should provide.</p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Solutions</h2>
          <div className="data-grid">
            <div className="insight-card">
              <h3>🤖 AI Camera Solution</h3>
              <p>Strategic placement of AI-powered cameras at identified hotspots could reduce violations by monitoring and automatically ticketing exempt vehicles that abuse bus lanes.</p>
            </div>
            <div className="insight-card">
              <h3>📉 Projected Impact</h3>
              <p>Based on our analysis, implementing AI cameras could potentially reduce student delays by up to <span className="nyc-accent">25-30%</span> during peak commuting hours.</p>
            </div>
          </div>
        </div>



        <footer>
       
      
          <p>Making NYC Transit Better Through Data</p>
  
          <button
            className="btn"
            onClick={() => window.open('https://github.com/Datathlon-Datavengers/CUNY_Bus_Delay_Analysis', '_blank', 'noopener')}
            aria-label="View on GitHub"
          >
            🔗 View on GitHub
          </button>
        </footer>
      </div>
    </div>
  );
};

export default BusAnalysisApp;