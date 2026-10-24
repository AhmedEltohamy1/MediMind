# MediMind - AI Health Assistant for Medication Adherence

**SDG 3: Good Health and Well-Being** | Artificial Intelligence Final Project (Capstone)

MediMind is a web application that helps patients take their medicines on time. It combines a medication schedule, smart reminders, adherence analytics and an AI health chatbot.

## Problem
Around half of patients with chronic diseases do not take their medicines as prescribed. Missed doses cause complications, hospital admissions and higher costs.

## Features
- **Medication Manager** - add medicines with name, dose and time
- **Smart Reminders** - on-screen alert at dose time, overdue doses flagged in red
- **Daily Tracking** - one-tap "Mark taken"
- **Adherence Dashboard** - 7-day adherence percentage and daily progress bars
- **AI Insights** - finds the most-missed medicine and gives personalised advice
- **AI Health Chatbot** - natural-language answers about missed doses, side effects, food timing, alcohol and emergencies
- **Privacy** - all data stays in the browser (localStorage)

## Technology Stack
- HTML5, CSS3 (responsive, light/dark mode), JavaScript
- Rule-based NLP intent matching (regular expressions) for the chatbot
- Browser localStorage for data

## How to Run
1. Download or clone this repository.
2. Open `index.html` in any modern browser.
3. Click **Load demo data** to see the dashboard and insights.

```bash
git clone https://github.com/<your-username>/medimind.git
cd medimind
# then open index.html
```

## Project Structure
```
medimind/
|-- index.html    # page structure
|-- style.css     # styling (responsive, dark mode)
|-- script.js     # logic: reminders, analytics, chatbot
|-- README.md     # documentation
|-- LICENSE       # MIT license
`-- screenshots/  # project screenshots
```

## Screenshots
Add your screenshots in the `screenshots/` folder.

## Future Scope
- LLM integration (OpenAI API / Hugging Face)
- Mobile app with push, SMS or WhatsApp reminders
- Caregiver dashboard
- Medicine-interaction checker
- Prescription OCR
- Multi-language and voice support (Arabic, Hindi)
- Wearable integration

## Disclaimer
Educational prototype only. Not a substitute for professional medical advice.

## Author
Ahmed Eltohamy

## License
MIT
