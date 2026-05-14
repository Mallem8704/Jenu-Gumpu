Product Requirements Document (PRD)
Jenu-Gumpu
AI-Powered Honey Producer Collective Android Application
1. Project Overview
Product Name

Jenu-Gumpu

Platform

Android Mobile Application

Technology Stack

Kotlin + Android Studio + Room Database + GenAI APIs

Domain

Agriculture / Rural Empowerment / Self-Employment

2. Problem Statement

Tribal and rural honey hunters often sell raw honey to middlemen at very low prices due to:

Lack of honey grading knowledge
No branding awareness
No collective stock management
No market price awareness
Lack of traceability
No digital platform for rural producers

This results in low profits and exploitation of producers.

3. Vision Statement

Jenu-Gumpu aims to create a digital ecosystem for honey producers where they can:

Record honey harvests
Grade honey quality
Manage collective stock
Track batches
Calculate profits
Receive AI-generated quality insights
Improve market negotiation power

The app empowers rural communities through technology and digital organization.

4. Objectives
Primary Objectives
Digitize honey collection records
Improve honey quality awareness
Increase producer profits
Enable stock transparency
Provide AI-based recommendations
Secondary Objectives
Support Kannada language
Encourage sustainable harvesting
Create rural digital inclusion
5. Target Users
User Type	Description
Honey Hunters	Tribal forest honey collectors
Rural Farmers	Local honey producers
Small Cooperatives	Honey producer groups
Local Buyers	Wholesale aggregators
6. Core Features
6.1 User Authentication
Features
Simple Login/Register
Mobile Number Authentication
Offline user persistence
Inputs
Username
Phone Number
6.2 Harvest Log Module
Purpose

Allows users to record honey collection details.

Features
Add harvest details
View harvest history
Edit/Delete entries
Fields
Field	Type
Date	String
Location	String
Quantity	Double
Floral Source	String
Floral Source Options
Coffee Blossom
Wildflower
Neem
Forest Honey
Sunflower
6.3 Honey Grading Module
Purpose

Classify honey quality using moisture percentage.

Features
Moisture-based grading
Visual grading indicators
AI quality recommendations
Grading Logic
Moisture Range	Grade
<18%	Premium
18–22%	Standard
>22%	Low Grade
6.4 Collective Stock Module
Purpose

Track total honey quantity collected by the group.

Features
Total stock calculation
Batch-wise stock display
Real-time updates
Output
Total Collective Stock: 250 KG
6.5 Batch Tracking Module
Purpose

Enable traceability of honey jars and collections.

Features
Generate batch IDs
Store batch metadata
Batch history tracking
Example Batch ID
JG-2026-001
6.6 Profit Calculator
Purpose

Estimate earnings after expenses.

Inputs
Quantity
Retail Price
Wholesale Price
Filtering Cost
Formula

Profit=(Retail Price−Cost Price)×Quantity−Filtering Cost

6.7 Market Price Monitor
Purpose

Show retail and wholesale honey prices.

Features
Market comparison
Price trends
Suggested selling strategy
6.8 GenAI Recommendation System
Purpose

Provide AI-powered honey insights.

Features
Quality analysis
Storage recommendations
Selling suggestions
Market strategy
AI Inputs
Floral Source
Moisture Level
Quantity
AI Outputs
Honey quality report
Suggested pricing
Best storage methods
6.9 Kannada Language Support
Purpose

Improve accessibility for rural users.

Features
Kannada UI translation
Localized labels/icons
6.10 Analytics Dashboard
Purpose

Provide visual insights.

Features
Monthly collection charts
Profit trends
Best floral source analytics
7. Functional Requirements
ID	Requirement
FR-1	User must register/login
FR-2	User must add harvest logs
FR-3	App must calculate honey grades
FR-4	App must store data offline
FR-5	App must generate batch IDs
FR-6	App must calculate profit
FR-7	App must support Kannada
FR-8	AI must generate recommendations
8. Non-Functional Requirements
Category	Requirement
Performance	App should load within 3 seconds
Security	Local data encryption
Scalability	Support future cloud integration
Usability	Farmer-friendly UI
Reliability	Offline support using Room DB
9. Technology Stack
Frontend
Technology	Purpose
Kotlin	Android development
XML	UI design
Material Design	UI components
Backend / Local Storage
Technology	Purpose
Room Database	Offline storage
SQLite	Database engine
APIs & AI
Technology	Purpose
Gemini API	AI recommendations
Retrofit	API integration
Libraries
Library	Purpose
RecyclerView	Dynamic lists
CardView	Dashboard cards
MPAndroidChart	Analytics graphs
Glide	Image loading
Development Tools
Tool	Purpose
Android Studio	IDE
GitHub	Version control
Firebase (Optional)	Cloud sync/authentication
10. Database Design
Harvest Table
Column	Type
id	Int
date	String
location	String
quantity	Double
floralSource	String
Batch Table
Column	Type
batchId	String
moisture	Float
grade	String
quantity	Double
11. System Architecture
User Interface (Kotlin/XML)
        ↓
Business Logic Layer
        ↓
Room Database
        ↓
AI Recommendation Engine
        ↓
Analytics & Reports
12. UI/UX Requirements
Design Theme
Honey Yellow
Forest Green
Brown tones
UI Style
Minimal
Farmer-friendly
Large buttons/icons
Simple navigation
13. App Screens
Screen	Purpose
Splash Screen	Branding
Login Screen	Authentication
Dashboard	Main navigation
Harvest Screen	Add records
Grading Screen	Honey quality
Stock Screen	Collective stock
Profit Screen	Earnings
Analytics Screen	Reports
Settings Screen	Language
14. Success Criteria

The application will be considered successful if:

Users can record harvest data
Honey grading works correctly
Collective stock is visible
Profit calculator works
Kannada UI is functional
AI suggestions are generated successfully
15. Future Enhancements
Future Scope
QR code traceability
Voice input support
Cloud synchronization
Buyer marketplace
GPS tracking
Blockchain traceability
16. Risks & Challenges
Risk	Solution
Low internet access	Offline Room DB
Low technical literacy	Simple UI
AI API cost	Limited AI requests
Device limitations	Lightweight architecture
17. Expected Impact
Social Impact
Tribal empowerment
Better rural income
Reduced exploitation
Economic Impact
Improved honey pricing
Better collective bargaining
Environmental Impact
Sustainable honey harvesting awareness
18. Conclusion

Jenu-Gumpu is an AI-powered Android application designed to digitally empower honey producers through harvest management, honey grading, stock tracking, and AI-driven recommendations. The solution combines Kotlin-based Android development with GenAI capabilities to create a practical, scalable, and socially impactful rural technology platform.