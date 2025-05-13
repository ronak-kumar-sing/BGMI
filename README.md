# BGMI Settings Advisor

![BGMI Logo](public/bgmi-logo.png)

A Next.js application for Battlegrounds Mobile India (BGMI) players to optimize their gameplay through personalized sensitivity settings and AI-powered recommendations.

**Live Site**: [https://bgmi-vert.vercel.app/](https://bgmi-vert.vercel.app/)

## Features

### 🎯 Player-Based Sensitivity Advisor

- Get personalized sensitivity settings based on pro-player configurations
- Device-specific optimizations for various phones and tablets
- Customized recommendations based on your playstyle and skill level
- Compare your settings with pro-player setups

### 🤖 AI-Powered Sensitivity Generator

- AI-generated sensitivity settings using Gemini 2.0 Flash
- Detailed analysis and recommendations tailored to your device
- Support for various control setups (2-finger, 3-finger, 4-finger claw, etc.)
- Gyroscope optimization for supported devices
- Visual representation of recommended sensitivity values

### ✨ Additional Features

- Interactive UI with animations and smooth transitions
- Device-specific tips and recommendations
- Visual guidance for applying settings in-game
- Easy copying and sharing of sensitivity codes

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: GSAP for scroll animations
- **AI Integration**: Google Gemini 2.0 Flash API
- **API Routes**: Next.js API routes

## Getting Started

### Prerequisites

- Node.js 18.x or later
- Yarn or npm
- Gemini API key (for AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bgmi-settings-advisor.git
   cd bgmi-settings-advisor
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Settings Advisor

1. Navigate to the Settings Advisor page
2. Enter your device model
3. Select your playstyle (aggressive, sniper, etc.)
4. Choose your skill level
5. Select a pro player configuration
6. Generate personalized settings
7. View, copy, and apply the recommended settings

### AI Sensitivity Generator

1. Navigate to the AI Sensitivity Generator page
2. Enter your device information and preferences
3. Optionally provide additional details for more accurate results
4. Generate AI-optimized sensitivity settings
5. View the visual representation of settings and explanations
6. Copy sensitivity code or individual values

## Project Structure

