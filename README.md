# ΔΕΝ ΕΧΩ ΟΞΥΓΟΝΟ | Tempi Protest Crowd Estimation

![Tempi Protest Map](https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png)

## Overview

A web application for visualizing and estimating crowd sizes at protests related to the Tempi railway disaster. This tool allows organizers, journalists, and citizens to make data-driven assessments of demonstration attendance using geospatial analysis.

## Features

- **Interactive Map Visualization**: View protest areas with color-coded polygon overlays
- **Real-time Population Estimation**: Adjust density parameters to calculate crowd sizes
- **Multiple Map Layers**: Choose between dark, light, classic and satellite views
- **Area Analysis**: Click on regions to view detailed statistics about specific areas
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **Maps**: Leaflet, React-Leaflet
- **Geospatial Analysis**: Turf.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/tempi-protest-map.git
cd tempi-protest-map
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

```
├── app/
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles
├── components/
│   └── Leaflet.tsx        # Map visualization component
├── data/
│   └── polygons.json      # Protest area polygon data
├── lib/
│   └── utils.ts           # Utility functions
└── public/
    └── images/            # Static images
```

## Usage Guide

1. Select a map layer type that suits your needs
2. Adjust the population density slider to match observed crowd conditions
3. Click on any region to view detailed information about that area
4. View the total population estimate at the bottom of the control panel

## Contributions

**Important**: This application only accepts now contributions for new map points and location data. No feature or code changes are being accepted at this time.

If you want to contribute map points:

1. Fork the repository
2. Edit only the `data/polygons.json` file to add new protest locations
3. Follow the exact data format shown in the "Data Format" section
4. Submit a Pull Request with a clear description of the added locations
5. Include reliable sources that confirm these protest locations

All Pull Requests that modify anything other than map data will be discussed for future implementation.

## Context

This application was developed in response to the Tempi railway disaster that occurred on February 28, 2023, when a passenger train and a freight train collided near the city of Larissa in the Tempi Valley, resulting in 57 fatalities. The tragedy sparked nationwide protests demanding accountability, improved railway safety, and justice for the victims.

The name "ΔΕΝ ΕΧΩ ΟΞΥΓΟΝΟ" (I Have No Oxygen) refers to one of the last messages sent by a passenger on the train before the collision.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- All the citizens who continue to stand up for justice for the Tempi victims
- The open-source community for providing the tools that made this project possible
- Independent journalists covering the ongoing demonstrations

---

Built with solidarity in mind. For the victims, for the truth, for justice.
