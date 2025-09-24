# Maximizing Transportation Resources for Queens College Students

## Links to Project Assets
- **Interactive Map**: [Heatmap](https://mellifluous-bublanina-686c73.netlify.app/) 
- **Website**: [Project Website](https://68d47e1185a19a2c76a47695--warm-pithivier-d62983.netlify.app/)
- **Slides PDF**: [Datavengers](Datavengers-1(1).pdf)
- **Video**: [Project Video](https://your-video-link.com)
- **Jupyter Notebook**: [Data](https://Google.com)
  
## Project Overview

This datathon project analyzes bus lane violations on the Q44+ route near Queens College to quantify their impact on First-Generation Low-Income (FGLI) students, who comprise approximately 80% of the student body. Using MTA's Automated Camera Enforcement (ACE) data, we identify repeat exempt vehicle offenders, calculate student delays, and propose AI cameras to reduce these delays. Our analysis reveals chronic violations (e.g., mobile bus stop as the highest type) causing 279 hours of delays and 12,552.8 student-hours lost, with an upward trend in 2023-2025 and stop counts as the key predictor for repeats.

The project demonstrates how data science can address transportation inequities for CUNY students, with actionable recommendations for the MTA to implement AI cameras.

### Team Members
- Atiqa Ullah
- Winnie Chen
- Prionty Ava
- Joseph Chiastla

### Research Question
How do repeat exempt vehicle violations on the Q44+ bus route near Queens College during peak commuting hours contribute to student delays, and what is the potential reduction in delays from installing AI cameras at identified hotspots?

## Background
Queens College students, predominantly FGLI, rely on the Q44 bus for daily commutes to campus and jobs. The route passes near high schools, hospitals, and stores, leading to delays during rush hours. Ridership peaks in early September with the return to school. Late buses aren't just a minor inconvenience—they result in missed classes, lost opportunities, and harder paths to break poverty cycles for low-income students. Our project uses MTA ACE data to quantify these delays and propose solutions.

## Data Source and Methodology
### Data
- **Primary Dataset**: MTA Bus Automated Camera Enforcement Violations (filtered for Q44+, exempt statuses, and within 5 km of Queens College: lat 40.736, long -73.817).
  - Total rows analyzed: 34,305 exempt violations.
  - Key columns: `Violation ID`, `Vehicle ID`, `First Occurrence`, `Violation Status`, `Violation Type`, `Bus Route ID`, `Violation Latitude`, `Violation Longitude`.
- **Tools**: R with libraries like "tidyverse", "lubridate", "data.table", "leaflet.extras", "Leaflet", "ggplot2", "plotly", "htmlwidgets", "data.table" for processing, visualization, and modeling.

### Methodology
1. **Identify ACE Routes Impacting FGLI Students**: Filtered for Q44+ (most common for QC students), exempt vehicles (e.g., "EXEMPT - BUS/PARATRANSIT"), and 5 km radius.
2. **Top 250 Repeat Offenders**: Grouped by `Vehicle ID`, counted violations, filtered >1, sorted descending, took top 250.
3. **Calculate Delays**: Assumed 1.5 min per violation, 45 students per bus; total delay = 279 hours, student-hours lost = 12,552.8.
4. **Predict Repeat Offenses**: Used regression to find stop counts as key predictor.
5. **Visualizations**: Heatmap, bar charts, histograms, time series, density plots, feature importance.

### Key Code Snippets
- **Data Processing** (filtered dataset):
  ```r
  violations_qc <- mta_data %>%
    mutate(
      first_occurrence = mdy_hms(`First Occurrence`, truncated = 3),
      is_exempt = str_detect(`Violation Status`, "(?i)EXEMPT"),
      dist_to_campus_km = sqrt((`Violation Latitude` - qc_lat)^2 + (`Violation Longitude` - qc_long)^2) * 111
    ) %>%
    filter(
      `Bus Route ID` %in% qc_routes,  # Q44+ only
      is_exempt,                      # Exempt vehicles
      dist_to_campus_km <= 5          # Within 5 km
    )
  ```

- **Top Repeat Offenders**:
  ```r
  repeats_qc <- violations_qc %>%
    group_by(`Vehicle ID`) %>%
    summarise(violation_count = n(), .groups = "drop") %>%
    filter(violation_count > 1) %>%
    arrange(desc(violation_count)) %>%
    slice_head(n = 250)
  ```

- **Delay Calculation**:
  ```r
  repeats_with_delay <- repeats_qc %>%
    mutate(
      total_delay_min = violation_count * 1.5,
      students_affected = total_delay_min * 45
    )
  total_delay_hours <- sum(repeats_with_delay$total_delay_min) / 60
  total_student_hours <- sum(repeats_with_delay$students_affected) / 60
  ```

- **Regression**:
  ```r
  repeat_model3 <- lm(violation_count ~ avg_distance + violation_types + activity_duration + stop_count, data = train)
  summary(repeat_model3)
  ```

## Key Findings
1. **Highest Violation Type**: Mobile bus stop violations dominate near Queens College (e.g., 60% of 34,305 violations).


2. **Top 250 Repeat Offenders**: Counts range from 552 to 19, with the top 50 causing 80% of violations.


3. **Stop Counts as Key Predictor**: Regression shows stop counts as the most important factor for repeats.


4. **Upward Trend in Violations**: Violations increased over 2023-2025, peaking on weekdays and in 2025 Q1.

5. **Delays and Impact**: 279 hours of delays, 12,552.8 student-hours lost, economic impact ~$251,056 (assuming $20/hour productivity).

## Recommendations
- **Install AI Cameras**: Deploy 3 AI cameras at Main St hotspots (e.g., near Kissena Blvd) to capture license plates and issue $50 fines for stops >3 min. 
- **Target Mobile Bus Stops**: Prioritize enforcement for “mobile bus stop” violations (highest type), using stop counts as a predictor for repeats.
- **Expand ACE to Q17/Q25**: Extend Automated Camera Enforcement to Q17/Q25 routes (missing in data but key for QC students).
- **Pilot Program**: Test on Q44+ for 6 months, monitoring delay reduction and violation trends (e.g., quarterly averages).

## How to Run the Code
1. Install required libraries:
   ```r
   install.packages(c("tidyverse", "lubridate", "data.table", "leaflet.extras", "Leaflet", "ggplot2", "plotly", "htmlwidgets", "data.table"))
   ```
2. Load your data as `mta_data` (MTA ACE CSV).
3. Run the processing code to generate `violations_qc` and `repeats_qc`.
4. Generate visualizations and models as above.

## Credits
- **Team**: Atiqa Ullah, Winnie Chen, Prionty Ava, Joseph Chiastla
- **Data Sources**: MTA Automated Camera Enforcement Violations, NYC Open Data, Poll on CUNY students (made public)
- **Tools**: R, Google Slides, Netlify, Capcut, YouTube
- **Template**: Slidesgo for presentation template

Thank you for checking out our project! Contributions welcome—fork and PR.
