const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const Produce = require("./models/Produce");
const app = express();

const Offer = require("./models/Offer");

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// MongoDB Connection
// ===============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
  });

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FarmLink AI Backend is running 🚜🌱",
  });
});

// ===============================
// Health Check
// ===============================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// ===============================
// PRODUCE APIs
// ===============================

// Add new produce
app.post("/api/produce", async (req, res) => {
  try {
    const produce = new Produce(req.body);

    const savedProduce = await produce.save();

    res.status(201).json({
      success: true,
      message: "Produce added successfully",
      produce: savedProduce,
    });
  } catch (error) {
    console.error("❌ Error adding produce:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to add produce",
      error: error.message,
    });
  }
});

// Get all produce
app.get("/api/produce", async (req, res) => {
  try {
    const produce = await Produce.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: produce.length,
      produce,
    });
  } catch (error) {
    console.error("❌ Error fetching produce:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch produce",
      error: error.message,
    });
  }
});

// ==========================================
// Get one produce by ID
// ==========================================

app.get("/api/produce/:id", async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id);

    if (!produce) {
      return res.status(404).json({
        success: false,
        message: "Produce not found",
      });
    }

    res.json({
      success: true,
      produce,
    });
  } catch (error) {
    console.error("❌ Error fetching produce:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch produce",
      error: error.message,
    });
  }
});

// ==========================================
// Update produce
// ==========================================

app.put("/api/produce/:id", async (req, res) => {
  try {
    const updatedProduce = await Produce.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduce) {
      return res.status(404).json({
        success: false,
        message: "Produce not found",
      });
    }

    res.json({
      success: true,
      message: "Produce updated successfully",
      produce: updatedProduce,
    });
  } catch (error) {
    console.error("❌ Error updating produce:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update produce",
      error: error.message,
    });
  }
});

// ==========================================
// Delete produce
// ==========================================

app.delete("/api/produce/:id", async (req, res) => {
  try {
    const deletedProduce = await Produce.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProduce) {
      return res.status(404).json({
        success: false,
        message: "Produce not found",
      });
    }

    res.json({
      success: true,
      message: "Produce deleted successfully",
      produce: deletedProduce,
    });
  } catch (error) {
    console.error("❌ Error deleting produce:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete produce",
      error: error.message,
    });
  }
});


// ==========================================
// AI MARKET ANALYSIS
// ==========================================

// ==========================================
// AI MARKET ANALYSIS + REAL MANDI DATA
// ==========================================

app.post("/api/analysis", async (req, res) => {
  try {
    const {
      crop,
      quantity,
      location,
      expectedPrice,
      sellingDate,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!crop || !quantity || !location) {
      return res.status(400).json({
        success: false,
        message: "Crop, quantity and location are required",
      });
    }

    const qty = Number(quantity);
    const farmerPrice = Number(expectedPrice) || 0;

    if (qty <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

    // ==========================================
    // FALLBACK MARKET DATA
    // ==========================================

    const cropData = {
      Tomato: {
        basePrice: 2850,
        volatility: 0.08,
        transport: 180,
        demand: "High Demand",
      },

      Potato: {
        basePrice: 2200,
        volatility: 0.06,
        transport: 160,
        demand: "High Demand",
      },

      Onion: {
        basePrice: 2600,
        volatility: 0.09,
        transport: 170,
        demand: "High Demand",
      },

      Wheat: {
        basePrice: 2400,
        volatility: 0.04,
        transport: 140,
        demand: "Good Demand",
      },

      Rice: {
        basePrice: 3100,
        volatility: 0.05,
        transport: 150,
        demand: "Good Demand",
      },

      Maize: {
        basePrice: 2100,
        volatility: 0.06,
        transport: 135,
        demand: "Good Demand",
      },

      Carrot: {
        basePrice: 2300,
        volatility: 0.07,
        transport: 150,
        demand: "Good Demand",
      },

      Cauliflower: {
        basePrice: 2700,
        volatility: 0.08,
        transport: 165,
        demand: "Good Demand",
      },
    };

    const data = cropData[crop] || {
      basePrice: farmerPrice || 2500,
      volatility: 0.06,
      transport: 150,
      demand: "Moderate Demand",
    };

    // ==========================================
    // FETCH REAL MANDI DATA
    // ==========================================

    let mandiRecords = [];
    let usingRealData = false;

    try {
      const mandiUrl =
        "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

      const params = new URLSearchParams({
        "api-key": process.env.DATA_GOV_API_KEY,
        format: "json",
        limit: "1000",
      });

      // Ask government API for this crop
      params.append("filters[commodity]", crop);

      const mandiResponse = await fetch(
        `${mandiUrl}?${params.toString()}`
      );

      if (mandiResponse.ok) {
        const mandiData = await mandiResponse.json();

        mandiRecords = Array.isArray(mandiData.records)
          ? mandiData.records
          : [];

        if (mandiRecords.length > 0) {
          usingRealData = true;
        }
      }
    } catch (error) {
      console.log(
        "⚠️ Mandi API unavailable, using fallback AI data:",
        error.message
      );
    }

    // ==========================================
    // CURRENT PRICE
    // ==========================================

    let currentPrice = data.basePrice;
    let priceSource = "FarmLink AI fallback model";

    if (usingRealData) {
      const locationLower = location.toLowerCase();

      // Try to find records relevant to farmer's location
      const locationRecords = mandiRecords.filter((record) => {
        const state = String(record.state || "").toLowerCase();
        const district = String(record.district || "").toLowerCase();

        return (
          state.includes(locationLower) ||
          locationLower.includes(state) ||
          district.includes(locationLower) ||
          locationLower.includes(district)
        );
      });

      const relevantRecords =
        locationRecords.length > 0
          ? locationRecords
          : mandiRecords;

      const validPrices = relevantRecords
        .map((record) => Number(record.modal_price))
        .filter((price) => Number.isFinite(price) && price > 0);

      if (validPrices.length > 0) {
        const average =
          validPrices.reduce((sum, price) => sum + price, 0) /
          validPrices.length;

        currentPrice = Math.round(average);
        priceSource = "data.gov.in live mandi data";
      }
    }

    // ==========================================
    // SELLING DATE FACTOR
    // ==========================================

    let dateFactor = 1;

    if (sellingDate) {
      const today = new Date();
      const sellDate = new Date(sellingDate);

      const daysUntilSelling = Math.ceil(
        (sellDate - today) /
          (1000 * 60 * 60 * 24)
      );

      if (daysUntilSelling >= 15) {
        dateFactor = 1.05;
      } else if (daysUntilSelling >= 7) {
        dateFactor = 1.03;
      } else if (daysUntilSelling >= 3) {
        dateFactor = 1.02;
      }
    }

    // ==========================================
    // QUANTITY FACTOR
    // ==========================================

    let quantityFactor = 1;

    if (qty >= 1000) {
      quantityFactor = 0.98;
    } else if (qty >= 500) {
      quantityFactor = 0.99;
    } else if (qty <= 100) {
      quantityFactor = 1.02;
    }

    // ==========================================
    // FARMER EXPECTED PRICE FACTOR
    // ==========================================

    let farmerPriceFactor = 1;

    if (farmerPrice > 0 && currentPrice > 0) {
      const difference =
        (farmerPrice - currentPrice) /
        currentPrice;

      if (difference < -0.10) {
        farmerPriceFactor = 1.02;
      } else if (difference > 0.10) {
        farmerPriceFactor = 0.98;
      }
    }

    // ==========================================
    // AI PREDICTED PRICE
    // ==========================================

    let predictedPrice =
      currentPrice *
      dateFactor *
      quantityFactor *
      farmerPriceFactor;

    predictedPrice =
      predictedPrice *
      (1 + data.volatility * 0.6);

    predictedPrice = Math.round(predictedPrice);

    // ==========================================
    // PRICE RANGE
    // ==========================================

    const rangeMin = Math.round(
      predictedPrice * 0.94
    );

    const rangeMax = Math.round(
      predictedPrice * 1.06
    );

    // ==========================================
    // GROWTH
    // ==========================================

    const growth = Number(
      (
        ((predictedPrice - currentPrice) /
          currentPrice) *
        100
      ).toFixed(1)
    );

    // ==========================================
    // DEMAND + RECOMMENDATION
    // ==========================================

    let demand = data.demand;
    let recommendation;
    let explanation;

    if (growth >= 8) {
      recommendation = "Good time to sell";

      explanation =
        `FarmLink AI detects a positive price outlook for ${crop.toLowerCase()}. ` +
        `Current market conditions and the planned selling period indicate potential price improvement.`;
    } else if (growth >= 4) {
      recommendation = "Consider selling soon";

      explanation =
        `The market shows moderate positive movement for ${crop.toLowerCase()}. ` +
        `Compare available markets before finalizing your sale.`;
    } else if (growth >= 0) {
      recommendation = "Compare markets first";

      explanation =
        `Prices for ${crop.toLowerCase()} appear relatively stable. ` +
        `FarmLink AI recommends comparing nearby markets before selling.`;

      demand = "Moderate Demand";
    } else {
      recommendation = "Consider waiting";

      explanation =
        `The predicted price is currently below the estimated market level. ` +
        `Comparing markets or waiting for a better selling window may improve your return.`;

      demand = "Moderate Demand";
    }

    // ==========================================
    // CONFIDENCE
    // ==========================================

    let confidence = usingRealData ? 86 : 80;

    if (farmerPrice > 0) {
      confidence += 2;
    }

    if (sellingDate) {
      confidence += 2;
    }

    confidence = Math.min(confidence, 94);

    // ==========================================
    // REAL MARKET OPTIONS
    // ==========================================

    let markets = [];

    if (usingRealData) {
      // Group records by market
      const groupedMarkets = {};

      mandiRecords.forEach((record) => {
        const marketName = record.market;

        const price = Number(record.modal_price);

        if (
          !marketName ||
          !Number.isFinite(price) ||
          price <= 0
        ) {
          return;
        }

        if (!groupedMarkets[marketName]) {
          groupedMarkets[marketName] = {
            name: marketName,
            location: record.state || "India",
            prices: [],
            date: record.arrival_date,
          };
        }

        groupedMarkets[marketName].prices.push(price);
      });

      markets = Object.values(groupedMarkets)
        .map((market) => {
          const averagePrice =
            market.prices.reduce(
              (sum, price) => sum + price,
              0
            ) / market.prices.length;

          const price = Math.round(averagePrice);

          const quantityQuintal = qty / 100;

          const revenue =
  price * quantityQuintal;

// Estimated transport cost based on market state
const transportRates = {
  Punjab: 1.0,
  Haryana: 1.1,
  "Uttar Pradesh": 1.2,
  Delhi: 1.3,
  Rajasthan: 1.4,
  "Madhya Pradesh": 1.5,
  Maharashtra: 1.8,
  Gujarat: 1.7,
};

const locationFactor =
  transportRates[market.location] || 1.5;

const transport =
  data.transport *
  quantityQuintal *
  locationFactor;

const returnValue =
  revenue - transport;
          return {
            name: market.name,
            location: market.location,
            price,
            distance: Math.round(100 * locationFactor),
            returnValue: Math.round(returnValue),
            dataSource: "data.gov.in",
            arrivalDate: market.date,
          };
        })
        .sort(
          (a, b) =>
            b.returnValue - a.returnValue
        )
        .slice(0, 5);
    }

    // ==========================================
    // FALLBACK MARKETS
    // ==========================================

    if (markets.length === 0) {
      const fallbackMarkets = [
        {
          name: "Azadpur Mandi",
          location: "Delhi",
          multiplier: 1.02,
        },
        {
          name: "Okhla Mandi",
          location: "Delhi",
          multiplier: 0.97,
        },
        {
          name: "Ghazipur Mandi",
          location: "Uttar Pradesh",
          multiplier: 0.94,
        },
      ];

      const quantityQuintal = qty / 100;

      markets = fallbackMarkets
        .map((market) => {
          const price = Math.round(
            predictedPrice * market.multiplier
          );

          const revenue =
            price * quantityQuintal;

          const transport =
            data.transport * quantityQuintal;

          const returnValue =
            revenue - transport;

          return {
            name: market.name,
            location: market.location,
            price,
            distance: null,
            returnValue: Math.round(returnValue),
            dataSource: "FarmLink fallback model",
          };
        })
        .sort(
          (a, b) =>
            b.returnValue - a.returnValue
        );
    }

    // ==========================================
    // FINAL RESPONSE
    // ==========================================

    res.json({
      success: true,

      message:
        "AI market analysis generated successfully",

      analysis: {
        crop,
        quantity: qty,
        location,
        sellingDate,

        currentPrice,
        predictedPrice,

        priceRange: {
          min: rangeMin,
          max: rangeMax,
        },

        growth,
        confidence,
        demand,
        recommendation,
        explanation,

        transportCost: data.transport,

        markets,

        // NEW
        dataSource: priceSource,
        liveMandiData: usingRealData,
        mandiRecordsUsed: mandiRecords.length,
      },
    });

  } catch (error) {
    console.error(
      "❌ Error generating AI analysis:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to generate AI analysis",
      error: error.message,
    });
  }
});
// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

// ===============================
// REAL MANDI PRICE API
// ===============================

app.get("/api/mandi-prices", async (req, res) => {
  try {
const { crop, state, date, limit = 10 } = req.query;
    const apiUrl =
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

    const params = new URLSearchParams({
      "api-key": process.env.DATA_GOV_API_KEY,
      format: "json",
      limit: String(Math.min(Number(limit) || 10, 50)),
    });

    // Filter by crop if provided
    if (crop) {
      params.append("filters[commodity]", crop);
    }

    // Filter by state if provided
    if (state) {
      params.append("filters[state]", state);
    }
    if (date) params.append("filters[arrival_date]", date);

    const response = await fetch(`${apiUrl}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Mandi API returned ${response.status}`);
    }

    const data = await response.json();

    res.json({
      success: true,
      source: "data.gov.in",
      total: data.total,
      count: data.count,
      records: data.records || [],
    });

  } catch (error) {
    console.error("Mandi API Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch real mandi prices",
      error: error.message,
    });
  }
});

// ================= OFFERS =================

// Create a new offer
app.post("/api/offers", async (req, res) => {
  try {
    const {
      buyerName,
      buyerType,
      buyerLocation,
      crop,
      quantity,
      offeredPrice,
      message,
    } = req.body;

    if (!buyerName || !crop || !quantity || !offeredPrice) {
      return res.status(400).json({
        success: false,
        message: "Buyer, crop, quantity and offered price are required",
      });
    }

    const offer = await Offer.create({
      buyerName,
      buyerType,
      buyerLocation,
      crop,
      quantity: Number(quantity),
      offeredPrice: Number(offeredPrice),
      message: message || "",
    });

    res.status(201).json({
      success: true,
      message: "Offer sent successfully",
      offer,
    });
  } catch (error) {
    console.error("Create Offer Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create offer",
      error: error.message,
    });
  }
});


// Get all offers
app.get("/api/offers", async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: offers.length,
      offers,
    });
  } catch (error) {
    console.error("Get Offers Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch offers",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚜 FarmLink AI server running on port ${PORT}`);
});

