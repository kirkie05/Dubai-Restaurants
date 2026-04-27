import { z } from 'zod';

export const partnerSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  plan: z.enum(["basic", "premium"], { error: "Please select a plan" }),
});

export const chefSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  specialty: z.string().min(2, "Specialty is required"),
  yearsExperience: z.number().min(0).max(50),
  restaurantAffiliation: z.string().optional(),
  plan: z.enum(["free", "pro"], { error: "Please select a plan" }),
});

export const bookingSchema = z.object({
  restaurantId: z.string().min(1, "Invalid restaurant ID"),
  bookingDatetime: z.string().min(1, "Please select a date and time"),
  guestCount: z.number().min(1).max(20),
  specialRequests: z.string().optional(),
  depositAmountAed: z.number(),
  // Form fields
  date: z.string().optional(),
  time: z.string().optional(),
});

export const reviewSchema = z.object({
  restaurantId: z.string().min(1, "Invalid restaurant ID"),
  rating: z.number().min(1, "Please provide a rating").max(5),
  title: z.string().optional(),
  body: z.string().min(5, "Review must be at least 5 characters").max(500, "Review is too long"),
});

export const profileEditSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  language: z.string().optional(),
});

export type PartnerFormData = z.infer<typeof partnerSchema>;
export type ChefFormData = z.infer<typeof chefSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type ProfileEditFormData = z.infer<typeof profileEditSchema>;
