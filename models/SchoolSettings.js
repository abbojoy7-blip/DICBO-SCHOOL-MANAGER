const mongoose = require("mongoose");

const schoolSettingsSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "DICBO School Manager" },
  shortName: { type: String },
  logo: { type: String },
  motto: { type: String },
  vision: { type: String },
  mission: { type: String },
  address: { type: String },
  district: { type: String },
  phone: { type: String },
  email: { type: String },
  website: { type: String },
  principalName: { type: String },
  deputyName: { type: String },
  currency: { type: String, default: "UGX" },
  primaryColor: { type: String, default: "#0B1F3A" }, // Navy
  secondaryColor: { type: String, default: "#163D6B" }, // Royal Blue
  academicGold: { type: String, default: "#C9A227" }, // Gold
  currentAcademicYear: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear" },
  currentTerm: { type: String, enum: ["Term 1", "Term 2", "Term 3"], default: "Term 1" },

  // Academic Configuration
  examTypes: { type: [String], default: ["Quiz", "Mid-Term", "Final"] },
  gradeBoundaries: [{
    grade: { type: String, required: true }, // e.g., "A"
    minScore: { type: Number, required: true }, // e.g., 80
    maxScore: { type: Number, required: true }, // e.g., 100
    remarks: { type: String } // e.g., "Excellent"
  }],

  // SaaS / Subscription Readiness
  subscriptionPlan: { type: String, enum: ["Trial", "Starter", "Professional", "Enterprise"], default: "Trial" },
  subscriptionStatus: { type: String, enum: ["Active", "Expired", "Suspended", "Grace Period"], default: "Active" },
  expiryDate: { type: Date },
  maxStudents: { type: Number, default: 50 }, // Plan limits
  isOnboarded: { type: Boolean, default: false },

  // Demo / Production Modes
  isPresentationMode: { type: Boolean, default: false },

  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("SchoolSettings", schoolSettingsSchema);
