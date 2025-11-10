"use client";

import React, { FormEvent, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { joinWaitlist } from "@/lib/api/waitlist";
import { toast } from "sonner";

const isValidEmail = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
};

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WaitlistModal = ({ open, onOpenChange }: WaitlistModalProps) => {
  const [email, setEmail] = useState("");
  const [promocode, setPromocode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [promocodeError, setPromocodeError] = useState<string | null>(null);

  // Reset state when dialog opens or closes
  useEffect(() => {
    if (!open) {
      setEmail("");
      setPromocode("");
      setIsLoading(false);
      setErrorMessage(null);
      setPromocodeError(null);
    }
  }, [open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setPromocodeError(null);
      return;
    }

    if (!promocode.trim()) {
      setErrorMessage("Promocode is required.");
      setPromocodeError(null);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setPromocodeError(null);

    try {
      const response = await joinWaitlist(email.trim(), promocode.trim());
      setEmail("");
      setPromocode("");
      // Show toast and close modal simultaneously
      toast.success("Welcome email sent!", {
        description: response.message ?? "Thanks for joining the waitlist!",
      });
      // Use requestAnimationFrame to ensure toast renders before closing
      requestAnimationFrame(() => {
        onOpenChange(false);
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      
      // Check if error is related to promocode
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes("promocode") || 
          lowerMessage.includes("invalid promocode") || 
          lowerMessage.includes("promocode already used") ||
          lowerMessage.includes("already used")) {
        setPromocodeError(message);
        setPromocode(""); // Clear the promocode field
        setErrorMessage(null);
      } else {
        setErrorMessage(message);
        setPromocodeError(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = isValidEmail(email) && promocode.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold">
            Join the Waitlist
          </DialogTitle>
          <DialogDescription className="text-base">
            Enter your email and promocode for early access.
          </DialogDescription>
        </DialogHeader>
  
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="h-11"
              required
            />
          </div>
  
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="promocode" className="text-sm font-medium">
                Promocode
              </Label>
              {promocodeError && (
                <span className="text-sm text-red-500 dark:text-red-400">
                  {promocodeError}
                </span>
              )}
            </div>
            <Input
              id="promocode"
              type="text"
              placeholder="Enter your code"
              value={promocode}
              onChange={(e) => {
                setPromocode(e.target.value);
                // Clear error when user starts typing
                if (promocodeError) {
                  setPromocodeError(null);
                }
              }}
              disabled={isLoading}
              className="h-11"
              aria-invalid={promocodeError ? "true" : undefined}
              required
            />
          </div>
  
          {errorMessage && (
            <p className="text-sm text-red-500 dark:text-red-400 py-1">
              {errorMessage}
            </p>
          )}
  
          <Button
            type="submit"
            className="w-full h-11"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>
  
        <div className="pt-6 mt-6 border-t space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            {`Don't have a promo code?`}
          </p>
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">Reach out to us</p>
            <div className="flex items-center justify-center">
              <button
                onClick={() => {
                  const profiles = [
                    "https://x.com/AdI0_0I",
                    "https://x.com/Naval1504",
                  ];
                  const randomProfile =
                    profiles[Math.floor(Math.random() * profiles.length)];
                  window.open(randomProfile, "_blank", "noopener,noreferrer");
                }}
                className="hover:opacity-80 transition-opacity cursor-pointer"
                aria-label="Reach out on X"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-foreground"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
