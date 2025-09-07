import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

const generationConfig = {
    temperature: 1,
    topP:0.95,
    topK:64,
    maxOutputTokens: 8192,
    responseMimeType:"application/json"
};

const travelPlan = {
  travelPlan: {
    location: "Las Vegas, NV, USA",
    duration: "3 days",
    travelers: "couple",
    budget: "cheap",
    notes: "Budget-conscious recommendations, mix of free and low-cost attractions, mostly walking/short rides.",
    hotels: [
      {
        name: "Flamingo Las Vegas Hotel & Casino",
        address: "3555 S Las Vegas Blvd, Las Vegas, NV 89109",
        price: "Approx. $45 - $95 / night (varies by season)",
        imageUrl: "https://example.com/flamingo.jpg",
        geoCoordinates: { latitude: 36.1166, longitude: -115.1706 },
        rating: 3.5,
        description: "Classic Strip hotel with a central location, good pool area, and frequent budget deals."
      },
      {
        name: "The LINQ Hotel + Experience",
        address: "3535 S Las Vegas Blvd, Las Vegas, NV 89109",
        price: "Approx. $50 - $110 / night",
        imageUrl: "https://example.com/linq.jpg",
        geoCoordinates: { latitude: 36.1170, longitude: -115.1708 },
        rating: 3.8,
        description: "Modern mid-range hotel next to the LINQ Promenade and High Roller observation wheel."
      },
      {
        name: "Excalibur Hotel & Casino",
        address: "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
        price: "Approx. $35 - $80 / night",
        imageUrl: "https://example.com/excalibur.jpg",
        geoCoordinates: { latitude: 36.1017, longitude: -115.1738 },
        rating: 3.0,
        description: "Affordable, family-friendly hotel on the south end of the Strip with a medieval theme."
      },
      {
        name: "Tropicana Las Vegas - a DoubleTree by Hilton",
        address: "3801 S Las Vegas Blvd, Las Vegas, NV 89109",
        price: "Approx. $40 - $90 / night",
        imageUrl: "https://example.com/tropicana.jpg",
        geoCoordinates: { latitude: 36.0977, longitude: -115.1695 },
        rating: 3.4,
        description: "Budget-friendly with easy access to the Strip and occasional discounted rates."
      },
      {
        name: "Circus Circus Hotel, Casino & Theme Park",
        address: "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
        price: "Approx. $30 - $70 / night",
        imageUrl: "https://example.com/circuscircus.jpg",
        geoCoordinates: { latitude: 36.1294, longitude: -115.1667 },
        rating: 3.0,
        description: "Extremely budget-oriented, with an indoor theme park and simple rooms."
      },
      {
        name: "Treasure Island - TI Hotel & Casino",
        address: "3300 S Las Vegas Blvd, Las Vegas, NV 89109",
        price: "Approx. $45 - $100 / night",
        imageUrl: "https://example.com/treasureisland.jpg",
        geoCoordinates: { latitude: 36.1261, longitude: -115.1650 },
        rating: 3.6,
        description: "Reasonable prices and a convenient Strip location; often runs package deals."
      }
    ],
    itinerary: [
      {
        day: 1,
        plan: [
          {
            placeName: "Welcome to Fabulous Las Vegas Sign",
            placeDetails: "Iconic Las Vegas sign — popular photo spot at the south end of the Strip.",
            placeImageUrl: "https://example.com/welcomesign.jpg",
            geoCoordinates: { latitude: 36.0818, longitude: -115.1728 },
            ticketPricing: "Free",
            rating: 4.5,
            timeTravel: "Morning",
            travelTimeFromPrevious: "If staying on mid-Strip: ~15-25 min by walk/ride",
            bestTimeToVisit: "Early morning (7:00–9:00) to avoid crowds and heat; best light for photos.",
            notes: "Small parking area and limited shade; bring water."
          },
          {
            placeName: "Bellagio Fountains",
            placeDetails: "Large choreographed fountain shows in front of Bellagio; free and frequent in the evenings.",
            placeImageUrl: "https://example.com/bellagiofountains.jpg",
            geoCoordinates: { latitude: 36.1126, longitude: -115.1764 },
            ticketPricing: "Free",
            rating: 4.8,
            timeTravel: "Afternoon -> Evening",
            travelTimeFromPrevious: "From Welcome Sign: ~10-20 min drive depending on traffic",
            bestTimeToVisit: "Evening for dramatic lighting and music (check daily show times).",
            notes: "Arrive 10–15 minutes before showtime for a good viewing spot on the Strip sidewalk."
          },
          {
            placeName: "Caesars Forum Shops / The Strip Stroll",
            placeDetails: "Walk along the Strip; stop in Forum Shops at Caesars for air-conditioned shopping and photo ops.",
            placeImageUrl: "https://example.com/forumshops.jpg",
            geoCoordinates: { latitude: 36.1169, longitude: -115.1744 },
            ticketPricing: "Free to browse (shopping costs extra)",
            rating: 4.4,
            timeTravel: "Late afternoon",
            travelTimeFromPrevious: "Short walk along Strip (5-15 min depending where you stand)",
            bestTimeToVisit: "Late afternoon to early evening to escape heat and see the Strip light up.",
            notes: "Good time to rest, grab snacks, or use restroom facilities."
          },
          {
            placeName: "Fremont Street Experience (Downtown Vegas)",
            placeDetails: "Covered pedestrian mall with LED canopy shows, live music, street performers.",
            placeImageUrl: "https://example.com/fremontstreet.jpg",
            geoCoordinates: { latitude: 36.1699, longitude: -115.1432 },
            ticketPricing: "Free (optional paid activities like zipline)",
            rating: 4.6,
            timeTravel: "Evening",
            travelTimeFromPrevious: "From mid-Strip hotels: ~10-20 min drive or 20-30 min by bus",
            bestTimeToVisit: "After sunset for canopy light shows and lively street entertainment.",
            notes: "A different vibe from the Strip — more vintage/retro; watch your belongings in crowded areas."
          }
        ]
      },
      {
        day: 2,
        plan: [
          {
            placeName: "High Roller Observation Wheel (The LINQ)",
            placeDetails: "One of the world’s tallest observation wheels offering panoramic Strip views.",
            placeImageUrl: "https://example.com/highroller.jpg",
            geoCoordinates: { latitude: 36.1174, longitude: -115.1706 },
            ticketPricing: "Approx. $20 - $40 per person (day vs night pricing)",
            rating: 4.4,
            timeTravel: "Late morning",
            travelTimeFromPrevious: "If staying nearby: ~5-15 min walk",
            bestTimeToVisit: "Late morning for clearer daytime views or sunset for nicer light.",
            notes: "Consider the Happy Hour cabins if available for lower-cost drinks and quieter rides."
          },
          {
            placeName: "The LINQ Promenade",
            placeDetails: "Outdoor retail and dining area with shops, casual restaurants and street performers.",
            placeImageUrl: "https://example.com/linqpromenade.jpg",
            geoCoordinates: { latitude: 36.1171, longitude: -115.1709 },
            ticketPricing: "Free to walk around; shopping & food cost extra",
            rating: 4.2,
            timeTravel: "Afternoon",
            travelTimeFromPrevious: "Immediate — it's adjacent to High Roller",
            bestTimeToVisit: "Afternoon to evening for shopping and casual dining options.",
            notes: "Many budget-friendly restaurants here and nearby quick bites."
          },
          {
            placeName: "The Neon Museum (Boneyard)",
            placeDetails: "Outdoor museum preserving vintage neon signs — a photogenic and historic spot.",
            placeImageUrl: "https://example.com/neonmuseum.jpg",
            geoCoordinates: { latitude: 36.1740, longitude: -115.1395 },
            ticketPricing: "Approx. $20 - $25 per person (guided tours vary)",
            rating: 4.6,
            timeTravel: "Late afternoon",
            travelTimeFromPrevious: "From LINQ: ~10-15 min drive",
            bestTimeToVisit: "Late afternoon / early evening for softer light and a better photo experience.",
            notes: "Guided tours recommended for history; wear comfortable shoes for the outdoor path."
          },
          {
            placeName: "Fremont East District (dinner & bars)",
            placeDetails: "Historic downtown area with bars, street art, and affordable food options.",
            placeImageUrl: "https://example.com/fremonteast.jpg",
            geoCoordinates: { latitude: 36.1702, longitude: -115.1408 },
            ticketPricing: "Free to explore; food/bar costs vary",
            rating: 4.3,
            timeTravel: "Evening",
            travelTimeFromPrevious: "Short walk in downtown area",
            bestTimeToVisit: "Evening for live music and affordable local dining.",
            notes: "Good for budget dinners and a more local vibe compared to the Strip."
          }
        ]
      },
      {
        day: 3,
        plan: [
          {
            placeName: "Eiffel Tower Viewing Deck (Paris Las Vegas)",
            placeDetails: "Half-scale replica of Paris' Eiffel Tower with an observation deck overlooking the Strip.",
            placeImageUrl: "https://example.com/eiffeltowervegas.jpg",
            geoCoordinates: { latitude: 36.1128, longitude: -115.1732 },
            ticketPricing: "Approx. $18 - $25 per person",
            rating: 4.4,
            timeTravel: "Morning",
            travelTimeFromPrevious: "Short walk if staying central on the Strip (~5-15 min)",
            bestTimeToVisit: "Morning to avoid crowds and for clearer views.",
            notes: "Buy tickets online to skip lines when available."
          },
          {
            placeName: "Gondola Ride at The Venetian",
            placeDetails: "Indoor/outdoor gondola ride that recreates a Venetian canal experience.",
            placeImageUrl: "https://example.com/venetian_gondola.jpg",
            geoCoordinates: { latitude: 36.1216, longitude: -115.1697 },
            ticketPricing: "Approx. $30 - $40 per person (shared gondola prices exist)",
            rating: 4.4,
            timeTravel: "Late morning / early afternoon",
            travelTimeFromPrevious: "From Paris Las Vegas: ~10 min walk",
            bestTimeToVisit: "Late morning / early afternoon to avoid evening crowds.",
            notes: "Romantic activity for couples but slightly higher cost — split cost if on a tight budget."
          },
          {
            placeName: "Walk the Las Vegas Strip (themed hotels & free attractions)",
            placeDetails: "Self-guided walk visiting themed hotels (Caesars, Mirage, Bellagio), photo ops and free shows.",
            placeImageUrl: "https://example.com/vegasstrip.jpg",
            geoCoordinates: { latitude: 36.1147, longitude: -115.1729 },
            ticketPricing: "Free (unless you enter paid attractions)",
            rating: 4.7,
            timeTravel: "Afternoon -> Evening",
            travelTimeFromPrevious: "Walkable segments; plan 1–3 hours depending on stops",
            bestTimeToVisit: "Morning for less heat, evening for lights; break into segments if tired.",
            notes: "Bring water and comfortable shoes; many free photo opportunities."
          },
          {
            placeName: "The Mirage Volcano (night show)",
            placeDetails: "Free nightly volcano eruption show featuring fire and music in front of The Mirage.",
            placeImageUrl: "https://example.com/miragevolcano.jpg",
            geoCoordinates: { latitude: 36.1206, longitude: -115.1765 },
            ticketPricing: "Free",
            rating: 4.3,
            timeTravel: "Night",
            travelTimeFromPrevious: "Short walk along the Strip",
            bestTimeToVisit: "After dusk — check local showtimes (often starts after sunset).",
            notes: "A nice free finish to your trip; shows run multiple times most evenings."
          }
        ]
      }
    ]
}
}

    export const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    {text: "Generate Travel Plan for Location: Las Vegas, for 3 days for couple with a cheap budget. Give me a Hotels options list with hotel name, hotel address , price, hotel image url, geo coordinates, rating, description and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, rating, time travel for each of the location for 3 days with each day plan with best time to visit in JSON format."}
                ],
            },
            {
                role: "model",
                parts: [{ text: JSON.stringify(travelPlan) }]
            }
        ]
    })

    