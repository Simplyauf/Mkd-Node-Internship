const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const { Appointment } = require("../models");
const { Op } = require("sequelize");

// Get available time slots
router.get("/available-slots", async (req, res) => {
  try {
    const { date, timezone } = req.query;

    // Convert date to UTC for database query
    const startOfDay = moment.tz(date, timezone).startOf("day").utc();
    const endOfDay = moment.tz(date, timezone).endOf("day").utc();

    // Business hours (9 AM to 5 PM)
    const businessStart = 9;
    const businessEnd = 17;
    const slotDuration = 60; // minutes

    // Get all booked appointments for the day
    const bookedAppointments = await Appointment.findAll({
      where: {
        startTime: {
          [Op.between]: [startOfDay.format(), endOfDay.format()],
        },
        status: {
          [Op.ne]: "cancelled",
        },
      },
    });

    // Generate all possible time slots
    const slots = [];
    let currentSlot = moment
      .tz(date, timezone)
      .hour(businessStart)
      .startOf("hour");
    const dayEnd = moment.tz(date, timezone).hour(businessEnd).startOf("hour");

    while (currentSlot.isBefore(dayEnd)) {
      const slotUtc = currentSlot.clone().utc().format();
      const isBooked = bookedAppointments.some((apt) =>
        moment(apt.startTime).isSame(slotUtc)
      );

      if (!isBooked) {
        slots.push(currentSlot.format());
      }

      currentSlot = currentSlot.add(slotDuration, "minutes");
    }

    res.json(slots);
  } catch (error) {
    console.error("Error getting available slots:", error);
    res.status(500).json({ error: "Failed to get available slots" });
  }
});

// Create new appointment
router.post("/appointments", async (req, res) => {
  try {
    const { selectedTime, timezone, fullName, email, company, phone, notes } =
      req.body;

    // Convert selected time to UTC for storage
    const startTime = moment.tz(selectedTime, timezone).utc();
    const endTime = moment(startTime).add(1, "hour");

    // Check if slot is already booked
    const existingAppointment = await Appointment.findOne({
      where: {
        startTime: startTime.format(),
        status: {
          [Op.ne]: "cancelled",
        },
      },
    });

    if (existingAppointment) {
      return res.status(409).json({
        error: "This time slot is no longer available",
      });
    }

    // Create the appointment
    const appointment = await Appointment.create({
      startTime: startTime.format(),
      endTime: endTime.format(),
      fullName,
      email,
      company,
      phone,
      notes,
      timezone,
      status: "confirmed",
    });

    // TODO: Send confirmation email to user

    res.status(201).json({
      id: appointment.id,
      message: "Appointment scheduled successfully",
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

module.exports = router;
